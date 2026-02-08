// Accordion.tsx
import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-5">
      <div
        className="max-w-40  shadow-md  rounded-md border border-Accordion-BorderLight dark:border-Accordion-BorderDark  flex justify-between  p-2 bg-Accordion-BgLight dark:bg-Accordion-BgDark  cursor-pointer"
        onClick={toggleAccordion}
      >
        <span className="text-lg font-medium">{title}</span>
        <button className="text-md">{isOpen ? '▲' : '▼'}</button>
      </div>
      {isOpen && <div className=" ">{children}</div>}
    </div>
  );
};

export default Accordion;
