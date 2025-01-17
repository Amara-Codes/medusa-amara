import { Button, Heading } from "@medusajs/ui";
import Link from "next/link";
import Image from "next/image";
import { clx } from "@medusajs/ui"

type HeroProps = {
  bgImage?: string;
  mobileBgImage?: string;
  title?: string;
  subtitle?: string;
  haveButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
  buttonStyle?: string;
  bgSize?: "cover" | "contain";
  mobileBgSize?: "cover" | "contain";
  bgRepeat?: "repeat" | "no-repeat";
  bgPositionX?: string;
  bgPositionY?: string;
  mobileBgPositionX?: string;
  mobileBgPositionY?: string;
};

const Hero = ({
  bgImage = "",
  mobileBgImage = "",
  title = "Amara",
  subtitle = "Beer Lab",
  haveButton = false,
  buttonText = "Learn More",
  buttonLink = "/",
  buttonStyle = "text-ui-fg-base bg-ui-bg-subtle hover:bg-ui-bg-hover",
  bgSize = "cover",
  mobileBgSize = "cover",
  bgRepeat = "no-repeat",
  bgPositionX = "center",
  bgPositionY = "center",
  mobileBgPositionX = "center",
  mobileBgPositionY = "center",
}: HeroProps) => {
  const haveMobileBgImage = Boolean(mobileBgImage);

  return (
    <div className="h-[100dvh] w-full relative bg-ui-bg-subtle">
      {/* Background Image with next/image */}
      {bgImage && (
        <>
          <Image
            src={haveMobileBgImage ? mobileBgImage : bgImage}
            alt="Hero Background"
            
            objectFit={haveMobileBgImage ? mobileBgSize : bgSize}
            objectPosition={
              haveMobileBgImage
                ? `${mobileBgPositionX} ${mobileBgPositionY}`
                : `${bgPositionX} ${bgPositionY}`
            }
            priority
            className={clx("z-0", haveMobileBgImage && "block small:hidden")}
            fill
          />
          {haveMobileBgImage && (
            <Image
              src={bgImage}
              alt="Hero Background Desktop"
             
              objectFit={bgSize}
              objectPosition={`${bgPositionX} ${bgPositionY}`}
              priority
              className="z-0 hidden small:block"
              fill
            />
          )}
        </>
      )}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-8 gap-6">
        <span>
          {title && (
            <Heading
              level="h1"
              className="text-8xl leading-10 text-ui-fg-base font-bold font-fatboy"
            >
              {title}
            </Heading>
          )}
          {subtitle && (
            <Heading
              level="h2"
              className="text-4xl leading-10 text-koiRed font-bold font-fatboy"
            >
              {subtitle}
            </Heading>
          )}
        </span>
        {haveButton && (
          <Link href={buttonLink} passHref>
            <Button className={`mt-6 ${buttonStyle}`}>{buttonText}</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
