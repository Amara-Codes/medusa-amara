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
      className={`relative h-dvh ${HeroCssClasses} mb-12 overflow-hidden`}
      style={{
        backgroundImage: `url(${HeroBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="flex flex-col justify-end items-center h-full text-center text-ui-fg-base">
        <div className='w-full flex justify-center items-end pb-6'>

          <div className="skew-wrapper-1 bg-koiOrange/20 w-full skew-y-6 scale-[2.5] translate-y-6 backdrop-blur-sm">
            <div className="skew-wrapper-2 bg-koiRed/15 w-full -skew-y-12 scale-[2] translate-y-12  backdrop-blur-sm">
              <div className="w full skew-y-6 scale-[.20] -translate-y-6 pt-4">

                <h1 className="text-4xl font-bold mb-4">{HeroTitle}</h1>
                <p className="text-lg mb-8">{HeroSubtitle}</p>
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
