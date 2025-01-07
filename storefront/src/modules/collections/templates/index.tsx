import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import CTABlock from "@modules/common/components/blocks/cta-block"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      {process.env.AMARA_ECOM_ACTIVATED && (

        <RefinementList sortBy={sort} />
      )}
      <div className="w-full">
        <div className="mb-8 small:mx-12">
          <h1 className="mb-8 font-extrabold text-4xl text-center text-koiRed small:text-6xl small:text-start font-fatboy" data-testid="activities-page-title">{collection.title}</h1>
        </div>
        <div className="small:mx-12">

          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              collectionId={collection.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>

        <div className="my-16 small:my-32" data-testid="cta-block-container">
        <CTABlock
        className="min-h-[400px] lg:mx-12 lg:my-8 bg-no-repeat bg-bottom mb-16 "
        wrapperCss="backdrop-saturate-[.5] backdrop-blur-md backdrop-contrast-200 small:items-center"
        direction="center"
        title="Explore our Brews"
        titleSize="h3"
        titleCss="text-6xl text-koiWhite mb-8 lg:mg-0 px-4 small:text-center font-fatboy"
        paragraph={"Explore our lineup of handcrafted ales brewed with passion, innovation, and a touch of tradition"}
        parCss="text-justify text-2xl text-ui-fg-base px-4"
        backgroundImgUrl="/images/craft-beer.jpg"
        haveButton={true}
        buttonLink="/beers"
        buttonText="Our beers"
        buttonCss="block text-center mt-8 bg-koiRed font-bold"
      />
      </div>
      </div>
    </div>
  )
}
