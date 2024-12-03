import React from "react";
import Chevron from "@modules/common/icons/chevron";
import Link from "next/link";
import Image from "next/image";

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
    <div className="border rounded-lg shadow-md p-4 mb-6 flex">
      <Link className="flex flex-col items-center text-ui-fg-base font-bold" href={{
        pathname: `/${type}/${slug}`,
        query: { id },
      }}>
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={title}
            width={500}
            height={500}
            className="w-full object-cover rounded-md mb-4 h-auto max-h-64"
          />

        )}
        <h2 className="text-xl font-bold mb-2 text-ui-fg-base">{title}</h2>

        {caption && <p className="text-gray-600 mb-4">{caption}</p>}
        <div className="mt-8 flex w-full justify-end grow items-end">



          <div className="flex items-center">

            <p className="pb-1 pe-2">Read more</p>
            <Chevron direction="right" />
          </div>


        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
