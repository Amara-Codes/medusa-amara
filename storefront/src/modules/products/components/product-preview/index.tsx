import { Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
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

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div className="relative" data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="can-label"
          className="bg-trasparent shadow-none"
          objectFit="contain"
        />

        {/* Overlay e testo */}
        <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-black/30 p-4">
          <Text className="text-koiOrange text-2xl sm:text-6xl font-bold" data-testid="product-title">
            {product.title}
          </Text>
          <Text className="text-koiYellow truncate max-w-80">
            {product.description}
          </Text>
        </div>

      </div>
    </LocalizedClientLink>
  )
}
