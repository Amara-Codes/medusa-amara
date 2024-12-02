// Hero.tsx
import React from 'react';
import { HeroElement } from 'types/strapi/hero';

const Hero: React.FC<HeroElement> = ({
  HeroTitle,
  HeroSubtitle,
  HeroCssClasses = '',
  HeroButton,
}) => {
  return (
    <section className={`py-12 h-dvh ${HeroCssClasses}`}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-ui-fg-base">{HeroTitle}</h1>
        <p className="text-lg mb-8 text-ui-fg-base">{HeroSubtitle}</p>
        {HeroButton && (
          <a
            href={HeroButton.ButtonLink}
            className={`inline-block px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 ${HeroButton.ButtonCssClasses}`}
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
