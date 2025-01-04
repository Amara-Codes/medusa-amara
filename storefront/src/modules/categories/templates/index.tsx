import { notFound } from "next/navigation"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import CTABlock from "@modules/common/components/blocks/cta-block"
import Accordion from "@modules/common/components/accordion"
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

  const accordions = [
    {
      label: "Read More",
      content: category.description,
    }
  ];

  const CustomTrigger = () => {
    return (
      <div className="rounded-rounded group relative p-4 custom-trigger">
        <div className="h-5 w-5 group-radix-state-open:rotate-180">
          {/* Ensure the SVG is part of the element affected by `group-radix-state-open` */}
          <div className="absolute top-1/2 left-1/2 duration-300 svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </div>
        </div>
      </div>
    );
  };
  

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
              <div className="hidden small:block">
                <p className="text-koiYellow text-2xl">
                  {category.description}
                </p>
              </div>
              <div className="block small:hidden">
                <Accordion type="multiple" className="w-full categories-accordion">
                  {accordions.map((accordion, i) => (
                    <Accordion.Item
                      key={i}
                      title={accordion.label}
                      headingSize="large"
                      value={accordion.label}
                      className="w-full text-koiYellow"
                      naked={true}
                      customTrigger={<CustomTrigger />}
                    >
                      {accordion.content}
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>

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
