import React from "react";
import ThickChevron from "@modules/common/icons/thick-chevron";
import Link from "next/link";
import Image from "next/image";

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
    <div className="border rounded-lg shadow-md mb-6 flex min-h-[500px]">
      <Link
        className="w-full h-full relative flex flex-col items-center text-ui-fg-base font-bold"
        href={{
          pathname: `/${type}/${slug}`
        }}
      >
        <div className="relative w-full h-full">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill={true}
              className="object-cover rounded-md"
            />
          ) : (
            <div className="bg-gradient-to-bl from-koiWhite via-koiOrange to-koiRed rounded-md w-full h-full"></div>
          )}

          <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-black/40 p-4 rounded-b-md h-60 max-h-60 flex flex-col">
            <div className="grow flex flex-col justify-between">
              <h2 className="text-xl font-bold text-ui-fg-base mb-2 line-clamp-2 overflow-hidden text-ellipsis">{title}</h2>
              {caption && <p className="text-koiYellow font-light overflow-hidden text-ellipsis line-clamp-3">{caption}</p>}
            </div>

            <div className="mt-4 small:mt-8 flex w-full justify-end items-end hover:text-koiOrange transition duration-500">
              <div className="flex items-center">
                <p className="pb-1 pe-2 font-fatboy mt-2">Read more</p>
                <ThickChevron direction="right" size={16} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
