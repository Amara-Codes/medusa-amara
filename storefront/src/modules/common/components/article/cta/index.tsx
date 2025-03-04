import React from 'react';
import { CtaElement } from 'types/strapi/cta';
import CTABlock from '@modules/common/components/blocks/cta-block';
import internal from 'stream';

const Cta: React.FC<CtaElement> = ({
  CtaTitle,
  CtaCaption,
  CtaCssClasses = "",
  CtaButton,
  CtaBgImg = "",
  CtaType
}) => {
  // Se CtaButton è un array, prendi il primo elemento
  const button = Array.isArray(CtaButton) ? CtaButton[0] : CtaButton;

  // Configura le props dinamiche per CTABlock
  const ctaBlockProps: any = {
    className: `${CtaCssClasses} ${!CtaBgImg?.length ? 'bg-gradient-to-bl from-koiBlack via-koiOrange/50 to-koiRed/90 text-koiWhite' : ''}`,
    wrapperCss: "",
    direction: "dx",
    title: CtaTitle ?? '',
    titleSize: "h3",
    titleCss: "mb-4 px-8 small:mb-16 text-4xl small:text-6xl",
    paragraph: CtaCaption ?? '',
    parCss: "px-4",
    haveButton: !!button,
    buttonLink: button?.ButtonLink ?? '/',
    buttonText: button?.ButtonLabel ?? 'Home',
    buttonCss: button?.ButtonCssClasses ?? 'mt-8 text-koiWhite bg-koiRed hover:bg-koiOrange shadow-none rounded-md',
  };

  // Aggiungi la prop backgroundImgUrl solo se CtaBgImg ha lunghezza
  if (CtaBgImg?.length) {
    ctaBlockProps.backgroundImgUrl = CtaBgImg;
  }

  if (CtaType === "external") {
    ctaBlockProps.internalLink = false
  }

  return (
    <div className="">
      <CTABlock {...ctaBlockProps} />
    </div>
  );
};

export default Cta;
