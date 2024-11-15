import { getCategoriesList } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"
import TypoParagraphBlock from "@modules/layout/components/typo-par-block"

export default async function MobileCategories() {
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <div className="mobile-store my-8 pt-8 p-4">
    <TypoParagraphBlock
        className="mb-8"
        my="sm"
        fatText="Categories"
        fatTextPosition="sx"
        fatTextCss="leading-relaxed text-[42px] text-ui-fg-base text-center mb-6 mx-auto"
        paragraph="Discover out exclusive products, remeber: each piece is unique and completly handmade and handforged"
        paragraphWrapperCss="lg:w-2/5 mb-4"
        paragraphCss="text-lg font-now text-justify md:text-start text-ui-fg-base"
      ></TypoParagraphBlock>

      <ul className="grid grid-cols-1 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
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
            <li className="flex gap-x-2 items-center justify-center border-2 border-stone-700 dark:border-stone-100 py-4 mobile-cat mb-4" key={c.id}>
              <LocalizedClientLink
                className={clx(
                  "hover:text-ui-fg-base text-ui-fg-base font-tostada text-4xl",
                  children && "txt-small-plus"
                )}
                href={`/categories/${c.handle}`}
              >
                {c.name}
              </LocalizedClientLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
