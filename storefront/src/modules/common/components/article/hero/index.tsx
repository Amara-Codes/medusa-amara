import React from 'react';
import { HeroElement } from 'types/strapi/hero';
import LocalizedClientLink from '../../localized-client-link';
import Image from 'next/image';
const Hero: React.FC<HeroElement> = ({
  HeroTitle,
  HeroSubtitle,
  HeroCssClasses = '',
  HeroButton,
  HeroBgImg,
  HeroWrapperCssClasses,
  HeroWrapperBgImg
}) => {
  return (
    <section
      className={`relative h-dvh ${HeroCssClasses} mb-12 overflow-hidden`}
    >

      <div className="relative w-full h-full">
        {HeroBgImg && (
          <Image
            src={HeroBgImg}
            alt="Hero Image"
            fill
            className='object-cover'
          />
        )}
        <div className={`absolute bottom-0 w-full h-full ${HeroWrapperCssClasses}`}>
          <div className="relative w-full h-full opacity-90">

            {HeroWrapperBgImg?.length ? (

              <Image
                src={HeroWrapperBgImg}
                fill
                alt="Wrapper background image"
              />

            ) : (

              <Image
                src="/images/heroWrapperBg.png"
                fill
                alt="Wrapper background image"
              />
            )}
          </div>
            <div className='text-center absolute bottom-0 w-full pb-4'>

              <h1 className="text-4xl font-bold mb-4 px-4">{HeroTitle}</h1>
              <p className="text-lg px-4 font-bold">{HeroSubtitle}</p>
              {HeroButton && (

                <LocalizedClientLink href={HeroButton.ButtonLink ?? "/"}
                  className={`inline-block px-6 py-3 ${HeroButton.ButtonCssClasses}`}
                  role="button">
                  {HeroButton.ButtonLabel}

                </LocalizedClientLink>
              )}
            </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
