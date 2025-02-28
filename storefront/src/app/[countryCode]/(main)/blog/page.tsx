import { Metadata } from "next";
import ArticlesFetcherWrapper from "@modules/strapi/articles-fetcher-wrapper";
import CTABlock from "@modules/common/components/blocks/cta-block";
export const metadata: Metadata = {
  title: "Brewery in Siem Reap - Amara Beer Lab | Blog and Stories",
  description: "Discover the social initiatives of our brewery, from community engagement to sustainability projects.",
}


export default function BlogPage() {
  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container mt-32"
      data-testid="news-container"
    >
      <div className="w-full">
        <div className="mb-8 small:mx-12">
          <h1 className="mb-8 font-extrabold text-4xl text-center text-koiRed small:text-8xl small:text-start font-fatboy" data-testid="blog-page-title">Blog</h1>
          <div className="text-justify mb-16">
            <p className="text-koiYellow text-2xl">Welcome to our blog, a vibrant tapestry of stories, insights, and reflections that go beyond the brewery walls. Here, we share the pulse of everyday life, unravel the art and science of brewing, and explore the rich culture and hidden gems of Siem Reap. From heartfelt narratives about our community to practical tips, event highlights, and deep dives into the world of craft beer, this space is where creativity flows freely. Dive into a mosaic of diverse content that celebrates the connections, flavors, and moments that inspire us every day.</p>
          </div>
        </div>
       <ArticlesFetcherWrapper initialCategory="blog" articlesPerPage={3}/>

        <div className="small:mx-12">
          <CTABlock
            className="min-h-[300px] lg:my-8 bg-center rounded-lg"
            wrapperCss=""
            direction="dx"
            title="Brewery Buzz"
            titleSize="h3"
            titleCss="text-6xl text-koiWhite my-8 px-4 lg:mg-0"
            paragraph={"Stay updated with the latest news from Amara Beer Lab! From upcoming events in Siem Reap to new beer releases and collaborations, our News section is where you’ll find all the fresh updates!"}
            parCss="text-justify text-koiWhite px-4"
            backgroundImgUrl="/images/beer.jpg"
            haveButton={true}
            buttonLink="/news"
            buttonText="Explore latest Updates"
            buttonCss="block text-center my-8 font-bold bg-koiWhite text-koiOrange hover:bg-koiOrange hover:text-koiWhite shadow-none rounded-md"
          />
        </div>
      </div>
    </div>
  );
}