import { Text, Heading, clx } from "@medusajs/ui"
import Image, { StaticImageData } from "next/image"

type ParagraphBlockProps = {
  className?: string
  my?: "sm" | "md" | "lg"
  title?: string
  titleSize?: "h1" | "h2" | "h3"
  titleCss?: string
  imgPath?: StaticImageData
  imgAlt: string
  imgPosition?: "sx" | "dx"
  paragraph: string
  paragraphWrapperCss?: string
  paragraphCss?: string
}

const ParagraphBlock = ({
  className,
  my,
  title,
  titleSize,
  titleCss,
  imgPath,
  imgAlt,
  imgPosition,
  paragraph,
  paragraphWrapperCss,
  paragraphCss,
}: ParagraphBlockProps) => {
  return (
    <div  className={clx(
      "wrapper",
      className
    )}
  >
      <Heading
        className={clx("text-center", titleCss)}
        level={titleSize}
      >
        {title}
      </Heading>
      <div
        className={clx(
          "flex mx-12 justify-center md:justify-between flex-wrap",
          {
            "my-4": my === "sm",
            "my-8": my === "md",
            "my-12": my === "lg",
          }
        )}
      >
        <div
          className={clx("img-wrapper h-100 grow", {
            "order-1": imgPosition === "sx",
            "order-2": imgPosition === "dx",
          })}
        >
          {imgPath && (


          <Image     className={clx("w-full max-w-2xl", {
            "mr-auto": imgPosition === "sx",
            "ml-auto": imgPosition === "dx",
          })}src={imgPath} alt={imgAlt}></Image>
          )}
        </div>

        <div
          className={clx("paragraph-wrapper",
            {
              "md:ps-12 order-2": imgPosition === "sx",
              "md:pe-12 order-1": imgPosition === "dx",
            },

            paragraphWrapperCss
          )}
        >
          <Text
            className={clx(
              "",

              paragraphCss
            )}
          >
            {paragraph}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ParagraphBlock
