import React, { useState } from 'react';
import { TabsPill } from '../TabsPill';

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    if (onTitleClick) {
      onTitleClick(index);
    }
  };

  const tabs = titles.map((label, i) => ({ id: String(i), label }));
  const value = openIndex === null ? '' : String(openIndex);
  const handleTabChange = (id: string) => {
    const index = Number(id);
    toggleAccordion(index);
  };

  return (
    <>
      <div className="mb-5b my-3 dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight">
        <div className="mx-4 flex justify-between cursor-pointer">
          <div className="py-2 flex flex-wrap items-center gap-2">
            <TabsPill
              tabs={tabs}
              value={value}
              onChange={handleTabChange}
              glider={true}
            />
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
