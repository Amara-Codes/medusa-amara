import React from "react";
import LocalizedClientLink from "../localized-client-link";
import ThickChevron from "@modules/common/icons/thick-chevron";
interface BackLinkProps {
  className?: string;
  href: string;
  label: string;
}

const BackLink: React.FC<BackLinkProps> = ({ className, href, label }) => {
  return (
    <LocalizedClientLink href={href} className={`${className}`}>
      <div className="flex items-center">
        <div className="pe-2">
          <ThickChevron direction="left" size={16}/>
        </div>
        <p className="font-bold capitalize">{label}</p>
      </div>
    </LocalizedClientLink>
  );
};

export default BackLink;
