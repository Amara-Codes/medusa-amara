import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import CategoryFilter from "../filters/categories"
import CollectionFilter from "../filters/collections"
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

    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <div className="w-full">
        <div className="mb-16 small:mx-12">
          <h1 className="mb-16 font-extrabold text-4xl text-center text-koiRed small:text-8xl small:text-start" data-testid="activities-page-title">Our Beers</h1>
        </div>

        <div className="flex small:mx-12 flex-wrap small:flex-nowrap">
          <div className="w-full mb-16 small:w-auto small:mb-none">
            <CategoryFilter  />
            <CollectionFilter />
          </div>
         
            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                page={pageNumber}
                countryCode={countryCode}
              />
            </Suspense>
       
        </div>
      </div>

    </div>
  )
}

export default StoreTemplate
