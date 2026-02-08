// AccordionFooter.tsx
import React from 'react';

interface AccordionFooterProps {
  items: React.ReactNode[]; // Array of items to be displayed in spans
}

const AccordionFooter: React.FC<AccordionFooterProps> = ({ items }) => {
  return (
    <div className="text-gray-700 flex gap-4 p-5 mx-8">
      {items.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </div>
  );
};

export default AccordionFooter;
