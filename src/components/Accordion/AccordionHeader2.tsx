import React, { useState } from 'react';
import AccordionTitle from './AcoordionHeader2Tile';
// import AccordionTitle from './AccordionHeader2Tile';

interface AccordionProps {
  titles: string[];
  children: React.ReactNode[];
  footerItems?: React.ReactNode[];
  onTitleClick?: (index: number) => void; // Marked as optional
}

const AccordionHeader2: React.FC<AccordionProps> = ({
  titles,
  children,
  footerItems,
  onTitleClick,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    // Only call onTitleClick if it is provided
    if (onTitleClick) {
      onTitleClick(index);
    }
  };

  return (
    <>
      <div className="mb-5b my-3 dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight">
        <div className="mx-4 flex justify-between cursor-pointer">
          {/* <div className="py-2 flex justify-start gap-0.5 cursor-pointer">
            {titles?.map((title, index) => (
              <AccordionTitle
                key={index}
                title={title}
                isOpen={openIndex === index}
                onToggle={() => toggleAccordion(index)}
              />
            ))}
          </div> */}
          <div className="py-2 flex flex-wrap justify-start gap-1 sm:gap-3 md:gap-0.5 cursor-pointer">
            {titles?.map((title, index) => (
              <AccordionTitle
                key={index}
                title={title}
                isOpen={openIndex === index}
                onToggle={() => toggleAccordion(index)}
                className="flex-1 min-w-[150px] sm:min-w-[200px] md:min-w-[250px]" // Adjusts width per screen size
              />
            ))}
          </div>
          <div>
            {footerItems?.map((item, index) => (
              <div
                key={index}
                className="p-4 w-full mx-5"
                hidden={openIndex !== index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Render children based on the open index */}
        {children?.map((child, index) => (
          <div key={index} className="p-4 w-full" hidden={openIndex !== index}>
            {child}
          </div>
        ))}
      </div>
    </>
  );
};

export default AccordionHeader2;
