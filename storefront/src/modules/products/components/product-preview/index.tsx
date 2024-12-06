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
      {/* Contenitore Thumbnail con posizione relativa */}
      <div className="relative">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
          className="max-h-80"
          objectFit="contain"
        />

        {/* Overlay e testo */}
        <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-black/30 p-4">
          <Text className="text-koiOrange text-6xl font-bold" data-testid="product-title">
            {product.title}
          </Text>
          <Text className="text-koiYellow truncate max-w-80">
            {product.description}
          </Text>
        </div>
      </div>
    </div>
  </LocalizedClientLink>
  )
}
