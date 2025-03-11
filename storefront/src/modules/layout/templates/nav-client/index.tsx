"use client";

import React from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import SideMenu from "@modules/layout/components/side-menu";
import { clx } from "@medusajs/ui";
import { StoreRegion } from "@medusajs/types";
import Logo from "../logo";

const isEcom = process.env.AMARA_ECOM_ACTIVATED;

const hasInfoBanner = process.env.AMARA_INFO_BANNER_ACTIVE;
const infoBannerText = process.env.AMARA_INFO_BANNER_TEXT;
const infoBannerHasLink = process.env.AMARA_INFO_BANNER_HAS_LINK;
const infoBannerLinkLabel = process.env.AMARA_INFO_BANNER_LINK_LABEL;
const infoBannerLinkHref = process.env.AMARA_INFO_BANNER_LINK_HREF;

const NavClient: React.FC<{ regions: StoreRegion[] }> = ({ regions }) => {
  return (
    <header className="relative mx-auto duration-200 bg-transparent">
      <nav className="content-container txt-xsmall-plus text-ui-fg flex items-center justify-between w-full h-full text-small-regular py-4">
        <div className="flex-1 basis-0 h-full flex items-center">
          <div className="h-full">
            <SideMenu regions={regions} />
          </div>
        </div>

        <div
          className={clx("flex items-center h-full", {
            grow: !isEcom,
          })}
        >
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus"
            data-testid="nav-store-link"
          >
            <Logo />
          </LocalizedClientLink>
        </div>

        {isEcom && (
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </LocalizedClientLink>
            </div>
            <CartButton />
          </div>
        )}
      </nav>
      {hasInfoBanner === "true" && (
  <div className="bg-koiOrange overflow-hidden whitespace-nowrap relative">
    <p className="text-koiWhite font-bold inline-block animate-scroll">
      {infoBannerText}
      {infoBannerHasLink === "true" && (
        <a className="underline" href={infoBannerLinkHref} title={infoBannerLinkHref}>
          {infoBannerLinkLabel}
        </a>
      )}
    </p>
  </div>
)}
    </header>
  );
};

export default NavClient;
