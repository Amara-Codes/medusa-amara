import { Metadata } from "next";
import ArticlesList from "@modules/common/components/articles-fetcher";
import CTABlock from "@modules/common/components/blocks/cta-block";
export const metadata: Metadata = {
  title: "Activities: Engage & Explore",
  description: "Discover the social initiatives of our brewery, from community engagement to sustainability projects.",
}


export default function ActivitiesPage() {
  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="news-container"
    >
      <div className="w-full">
        <div className="mb-8 small:mx-12">
          <h1 className="mb-8 font-extrabold text-4xl text-center text-koiRed small:text-8xl small:text-start" data-testid="activities-page-title">Activities</h1>
          <div className="text-justify mb-16">
            <p className="text-koiYellow text-2xl">At our brewery, we believe that crafting great beer goes hand in hand with crafting a better world. Our social initiatives are rooted in our commitment to sustainability, community engagement, and cultural appreciation. From local environmental projects to educational workshops and collaborative events, we aim to create meaningful connections and lasting positive impacts. Explore our activities and join us in building a vibrant and responsible community where every pint makes a difference.</p>
          </div>
        </div>
        <ArticlesList articleCategory="activities" />

        <div className="small:mx-12">
          <CTABlock
            className="min-h-[800px] lg:mx-12 lg:my-8 bg-bottom"
            wrapperCss=""
            direction="dx"
            title="Read more about us"
            titleSize="h3"
            titleCss="text-6xl text-ui-fg-base mb-16 lg:mg-0"
            paragraph={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit suscipit obcaecati amet quas optio minus eius laboriosam maiores in quia itaque, veritatis alias officia molestias necessitatibus odio cum atque ullam. Natus alias distinctio porro voluptatibus! Quibusdam natus earum fugiat facere exercitationem tempore reiciendis quia molestias deleniti! Similique laborum blanditiis officia."}
            parCss="text-justify text-ui-fg-base px-4"
            backgroundImgUrl={""}
            haveButton={true}
            buttonLink="/brewery"
            buttonText="Discover now"
            buttonCss="block text-center mt-8"
          />
        </div>
      </div>
    </div>
  );
}