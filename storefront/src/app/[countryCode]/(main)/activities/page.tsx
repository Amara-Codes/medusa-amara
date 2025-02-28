import { Metadata } from "next";
import ActivitiesFetcher from "@modules/strapi/activities-fetcher";
import CTABlock from "@modules/common/components/blocks/cta-block";
export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | Activities: Engage & Explore",
  description: "Discover the social initiatives of our brewery, from community engagement to sustainability projects.",
}


export default function ActivitiesPage() {
  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container mt-32"
      data-testid="news-container"
    >
      <div className="w-full">
        <div className="mb-8 small:mx-12">
          <h1 className="mb-8 font-extrabold text-4xl text-center text-koiRed small:text-8xl small:text-start font-fatboy" data-testid="activities-page-title">Activities</h1>
          <div className="text-justify mb-16">
            <p className="text-koiYellow text-2xl">At our brewery, we believe that crafting great beer goes hand in hand with crafting a better world. Our social initiatives are rooted in our commitment to sustainability, community engagement, and cultural appreciation. From local environmental projects to educational workshops and collaborative events, we aim to create meaningful connections and lasting positive impacts. Explore our activities and join us in building a vibrant and responsible community where every pint makes a difference.</p>
          </div>
        </div>
        <ActivitiesFetcher />

        <div>
          <CTABlock
            className="h-[500px] lg:mx-12 lg:mb-8 bg-top rounded-lg"
            wrapperCss="h-full"
            direction="dx"
            title="Let's keep in touch"
            titleSize="h3"
            titleCss="text-6xl text-ui-fg-base mb-4 small:mb-16 lg:mg-0"
            paragraph="Want to stay updated on all our exciting activities? Connect with us on social media or find us on Google Maps to visit in person. Let’s keep the conversation going and grow something amazing together!"
            parCss="text-justify text-ui-fg-base px-4"
            backgroundImgUrl="/images/contacts.jpg"
            haveButton={true}
            buttonLink="/contacts"
            buttonText="Find Us"
            buttonCss="block text-center mt-8 bg-koiRed shadow-none rounded-md"
          />
        </div>
      </div>
    </div>
  );
}