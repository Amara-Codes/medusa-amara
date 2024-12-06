import { Metadata } from "next";
import ArticlesList from "@modules/common/components/articles-fetcher";
import CTABlock from "@modules/common/components/blocks/cta-block";
export const metadata: Metadata = {
  title: "Blog and Stories",
  description: "Discover the social initiatives of our brewery, from community engagement to sustainability projects.",
}


export default function BlogPage() {
  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="news-container"
    >
      <div className="w-full">
        <div className="mb-8 mx-12">
          <h1 className="text-koiRed text-4xl font-extrabold mb-8" data-testid="news-page-title">Blog</h1>
          <div className="text-justify mb-16">
            <p className="text-koiYellow text-2xl">Welcome to our blog, a vibrant tapestry of stories, insights, and reflections that go beyond the brewery walls. Here, we share the pulse of everyday life, unravel the art and science of brewing, and explore the rich culture and hidden gems of Siem Reap. From heartfelt narratives about our community to practical tips, event highlights, and deep dives into the world of craft beer, this space is where creativity flows freely. Dive into a mosaic of diverse content that celebrates the connections, flavors, and moments that inspire us every day.</p>
          </div>
        </div>
        <ArticlesList articleCategory="blog" />

        <div className="mx-12">
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
            haveCta={true}
            ctaLink="/brewery"
            ctaText="Discover now"
            ctaCss="block text-center mt-8"
          />
        </div>
      </div>
    </div>
  );
}