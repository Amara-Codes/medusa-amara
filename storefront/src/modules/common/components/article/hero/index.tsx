import React from 'react';
import { HeroElement } from 'types/strapi/hero';

const Hero: React.FC<HeroElement> = ({
  HeroTitle,
  HeroSubtitle,
  HeroCssClasses = '',
  HeroButton,
  HeroBgImg
}) => {
  return (
    <section
      className={`relative h-dvh ${HeroCssClasses}`}
      style={{
        backgroundImage: `url(${HeroBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="flex flex-col justify-center items-center h-full text-center text-white"
        style={{ background: 'rgba(0, 0, 0, 0.5)' }} // Sovrapposizione opzionale per contrasto
      >
        <h1 className="text-4xl font-bold mb-4">{HeroTitle}</h1>
        <p className="text-lg mb-8">{HeroSubtitle}</p>
        {HeroButton && (
          <a
            href={HeroButton.ButtonLink}
            className={`inline-block px-6 py-3 bg-blue-600 rounded-md hover:bg-blue-700 ${HeroButton.ButtonCssClasses}`}
            role="button"
            type={HeroButton.ButtonType}
          >
            {HeroButton.ButtonLabel}
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;
