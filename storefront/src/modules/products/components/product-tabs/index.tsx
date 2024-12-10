"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

const isEcom = process.env.AMARA_ECOM_ACTIVATED;

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  // Definiamo sempre i tab disponibili
  const tabs = [
    {
      label: "Geek Insights",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ];

  // Filtriamo i tab in base alla condizione
  const filteredTabs = !isEcom ? tabs.filter((tab) => tab.label === "Geek Insights") : tabs;

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {filteredTabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="large"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className={clx(
      'text-small-regular',
      {
        'py-8': isEcom
      }
    )}>
      <div className="grid grid-cols-1 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div className="font-normal font-sans txt-medium text-ui-fg-subtle whitespace-pre-line">
            {product.subtitle && (() => {
              try {
                const parsedSubtitle: Record<string, any> = JSON.parse(product.subtitle);

                if (typeof parsedSubtitle === 'object' && parsedSubtitle !== null) {
                  return (
                    <ul className="pt-4">
                      {Object.entries(parsedSubtitle).map(([key, value]) => (
                        <li key={key} className="flex gap-2 w-full mb-4">
                          <p className="font-bold capitalize text-koiOrange">
                            <strong>{key}:</strong>
                          </p>
                          {typeof value === "string" ? (
                            <p className="font-normal text-koiYellow">{value}</p>
                          ) : Array.isArray(value) ? (
                            <p className="font-normal text-koiYellow">{value.join(", ")}</p>
                          ) : (
                            <p className="font-normal text-koiYellow">Info coming soon</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  );
                } else {
                  return <span>More info coming soon</span>;
                }
              } catch (error) {
                return <span>More info coming soon, stay tuned</span>;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Simple exchanges</span>
            <p className="max-w-sm">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Easy returns</span>
            <p className="max-w-sm">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
