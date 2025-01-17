import React from 'react';
import { CtaElement } from 'types/strapi/cta';
import CTABlock from '@modules/common/components/blocks/cta-block';


const Cta: React.FC<CtaElement> = ({
  CtaTitle,
  CtaCaption,
  CtaCssClasses = "",
  CtaButton,
}) => {

  // Se CtaButton è un array, prendi il primo elemento
  const button = Array.isArray(CtaButton) ? CtaButton[0] : CtaButton;

  return (
    <div className="">
      <CTABlock
        className={CtaCssClasses}
        wrapperCss=""
        direction="dx"
        title={CtaTitle ?? ''}
        titleSize="h3"
        titleCss="text-6xl text-ui-fg-base mb-16 lg:mg-0"
        paragraph={CtaCaption ?? ''}
        parCss="text-ui-fg-base px-4"
        backgroundImgUrl={""}
        haveButton={!!button}
        buttonLink={button?.ButtonLink ?? '/'}
        buttonText={button?.ButtonLabel ?? 'Home'}
        buttonCss={button?.ButtonCssClasses ?? 'mt-12 shadow-none rounded-md'}
      />
    </div>
  );
};


export default Cta;