import TypoParagraphBlock from "@modules/common/components/blocks/typo-par-block";
import CTABlock from "@modules/common/components/blocks/cta-block";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | Brewery",
  description: "Amara Beer Lab in Siem Reap: A craft brewery combining passion, tradition, and innovation. Explore our unique artisanal beers crafted in the heart of Siem Reap, Cambodia. Perfect for beer lovers and craft enthusiasts. Discover your next favorite brew today!",
}


export default function Brewery() {
  return (
    <div className="pt-24 mt-32">

      <TypoParagraphBlock
        className="lg:mb-48 px-6 pb-12"
        fatText="Why I opened a brewery in Cambodia?"
        fatTextPosition="sx"
        fatTextCss="leading-relaxed text-ui-fg-base pb-8 small:pb-4 border-b-4 text-4xl font-fatboy text-koiRed"
        paragraph={"Cambodia is a land of vibrant flavors, rich culture, and stunning landscapes. I saw a chance to craft something truly unique — a fusion of bold, artisanal beer and the spirit of this incredible country. But it's more than just crafting high-quality beer: I'm committed to giving back to the local community by supporting farmers, creating jobs, and fostering sustainable practices. Our brewery is a hub where amazing flavors meet meaningful impact, bringing people together while making a difference"}
        paragraphWrapperCss="lg:w-2/5 mb-12 mt-4 lg:mt-0"
        paragraphCss="text-lg text-justify md:text-start text-ui-fg-base mt-4 lg:mt-0"
      ></TypoParagraphBlock>

      <TypoParagraphBlock
        className="lg:mb-48 px-6 pb-12"
        fatText="Who am I?"
        fatTextPosition="dx"
        fatTextCss="leading-relaxed text-ui-fg-base pb-8 small:pb-4 border-b-4 text-4xl font-fatboy text-koiRed"
        paragraph={"I’m driven by passion, creativity, and a deep respect for nature, culture, and community. With a love for craft beer and a belief in its power to bring people together, I’ve dedicated myself to creating something that’s more than just a product—it’s an experience. Rooted in a commitment to sustainability and empowering the local community, I strive to blend craftsmanship with purpose, building connections that celebrate both people and place"}
        paragraphWrapperCss="lg:w-2/5 mb-12 mt-4 lg:mt-0"
        paragraphCss="text-lg text-justify md:text-start text-ui-fg-base mt-4 lg:mt-0"
      ></TypoParagraphBlock>

      <TypoParagraphBlock
        className="lg:mb-24 px-6 py-12"
        fatText="What Beers Do I Make?"
        fatTextPosition="sx"
        fatTextCss="leading-relaxed text-ui-fg-base pb-8 small:pb-4 border-b-4 text-4xl font-fatboy text-koiRed"
        paragraph={"Our beers are a blend of tradition, innovation, and a deep passion for the craft. Trained at one of Italy’s most prestigious brewing schools, I bring a wealth of expertise to every brew. Currently, I’m heavily inspired by American styles, focusing on modern techniques to extract the full potential of the hops we use. At the same time, I believe there’s still so much to explore in the rich Belgian brewing tradition and European styles as a whole. That’s why you’ll always find something unique on tap—whether it’s a bold English-style ale, a classic Belgian creation, or a reimagined historical brew adapted to the warm climate of Siem Reap. Every beer reflects my dedication to blending the old and the new, crafting flavors that align with the vision of our brand and the unique setting we call home"}
        paragraphWrapperCss="lg:w-2/5 mb-12 mt-4 lg:mt-0"
        paragraphCss="text-lg text-justify md:text-start text-ui-fg-base mt-4 lg:mt-0"
      ></TypoParagraphBlock>

      <CTABlock
        className="min-h-[400px] lg:mt-8 bg-center bg-no-repeat border-t-4"
        wrapperCss="backdrop-contrast-200 backdrop-saturate-200 backdrop-blur-md md:backdrop-blur-sm small:items-center"
        direction="dx"
        title="Ready to find your new favorite beer?"
        titleSize="h3"
        titleCss="text-4xl leading-normal small:text-6xl text-koiRed small:mb-8 px-4 small:text-center"
        paragraph={"Explore our lineup of handcrafted ales brewed with passion, innovation, and a touch of tradition"}
        parCss="text-justify text-2xl text-ui-fg-base px-4"
        backgroundImgUrl="/images/beer-shop.jpg"
        haveButton={true}
        buttonLink="/beers"
        buttonText="Our beers"
        buttonCss="block text-center mt-8 bg-koiRed font-bold shadow-none rounded-md hover:bg-koiOrange"
      />
    </div>
  )
}
