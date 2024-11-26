// ParagraphElement.tsx
import React from 'react';
import { ParagraphElement } from 'types/strapi/paragraph';
import ReactMarkdown from 'react-markdown';

const Paragraph: React.FC<ParagraphElement> = ({
  ParagraphContent,
  ParagraphCssClasses = '',
}) => {
  return (
    <div className={`prose max-w-none py-8 ${ParagraphCssClasses}`}>
      <ReactMarkdown>{ParagraphContent}</ReactMarkdown>
    </div>
  );
};

export default Paragraph;
