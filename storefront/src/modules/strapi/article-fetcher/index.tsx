import React, { useEffect, useState } from "react";
import qs from "qs";
import ArticleCard from "../article-card";
import SkeletonArticles from "@modules/skeletons/templates/skeleton-articles";

type ArticleCategory = "news" | "activities" | "blog" | "*";

type TransformedDataItem = {
  Title: string;
  Slug: string;
  Category: string;
  Summary: string | null;
  ThumbnailUrl?: string;
  Content?: any[];
  Id?: string;
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
        Id: item.id,
      };
    }),
  };
}

async function getArticles(
  category: ArticleCategory = "*",
  limit?: number,
  sort: "asc" | "desc" = "desc",
  page: number = 1
) {
  const baseUrl = process.env.AMARA_STRAPI_URL ?? "https://strapi-production-8758a.up.railway.app";
  const path = "/api/articles";

  const url = new URL(path, baseUrl);
  const query: Record<string, any> = {
    populate: {
      Thumbnail: { fields: ["formats"] },
      Content: { fields: "*" },
      ActivityCompleted: { fields: "*" },
    },
    pagination: {
      page,
      pageSize: limit,
    },
    sort: [`createdAt:${sort}`],
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

interface ArticlesFetcherProps {
  articleCategory?: ArticleCategory;
  limit?: number;
  sort?: "asc" | "desc";
  currentPage?: number;
}

export default function ArticlesFetcher({
  articleCategory = "*",
  limit = 100,
  sort = "desc",
  currentPage = 1,
}: ArticlesFetcherProps) {
  const [articles, setArticles] = useState<TransformedDataItem[]>([]); 
  const [isLoading, setIsLoading] = useState(true); // Manage loading state explicitly

  useEffect(() => {
    setIsLoading(true); // Start loading
    getArticles(articleCategory, limit, sort, currentPage)
      .then((data) => {
        setArticles(data.data);
        setIsLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Stop loading in case of error
      });
  }, [articleCategory, limit, sort, currentPage]);

  // Determine the number of columns based on the limit
  const getGridColumns = () => {
    if (limit === 1) return "small:grid-cols-1"; // 1 card per row
    if (limit === 2) return "small:grid-cols-2"; // 2 cards per row
    if (limit >= 3) return "small:grid-cols-3"; // 3 cards per row (max)
    return "grid-cols-1"; // Default case
  };

  return (
    <div className="small:mx-12">
      <div className={`grid gap-6 pb-12 ${getGridColumns()}`}>
        {isLoading ? ( // Conditionally render skeleton loader while loading
          <SkeletonArticles count={limit} />
        ) : (
          articles.map((article) => (
            <ArticleCard
              key={article.Slug}
              title={article.Title}
              caption={article.Summary ?? ""}
              thumbnailUrl={article.ThumbnailUrl}
              slug={article.Slug}
              type={article.Category}
            />
          ))
        )}
      </div>
    </div>
  );
}
