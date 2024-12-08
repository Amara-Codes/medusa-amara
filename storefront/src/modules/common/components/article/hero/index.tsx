import React from 'react';
import { HeroElement } from 'types/strapi/hero';
import LocalizedClientLink from '../../localized-client-link';

const Hero: React.FC<HeroElement> = ({
  HeroTitle,
  HeroSubtitle,
  HeroCssClasses = '',
  HeroButton,
  HeroBgImg
}) => {
  return (
    <section
      className={`relative h-dvh ${HeroCssClasses} mb-12`}
      style={{
        backgroundImage: `url(${HeroBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="flex flex-col justify-end items-center h-full text-center text-ui-fg-base ">
        <div className='backdrop-blur-sm bg-koiOrange/30 w-full pt-16'>

          <h1 className="text-4xl font-bold mb-4">{HeroTitle}</h1>
          <p className="text-lg mb-8">{HeroSubtitle}</p>
          {HeroButton && (

            <LocalizedClientLink  href={HeroButton.ButtonLink ?? "/"}
            className={`inline-block px-6 py-3 ${HeroButton.ButtonCssClasses}`}
            role="button">
              {HeroButton.ButtonLabel}
              
            </LocalizedClientLink>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
