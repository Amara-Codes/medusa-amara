import { getCategoriesList } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"
import Accordion from "@modules/common/components/accordion";

export default async function CategoryFilter() {
  const { product_categories } = await getCategoriesList(0, 6);

  return (
    <div className="w-full">

      <div className="gap-12 pt-3.5 pb-4 mb-8 small:min-w-[250px] hidden small:flex small:flex-col">
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
      <div className="w-full flex small:hidden">
        <Accordion type="single" className="w-full">

          <Accordion.Item
            title="Categories"
            headingSize="large"
            value="Categories"
            className="w-full"
          >
            <ul className="flex gap-x-3 flex-col gap-y-3 mt-4 w-full">
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
          </Accordion.Item>

        </Accordion>
      </div>
    </div>
  )
}
