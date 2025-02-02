import { Metadata } from "next"
import { Heading } from "@medusajs/ui"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import CTABlock from "@modules/common/components/blocks/cta-block"

export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | Craft Beers, Sustainability and Community Impact",
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
      <Hero bgImage="/hero.png" mobileBgImage="/hero-mobile.png"/>
      <div className="py-6">
        <div className="mt-8">
          <Heading
            className="text-center text-6xl mb-4 lg:mg-0 text-koiRed font-fatboy"
            level='h2'

          >
            Our Beers
          </Heading>
        </div>
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <div className="pt-12">
        <CTABlock
          className="min-h-[600px] lg:mt-8 bg-cover bg-center bg-no-repeat"
          wrapperCss=""
          direction="dx"
          title="Handcraft Brewery based in Siem Reap"
          titleSize="h3"
          titleCss="text-6xl mb-16 lg:mg-0 text-koiRed px-8"
          paragraph="Ready to dive into our vision and the story behind opening a brewery in Siem Reap? Discover what makes us unique and how we brew with passion and creativity"
          parCss="text-justify px-4 text-ui-fg-base px-8"
          backgroundImgUrl={"/images/malt.jpg"}
          haveButton={true}
          buttonLink="/brewery"
          buttonText="The Brewery"
          buttonCss="block text-center mt-8 bg-koiOrange text-ui-fg-base font-bold transition-all duration-500 hover:bg-koiRed shadow-none rounded-md"
        />
      </div>
    </>
  )
}
