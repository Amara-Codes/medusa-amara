import { FC } from 'react';
import { Button, Heading } from "@medusajs/ui";
import Link from 'next/link';

type HeroProps = {
  bgImage?: string;
  title?: string;
  subtitle?: string;
  haveButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
  buttonStyle?: string;
  bgSize?: 'cover' | 'contain';
  bgRepeat?: 'repeat' | 'no-repeat';
  bgPositionX?: string,
  bgPositionY?: string
};

const Hero: FC<HeroProps> = ({
  bgImage = '',
  title = 'Amara',
  subtitle = 'Beer Lab',
  haveButton = false,
  buttonText = 'Learn More',
  buttonLink = '/',
  buttonStyle = 'text-ui-fg-base bg-ui-bg-subtle hover:bg-ui-bg-hover',
  bgSize = 'cover',  // Valore di default per backgroundSize
  bgRepeat = 'repeat',
   bgPositionX = '',
  bgPositionY = ''
   // Valore di default per backgroundRepeat
}) => {
  return (
    <div
      className="h-[100dvh] w-full relative bg-ui-bg-subtle"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: bgSize,
        backgroundPosition: "center",
        backgroundRepeat: bgRepeat,
        backgroundPositionX: bgPositionX,
        backgroundPositionY: bgPositionY,
        top: "-100px"
      }}
    >
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-8 gap-6">
        <span>
          {title && (
            <Heading level="h1" className="text-6xl leading-10 text-ui-fg-base font-normal">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Heading level="h2" className="text-4xl leading-10 text-ui-fg-subtle font-normal">
              {subtitle}
            </Heading>
          )}
        </span>
        {haveButton && (
          <Link href={buttonLink} passHref>
            <Button className={`mt-6 ${buttonStyle}`}>
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
