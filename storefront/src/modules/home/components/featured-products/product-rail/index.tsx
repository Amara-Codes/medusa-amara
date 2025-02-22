import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between mb-4 flex-col small:flex-row">
        <Text className="text-4xl text-bold text-koiOrange font-fatboy">{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`} className="justify-end small:justify-start my-4 small:my-0">
          Explore this drop
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-6 small:gap-y-12">
        {products &&
          products.map((product) => (
            <li key={product.id}>
              {/* @ts-ignore */}
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
