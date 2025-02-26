import { Text, Heading, clx, Button } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Image from "next/image"; // Importa il componente Image di Next.js

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
  imageCss?: string;
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
  imageCss = "",
}: ctaBlockProps) => {
  const isCentered = direction === "center" || className?.includes("centered");

  return (
    <div
      className={clx(
        "relative grid gap-4 cta-block overflow-hidden", // Aggiunto overflow-hidden
        {
          "md:grid-cols-2": !isCentered,
        },
        className
      )}
    >
      {/* Immagine a tutta larghezza con componente Image */}
      {backgroundImgUrl && (
        <div className={clx("absolute inset-0 z-10", imageCss)}>
          <Image
            src={backgroundImgUrl}
            alt={title || "CTA Image"}
            fill // Riempie l'intero contenitore
            style={{ objectFit: "cover" }} // Copre l'intero spazio disponibile
            quality={100} // Qualità massima
            priority // Priorità di caricamento
          />
        </div>
      )}

      {/* Contenuto testuale e pulsante */}
      <div
        className={clx(
          "col-span-1 flex flex-col justify-center text-center py-16 relative z-20",
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

      {/* Spazio vuoto per layout non centrato */}
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