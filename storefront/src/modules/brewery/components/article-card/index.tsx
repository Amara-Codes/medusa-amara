import React from "react";
import InteractiveLink from "@modules/common/components/interactive-link";

interface ArticleCardProps {
  title: string;
  caption?: string;
  thumbnailUrl?: string;
  slug: string;
  type: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  caption,
  thumbnailUrl,
  slug,
  type,
}) => {
  return (
    <div className="border rounded-lg shadow-md p-4 mb-6">
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full object-cover rounded-md mb-4 h-auto"
        />
      )}
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      {caption && <p className="text-gray-600 mb-4">{caption}</p>}
      <div className="mt-8">

      <InteractiveLink href={`/brewery/${type}/${slug}`}>
          Read more
        </InteractiveLink>
      </div>

    </div>
  );
};

export default ArticleCard;
