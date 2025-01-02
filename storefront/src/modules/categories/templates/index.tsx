import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import CTABlock from "@modules/common/components/blocks/cta-block"


export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const category = categories[categories.length - 1]

  if (!category || !countryCode) notFound()

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      {process.env.AMARA_ECOM_ACTIVATED && (


        <RefinementList sortBy={sort} data-testid="sort-by-container" />
      )}
      <div className="w-full">
        <div className="mb-8 small:mx-12">

          <h1 className="mb-8 font-extrabold text-4xl text-center text-koiRed small:text-8xl small:text-start" data-testid="category-page-title">{category.name}</h1>
          {category.description && (
            <div className="text-justify mb-16">
              <p className="text-koiYellow text-2xl">
                {category.description}
              </p>

            </div>
          )}
        </div>

        <div className="small:mx-12">

          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>

        <div className="my-16 small:my-32" data-testid="cta-block-container">
        <CTABlock
        className="min-h-[400px] lg:mx-12 lg:my-8 bg-no-repeat bg-bottom mb-16 "
        wrapperCss="backdrop-saturate-200 backdrop-blur-sm small:items-center"
        direction="center"
        title="Explore our Brews"
        titleSize="h3"
        titleCss="text-6xl text-koiWhite mb-8 lg:mg-0 px-4 small:text-center"
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
