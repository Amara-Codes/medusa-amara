import React from "react";
import LocalizedClientLink from "../localized-client-link";

interface BackLinkProps {
  className?: string;
  href: string;
  label: string;
}

const BackLink: React.FC<BackLinkProps> = ({ className, href, label }) => {
  return (
    <LocalizedClientLink href={href} className={className}>
      <div className="flex items-center">
        <div className="pe-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z" />
          </svg>
        </div>
        <span className="font-bold capitalize">{label}</span>
      </div>
    </LocalizedClientLink>
  );
};

export default BackLink;
