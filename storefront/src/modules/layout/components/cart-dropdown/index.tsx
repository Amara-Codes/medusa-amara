"use client"

import { Popover, Transition } from "@headlessui/react"
import { Button } from "@medusajs/ui"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full small:flex">
        <Popover.Button className="h-full">
          <LocalizedClientLink
            className="hover:text-ui-fg-base relative"
            href="/cart"
            data-testid="nav-cart-link"
          >

            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16.5285 6C16.5098 5.9193 16.4904 5.83842 16.4701 5.75746C16.2061 4.70138 15.7904 3.55383 15.1125 2.65C14.4135 1.71802 13.3929 1 12 1C10.6071 1 9.58648 1.71802 8.88749 2.65C8.20962 3.55383 7.79387 4.70138 7.52985 5.75747C7.50961 5.83842 7.49016 5.9193 7.47145 6H5.8711C4.29171 6 2.98281 7.22455 2.87775 8.80044L2.14441 19.8004C2.02898 21.532 3.40238 23 5.13777 23H18.8622C20.5976 23 21.971 21.532 21.8556 19.8004L21.1222 8.80044C21.0172 7.22455 19.7083 6 18.1289 6H16.5285ZM8 11C8.57298 11 8.99806 10.5684 9.00001 9.99817C9.00016 9.97438 9.00044 9.9506 9.00084 9.92682C9.00172 9.87413 9.00351 9.79455 9.00718 9.69194C9.01451 9.48652 9.0293 9.18999 9.05905 8.83304C9.08015 8.57976 9.10858 8.29862 9.14674 8H14.8533C14.8914 8.29862 14.9198 8.57976 14.941 8.83305C14.9707 9.18999 14.9855 9.48652 14.9928 9.69194C14.9965 9.79455 14.9983 9.87413 14.9992 9.92682C14.9996 9.95134 14.9999 9.97587 15 10.0004C15 10.0004 15 11 16 11C17 11 17 9.99866 17 9.99866C16.9999 9.9636 16.9995 9.92854 16.9989 9.89349C16.9978 9.829 16.9957 9.7367 16.9915 9.62056C16.9833 9.38848 16.9668 9.06001 16.934 8.66695C16.917 8.46202 16.8953 8.23812 16.8679 8H18.1289C18.6554 8 19.0917 8.40818 19.1267 8.93348L19.86 19.9335C19.8985 20.5107 19.4407 21 18.8622 21H5.13777C4.55931 21 4.10151 20.5107 4.13998 19.9335L4.87332 8.93348C4.90834 8.40818 5.34464 8 5.8711 8H7.13208C7.10465 8.23812 7.08303 8.46202 7.06595 8.66696C7.0332 9.06001 7.01674 9.38848 7.00845 9.62056C7.0043 9.7367 7.00219 9.829 7.00112 9.89349C7.00054 9.92785 7.00011 9.96221 7 9.99658C6.99924 10.5672 7.42833 11 8 11ZM9.53352 6H14.4665C14.2353 5.15322 13.921 4.39466 13.5125 3.85C13.0865 3.28198 12.6071 3 12 3C11.3929 3 10.9135 3.28198 10.4875 3.85C10.079 4.39466 9.76472 5.15322 9.53352 6Z" fill="#0F0F0F" />
            </svg>
            <span className="absolute -top-2 -right-2 minicart-items-counter">{totalItems}</span>

          </LocalizedClientLink>
        </Popover.Button>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-gray-200 w-[420px] text-ui-fg-base"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-4 flex items-center justify-center">
              <h3 className="text-large-semi">Cart</h3>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[122px_1fr] gap-x-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.variant?.product?.handle}`}
                          className="w-24"
                        >
                          <Thumbnail
                            thumbnail={item.variant?.product?.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                                <h3 className="text-base-regular overflow-hidden text-ellipsis">
                                  <LocalizedClientLink
                                    href={`/products/${item.variant?.product?.handle}`}
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  Quantity: {item.quantity}
                                </span>
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice item={item} style="tight" />
                              </div>
                            </div>
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-1"
                            data-testid="cart-item-remove-button"
                          >
                            Remove
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                  <div className="flex items-center justify-between">
                    <span className="text-ui-fg-base font-semibold">
                      Subtotal{" "}
                      <span className="font-normal">(excl. taxes)</span>
                    </span>
                    <span
                      className="text-large-semi"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="w-full"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      Go to cart
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                    <span>0</span>
                  </div>
                  <span>Your shopping bag is empty.</span>
                  <div>
                    <LocalizedClientLink href="/store">
                      <>
                        <span className="sr-only">Go to all products page</span>
                        <Button onClick={close}>Explore products</Button>
                      </>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
