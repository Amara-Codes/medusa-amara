import Thumbnail from "@modules/products/components/thumbnail";
import qs from "qs";
import React from "react";

type ArticleCategory = "news" | "activities" | "blog" | "*";
type Mode = "preview" | "deep";

interface ArticleData {
  data: any; // Personalizza ulteriormente in base alla struttura della tua API
}


type ThumbnailFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};

type Thumbnail = {
  data: {
    attributes: {
      formats: {
        small?: ThumbnailFormat;
      };
    };
  };
};

type ContentItem = {
  id: number;
  __component: string;
  [key: string]: any;
};

type Attributes = {
  Title: string;
  Slug: string;
  Category: string;
  Summary: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Thumbnail?: Thumbnail;
  Content?: ContentItem[];
};

type DataItem = {
  id: number;
  attributes: Attributes;
};

type InputJson = {
  data: DataItem[];
  meta: any;
};

type TransformedContent = {
  id: number;
  Component: string; // Campo obbligatorio
  [key: string]: any; // Altri campi opzionali
};


type TransformedDataItem = {
  Title: string;
  Slug: string;
  Category: string;
  Summary: string | null;
  ThumbnailUrl?: string;
  Content?: TransformedContent[];
};

type TransformedJson = {
  data: TransformedDataItem[];
};

function transformData(json: InputJson): TransformedJson {
  return {
    data: json.data.map((item) => {
      const attributes = item.attributes;

      // Estrarre l'URL del formato "small" dalla thumbnail
      const ThumbnailUrl = attributes.Thumbnail?.data?.attributes?.formats?.small?.url;

      // Mappare il contenuto, cambiando "__component" in "Component"
      const Content = attributes.Content?.map((contentItem) => {
        const Component = contentItem["__component"].split(".")[1]; // Prende il valore dopo il punto

        // Creare un nuovo oggetto rispettando il tipo TransformedContent
        const newItem: TransformedContent = {
          ...contentItem,
          Component, // Aggiungere il campo "Component"
        };
        delete newItem["__component"]; // Rimuovere "__component"
        return newItem;
      });

      // Restituire solo i campi necessari
      return {
        Title: attributes.Title,
        Slug: attributes.Slug,
        Category: attributes.Category,
        Summary: attributes.Summary,
        ThumbnailUrl, // URL del formato "small"
        Content, // Contenuti trasformati
      };
    }),
  };
}

async function getArticles(category: ArticleCategory = "*", mode: Mode = "preview") {
  const baseUrl = process.env.AMARA_STRAPI_URL ?? "http://localhost:1337";
  const path = "/api/articles";

  const url = new URL(path, baseUrl);

  const query: Record<string, any> = {
    filters: {},
  };

  query.populate = {
    Thumbnail: {
      fields: ["formats"], 
    },
    Content: {
      fields: "*"
    }
  };
  


  if (category !== "*") {
    query.filters = {
      Category: category,
    };
  }

  url.search = qs.stringify(query);

  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error("Failed to fetch articles");
  }

  const data = await res.json();
  console.log(data);

  return data;
}

async function getArticleById(
  articleId: string,
  mode: Mode = "preview",
  category: ArticleCategory = "*"
) {
  const baseUrl = process.env.AMARA_STRAPI_URL ?? "http://localhost:1337";
  const path = `/api/articles/${articleId}`;

  const url = new URL(path, baseUrl);

  const query: Record<string, any> = {};

  if (mode === "deep") {
    query.populate = {
      Content: {
        fields: "*",
      },
    };
  }

  if (category !== "*") {
    query.filters = {
      Category: category,
    };
  }

  url.search = qs.stringify(query);

  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to fetch article with ID: ${articleId}`);
  }

  const data = await res.json();

  if (category !== "*" && data?.data?.Category !== category) {
    console.warn(`Article with ID ${articleId} does not match category ${category}`);
    return null;
  }

  console.log(data);
  return data;
}

interface ArticlesListProps {
  articleCategory?: ArticleCategory;
  mode?: Mode;
  articleId?: string;
  children?: React.ReactElement<{ data: ArticleData }> | React.ReactElement<{ data: ArticleData }>[];
}

export default async function ArticlesList({
  articleCategory = "*",
  mode = "preview",
  articleId,
  children,
}: ArticlesListProps) {
  let articles;

  if (articleId) {
    articles = await getArticleById(articleId, mode, articleCategory);
    if (!articles) {
      return (
        <div>
          <h1>No Article Found</h1>
          <p>The requested article does not match the specified category.</p>
        </div>
      );
    }
  } else {
    articles = await getArticles(articleCategory, mode);
    articles = transformData(articles)
  }

  console.log(articles);

  if (!children) {
    return (
      <div>
        <pre>{JSON.stringify(articles, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { data: articles })
          : child
      )}
    </div>
  );
}
