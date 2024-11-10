import { Metadata } from "next"
import { Heading } from "@medusajs/ui"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import CTABlock from "@modules/common/components/blocks/cta-block"

const ctaPar = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi commodi minus expedita ut iusto consectetur cum. Dolore, quae ea. Ullam."

export const metadata: Metadata = {
  title: "Amara Beer Lab - Craft Brewery in Siem Reap | Sustainability & Community Impact",
  description:
    "Discover Amara Beer Lab, a craft brewery based in Siem Reap, Cambodia, dedicated to sustainability and supporting local communities. With high-quality beers crafted using technical excellence and modern methods to offer carefully designed, contemporary flavors, Amara Beer Lab blends authentic taste with social responsibility.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-6">
        <div>
          <Heading
            className="text-center text-6xl mb-4 lg:mg-0"
            level='h2'
          >
            Our products
          </Heading>
        </div>
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <div className="py-12">
        <CTABlock
          className="min-h-[800px] lg:mx-12 lg:my-8 bg-bottom"
          wrapperCss=""
          direction="dx"
          title="Handcraft Brewery based in Siem Reap"
          titleSize="h3"
          titleCss="text-6xl mb-16 lg:mg-0"
          paragraph={ctaPar}
          parCss="text-justify px-4"
          backgroundImgUrl={""}
          haveCta={true}
          ctaLink="/brewery"
          ctaText="Discover more"
          ctaCss="block text-center mt-8"
        />
      </div>
    </>
  )
}
