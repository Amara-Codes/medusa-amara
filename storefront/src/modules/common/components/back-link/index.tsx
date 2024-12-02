
import React, {Fragment} from "react";

import Chevron from "@modules/common/icons/chevron";
import LocalizedClientLink from "../localized-client-link";

interface BackLinkProps {
  className?: string;
  href: string;
  label: string;
}

const BackLink: React.FC<BackLinkProps> = ({ className, href, label }) => {
  return (
    <LocalizedClientLink href={href} className={className}>
      <p className="flex items-center">
        <Chevron direction="left" />
        <span className="font-bold capitalize">{label}</span>
      </p>
    </LocalizedClientLink>
  );
};

export default BackLink;
