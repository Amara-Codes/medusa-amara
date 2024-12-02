import React from "react";
import Chevron from "@modules/common/icons/chevron";
import Link from "next/link";

interface ArticleCardProps {
  title: string;
  caption?: string;
  thumbnailUrl?: string;
  slug: string;
  type: string;
  id: string
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  caption,
  thumbnailUrl,
  slug,
  type,
  id
}) => {
  return (
    <div className="border rounded-lg shadow-md p-4 mb-6 flex flex-col">
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full object-cover rounded-md mb-4 h-auto max-h-64"
        />
      )}
      <h2 className="text-xl font-bold mb-2 text-ui-fg-base">{title}</h2>

      {caption && <p className="text-gray-600 mb-4">{caption}</p>}
      <div className="mt-8 flex justify-end grow items-end">


        <Link className="flex items-center text-ui-fg-base font-bold" href={{
          pathname: `/${type}/${slug}`,
          query: { id },
        }}>
          
          <span>Read more</span>
          <Chevron direction="right" />
          </Link>
       
      </div>

    </div>
  );
};

export default ArticleCard;
