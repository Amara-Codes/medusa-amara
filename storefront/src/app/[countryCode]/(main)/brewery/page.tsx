import ParagraphBlock from "@modules/common/components/blocks/par-block";
import TypoParagraphBlock from "@modules/common/components/blocks/typo-par-block";
import CTABlock from "@modules/common/components/blocks/cta-block";
import ArticlesList from "@modules/common/components/articles-fetcher";
export default function Brewery() {
  return (
    <div className="lg:pb-48 pt-24">

      <TypoParagraphBlock
        className="lg:mb-48 mx-12 pb-12"
        fatText="Why I opened a brewery in Cambodia"
        fatTextPosition="sx"
        fatTextCss="leading-relaxed text-ui-fg-base border-b-4 text-4xl"
        paragraph={"Lorem ipsum dolor sit amet consectetur adipisicing elit. A doloremque magni ipsam provident ratione! Autem quam reiciendis fugit minus! Dolorum maxime sequi amet minus iure aut placeat vitae adipisci architecto?"}
        paragraphWrapperCss="lg:w-2/5 mb-12 mt-4 lg:mt-0"
        paragraphCss="text-lg text-justify md:text-start text-ui-fg-base mt-4 lg:mt-0"
      ></TypoParagraphBlock>

      <TypoParagraphBlock
        className="lg:mb-48 mx-12 pb-12"
        fatText="Who am I"
        fatTextPosition="dx"
        fatTextCss="leading-relaxed text-ui-fg-base border-b-8 text-4xl"
        paragraph={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit suscipit obcaecati amet quas optio minus eius laboriosam maiores in quia itaque, veritatis alias officia molestias necessitatibus odio cum atque ullam. Natus alias distinctio porro voluptatibus! Quibusdam natus earum fugiat facere exercitationem tempore reiciendis quia molestias deleniti! Similique laborum blanditiis officia."}
        paragraphWrapperCss="lg:w-2/5 mb-12 mt-4 lg:mt-0"
        paragraphCss="text-lg text-justify md:text-start text-ui-fg-base mt-4 lg:mt-0"
      ></TypoParagraphBlock>

      <ParagraphBlock
        className="lg:mb-48"
        title="Our Beers"
        titleSize="h3"
        titleCss="leading-relaxed mb-8 lg:mb-24 text-ui-fg-base text-4xl bold"
        imgAlt="H ring"
        imgPosition="sx"
        paragraph={"Lorem ipsum dolor sit amet consectetur adipisicing elit."}
        paragraphWrapperCss="md:w-2/5 my-12 md:mt-0"
        paragraphCss="text-lg text-justify md:text-start text-ui-fg-base"
      />

      <TypoParagraphBlock
        className="lg:mb-48 mx-12 py-12"
        fatText="What else"
        fatTextPosition="sx"
        fatTextCss="leading-relaxed text-ui-fg-base border-b-4 text-4xl"
        paragraph={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit suscipit obcaecati amet quas optio minus eius laboriosam maiores in quia itaque, veritatis alias officia molestias necessitatibus odio cum atque ullam. Natus alias distinctio porro voluptatibus! Quibusdam natus earum fugiat facere exercitationem tempore reiciendis quia molestias deleniti! Similique laborum blanditiis officia."}
        paragraphWrapperCss="lg:w-2/5 mb-12 mt-4 lg:mt-0"
        paragraphCss="text-lg text-justify md:text-start text-ui-fg-base mt-4 lg:mt-0"
      ></TypoParagraphBlock>

      <CTABlock
        className="min-h-[800px] lg:mx-12 lg:my-8 bg-bottom"
        wrapperCss=""
        direction="dx"
        title="Explore our campains"
        titleSize="h3"
        titleCss="text-6xl text-ui-fg-base mb-16 lg:mg-0"
        paragraph={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit suscipit obcaecati amet quas optio minus eius laboriosam maiores in quia itaque, veritatis alias officia molestias necessitatibus odio cum atque ullam. Natus alias distinctio porro voluptatibus! Quibusdam natus earum fugiat facere exercitationem tempore reiciendis quia molestias deleniti! Similique laborum blanditiis officia."}
        parCss="text-justify text-ui-fg-base px-4"
        backgroundImgUrl={""}
        haveCta={true}
        ctaLink="/"
        ctaText="Our campains"
        ctaCss="block text-center mt-8"
      />

     <ArticlesList limit={6} articleCategory="blog"/>
    </div>
  )
}
