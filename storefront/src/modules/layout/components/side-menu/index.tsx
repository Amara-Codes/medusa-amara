"use client";

import { Popover, Transition } from "@headlessui/react";
import { ArrowRightMini, XMark } from "@medusajs/icons";
import { clx, useToggleState } from "@medusajs/ui";
import { Fragment, useEffect, useState } from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CountrySelect from "../country-select";
import { HttpTypes } from "@medusajs/types";

const isEcom = process.env.NEXT_PUBLIC_AMARA_ECOM_ACTIVATED;

const SideMenuItems = {
  "The Brewery": "/brewery",
  ...(isEcom
    ? { Store: "/store", Account: "/account", Cart: "/cart" }
    : { "Our Beers": "/beers" }),
  Blog: "/blog",
  Activities: "/activities",
  News: "/news",
  Contacts: "/contacts",
};

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState();
  const [lastScrollY, setLastScrollY] = useState(0);
  const threshold = 10; // Soglia per lo scroll

  useEffect(() => {
    const handleScroll = () => {
      if (toggleState.state && Math.abs(window.scrollY - lastScrollY) > threshold) {
        toggleState.close(); // Close the menu
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toggleState, lastScrollY]);

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className={`relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none ${open ? 'text-koiBlack' : 'text-koiWhite'}`}
                  title="nav-menu-button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>

                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl top-0">
                  <div
                    data-testid="nav-menu-popup"
                    className={clx(
                      "flex flex-col h-full bg-[rgba(3,7,18,0.5)] rounded-rounded p-6",
                      {
                        "justify-between": isEcom,
                        "justify-center": !isEcom,
                      }
                    )}
                  >
                    <div className="flex justify-end" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <XMark />
                      </button>
                    </div>
                    <ul
                      className={clx(
                        "flex flex-col gap-8 items-start justify-start",
                        {
                          "grow mt-8": !isEcom,
                        }
                      )}
                    >
                      {Object.entries(SideMenuItems).map(([name, href]) => (
                        <li key={name} className="md:mb-8">
                          <LocalizedClientLink
                            href={href}
                            className="text-2xl small:text-4xl leading-10 hover:text-koiOrange transition duration-500 font-fatboy"
                            onClick={close}
                            data-testid={`${name.toLowerCase()}-link`}
                          >
                            {name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                    </ul>
                    {isEcom && (
                      <div className="flex flex-col gap-y-6">
                        <div
                          className="flex justify-between"
                          onMouseEnter={toggleState.open}
                          onMouseLeave={toggleState.close}
                        >
                          {regions && (
                            <CountrySelect
                              toggleState={toggleState}
                              regions={regions}
                            />
                          )}
                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-150",
                              toggleState.state ? "-rotate-90" : ""
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default SideMenu;

