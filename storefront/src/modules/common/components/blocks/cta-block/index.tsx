import { Text, Heading, clx, Button } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

type ctaBlockProps = {
  className?: string;
  wrapperCss?: string;
  direction?: string;
  title?: string;
  titleSize?: "h1" | "h2" | "h3";
  titleCss?: string;
  paragraph?: string;
  parCss?: string;
  haveButton?: boolean;
  buttonText?: string;
  buttonCss?: string;
  buttonLink?: string;
  backgroundImgUrl?: string;
};

const CTABlock = ({
  className,
  wrapperCss,
  direction,
  title,
  titleCss,
  titleSize,
  paragraph,
  parCss,
  haveButton,
  buttonCss,
  buttonText,
  buttonLink,
  backgroundImgUrl,
}: ctaBlockProps) => {
  const isCentered = direction === "center" || className?.includes("centered");

  return (
    <div
      className={clx(
        "relative bg-cover grid gap-4 cta-block",
        {
          "md:grid-cols-2": !isCentered,
        },
        className
      )}
      style={backgroundImgUrl ? { backgroundImage: `url(${backgroundImgUrl})` } : undefined}
    >
      <div
        className={clx(
          "col-span-1 flex flex-col justify-center text-center py-16",
          {
            "order-3": direction === "dx",
          },
          wrapperCss
        )}
      >
        <Heading className={clx("", titleCss)} level={titleSize}>
          {title}
        </Heading>
        <Text className={clx("mt-4", parCss)} size="xlarge">
          {paragraph}
        </Text>
        {haveButton && (
          <LocalizedClientLink href={buttonLink ?? ""}>
            <Button
              className={clx(
                "mx-auto rounded-none transition duration-500",
                buttonCss
              )}
              size="large"
            >
              {buttonText}
            </Button>
          </LocalizedClientLink>
        )}
      </div>
      {!isCentered && (
        <div
          className={clx("order-2", {
            hidden: isCentered,
          })}
        ></div>
      )}
    </div>
  );
};

export default CTABlock;
