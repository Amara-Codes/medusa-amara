import React from "react";
import qs from "qs";
import ArticleCard from "../article-card";
import componentMapping from "../componentMapping";

type ArticleCategory = "news" | "activities" | "blog" | "*";
type Mode = "preview" | "deep";

interface ArticleData {
  data: any;
}

type TransformedDataItem = {
  Title: string;
  Slug: string;
  Category: string;
  Summary: string | null;
  ThumbnailUrl?: string;
  Content?: any[];
};

type TransformedJson = {
  data: TransformedDataItem[];
};

function transformData(json: any): TransformedJson {
  return {
    data: json.data.map((item: any) => {
      const attributes = item.attributes;
      const ThumbnailUrl = attributes.Thumbnail?.data?.attributes?.formats?.small?.url;

      const Content = attributes.Content?.map((contentItem: any) => {
        const Component = contentItem["__component"].split(".")[1];
        return { ...contentItem, Component };
      });

      return {
        Title: attributes.Title,
        Slug: attributes.Slug,
        Category: attributes.Category,
        Summary: attributes.Summary,
        ThumbnailUrl,
        Content,
      };
    }),
  };
}

async function getArticles(category: ArticleCategory = "*", mode: Mode = "preview") {
  const baseUrl = process.env.AMARA_STRAPI_URL ?? "http://localhost:1337";
  const path = "/api/articles";

  const url = new URL(path, baseUrl);
  const query: Record<string, any> = {
    populate: {
      Thumbnail: { fields: ["formats"] },
      Content: { fields: "*" },
    },
  };

  if (category !== "*") {
    query.filters = { Category: category };
  }

  url.search = qs.stringify(query);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  return transformData(data);
}

async function getArticleById(
  articleId: string,
  category: ArticleCategory = "*",
  mode: Mode = "preview"
) {
  const baseUrl = process.env.AMARA_STRAPI_URL ?? "http://localhost:1337";
  const path = `/api/articles/${articleId}`;
  const url = new URL(path, baseUrl);

  const query: Record<string, any> = {};
  if (mode === "deep") {
    query.populate = { Content: { fields: "*" } };
  }
  if (category !== "*") {
    query.filters = { Category: category };
  }

  url.search = qs.stringify(query);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch article with ID: ${articleId}`);
  }

  const data = await res.json();
  return transformData(data);
}

interface ArticleFetcherProps {
  articleCategory?: ArticleCategory;
  mode?: Mode;
  articleId?: string;
}

export default async function ArticleFetcher({
  articleCategory = "*",
  mode = "preview",
  articleId,
}: ArticleFetcherProps) {
  let articles;

  if (articleId) {
    articles = await getArticleById(articleId, articleCategory, mode);
  } else {
    articles = await getArticles(articleCategory, mode);
  }

  if (mode === "preview") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:mb-48 mx-12 pb-12">
        {articles.data.map((article) => (
          <ArticleCard
            key={article.Slug}
            title={article.Title}
            caption={article.Summary ?? ''}
            thumbnailUrl={article.ThumbnailUrl}
            slug={article.Slug}
            type={article.Category}
          />
        ))}
      </div>
    );
  }

  if (mode === "deep") {
    return (
      <div>
        {articles.data.map((article) => (
          <div key={article.Slug} className="my-8 mx-12">
            {article.Content &&
              article.Content.map((contentItem: any, index: number) => {
                const Component = componentMapping[contentItem.Component];
                if (!Component) {
                  return (
                    <pre key={index}>
                      {JSON.stringify(contentItem, null, 2)}
                    </pre>
                  );
                }
                return <Component key={index} {...contentItem} />;
              })}
          </div>
        ))}
      </div>
    );
  }

  return null;
}
