import { Text, Heading, clx } from "@medusajs/ui"

type TypoParagraphBlockProps = {
  className?: string
  my?: "sm" | "md" | "lg"
  title?: string
  titleSize?: "h1" | "h2" | "h3"
  titleCss?: string
  fatText?: string
  fatTextPosition?: "sx" | "dx"
  fatTextCss?: string
  paragraph: string
  paragraphWrapperCss?: string
  paragraphCss?: string
}

const TypoParagraphBlock = ({
  className,
  my,
  title,
  titleSize,
  titleCss,
  fatText,
  fatTextPosition,
  fatTextCss,
  paragraph,
  paragraphWrapperCss,
  paragraphCss,
}: TypoParagraphBlockProps) => {
  return (
    <div className="wrapper">
      <Heading
        className={clx("ftext-center", titleCss)}
        level={titleSize}
      >
        {title}
      </Heading>
      <div
        className={clx(
          "flex justify-center md:justify-between flex-wrap lg:flex-nowrap",
          {
            "my-4": my === "sm",
            "my-8": my === "md",
            "my-12": my === "lg",
          },
          className
        )}
      >
        <div
          className={clx("typo-text-wrapper h-100 grow", {
            "order-1": fatTextPosition === "sx",
            "order-1 lg:order-2": fatTextPosition === "dx",
          })}
        >
          <Text className={clx("w-full max-w-2xl", {
            "mr-auto": fatTextPosition === "sx",
            "ml-auto text-end": fatTextPosition === "dx",
          },fatTextCss)}
          
          >{fatText}</Text>
        </div>

        <div
          className={clx("paragraph-wrapper",
            {
              "small:ps-12 order-2": fatTextPosition === "sx",
              "lg:pe-12 small:ps-12 order-1": fatTextPosition === "dx",
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

export default TypoParagraphBlock
