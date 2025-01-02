import { getCollectionsList } from "@lib/data/collections"
import { getCategoriesList } from "@lib/data/categories"
import { clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Accordion from "@modules/common/components/accordion";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";



const CategoryList = ({ product_categories }: { product_categories: any[] }) => {

    return (
        <ul className="flex gap-x-3 flex-col gap-y-3 mt-4 w-full">
        {product_categories?.slice(0, 6).map((c) => {
          if (c.parent_category) {
            return
          }

          const children =
            c.category_children?.map((child: { name: any; handle: any; id: any; }) => ({
              name: child.name,
              handle: child.handle,
              id: child.id,
            })) || null

          return (
            <li
              className="flex gap-x-2 items-center"
              key={c.id}
            >
              <LocalizedClientLink
                className={clx(
                  "text-ui-fg-base hover:text-koiOrange",
                  children && ""
                )}
                href={`/categories/${c.handle}`}
              >
                {c.name}
              </LocalizedClientLink>
              {children && (
                <ul className="grid grid-cols-1 ml-3 gap-2">
                  {children &&
                    children.map((child: { id: Key | null | undefined; handle: any; name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }) => (
                      <li key={child.id}>
                        <LocalizedClientLink
                          className="text-ui-fg-base hover:text-koiOrange"
                          href={`/categories/${child.handle}`}
                        >
                          {child.name}
                        </LocalizedClientLink>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    )
}

const CollectionList = ({ collections }: { collections: any[] }) => {
    return (

        <ul className="flex gap-x-3 flex-col gap-y-3 mt-4 w-full">

            {collections?.slice(0, 6).map((c) => (
                <li key={c.id}>
                    <LocalizedClientLink
                        className="text-ui-fg-base hover:text-koiOrange"
                        href={`/collections/${c.handle}`}
                    >
                        {c.title}
                    </LocalizedClientLink>
                </li>
            ))}

        </ul>
    )
}



export default async function Filters() {
    const { collections } = await getCollectionsList(0, 6);
    const { product_categories } = await getCategoriesList(0, 6);
    const filterTabs = [
        {
            label: "Categories",
            component: <CategoryList product_categories={product_categories} />,
        },
        {
            label: "Collections",
            component: <CollectionList collections={collections} />,
        },
    ];



    return (
        <div className="w-full">
            <div className="hidden small:flex small:flex-col">
                <div className="gap-12 pt-3.5 pb-4 mb-8 small:min-w-[250px] flex flex-col">
                    {product_categories && product_categories?.length > 0 && (
                        <div>
                            <span className="text-ui-fg-base uppercase font-bold font-now">
                                Categories
                            </span>
                            <ul className="flex gap-x-3 flex-col gap-y-3 mt-4">
                                {product_categories?.slice(0, 6).map((c) => {
                                    if (c.parent_category) {
                                        return
                                    }

                                    const children =
                                        c.category_children?.map((child) => ({
                                            name: child.name,
                                            handle: child.handle,
                                            id: child.id,
                                        })) || null

                                    return (
                                        <li
                                            className="flex gap-x-2 items-center"
                                            key={c.id}
                                        >
                                            <LocalizedClientLink
                                                className={clx(
                                                    "text-ui-fg-base hover:text-koiOrange",
                                                    children && ""
                                                )}
                                                href={`/categories/${c.handle}`}
                                            >
                                                {c.name}
                                            </LocalizedClientLink>
                                            {children && (
                                                <ul className="grid grid-cols-1 ml-3 gap-2">
                                                    {children &&
                                                        children.map((child) => (
                                                            <li key={child.id}>
                                                                <LocalizedClientLink
                                                                    className="text-ui-fg-base hover:text-koiOrange"
                                                                    href={`/categories/${child.handle}`}
                                                                >
                                                                    {child.name}
                                                                </LocalizedClientLink>
                                                            </li>
                                                        ))}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="gap-12 pt-3.5 pb-4 mb-8 small:min-w-[250px] flex flex-col">
                    {collections && collections?.length > 0 && (
                        <div>
                            <span className="text-ui-fg-base uppercase font-bold font-now">
                                Collections
                            </span>
                            <ul className="flex gap-x-3 flex-col gap-y-3 mt-4">

                                {collections?.slice(0, 6).map((c) => (
                                    <li key={c.id}>
                                        <LocalizedClientLink
                                            className="text-ui-fg-base hover:text-koiOrange"
                                            href={`/collections/${c.handle}`}
                                        >
                                            {c.title}
                                        </LocalizedClientLink>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex small:hidden">
                <Accordion type="multiple" className="w-full">
                    {filterTabs.map((tab, i) => (
                        <Accordion.Item
                            key={i}
                            title={tab.label}
                            headingSize="large"
                            value={tab.label}
                            className="w-full"
                        >
                            {tab.component}
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}
