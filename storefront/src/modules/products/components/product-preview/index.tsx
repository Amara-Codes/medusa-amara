import { Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }


  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div className="bg-black/30 rounded-lg" data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="can-label"
          className="bg-trasparent shadow-none"
          objectFit="contain"
        />

        <div className="p-4">
          <Text className="text-koiOrange text-2xl sm:text-3xl font-bold text-nowrap" data-testid="product-title">
            {product.title}
          </Text>
        </div>

      </div>
    </LocalizedClientLink>
  )
}
