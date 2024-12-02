import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import DesktopCategories from "../desktopCat"
import DesktopCollections from "../desktopColl"
import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  page,
  countryCode,
}: {
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <div>

      <DesktopCollections />
      <DesktopCategories />
      </div>
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="beers-page-title">Our Beers</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
