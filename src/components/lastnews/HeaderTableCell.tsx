import React from 'react';

interface HeaderTableCellProps {
  content: string;
  className: string;
}

const HeaderTableCell: React.FC<HeaderTableCellProps> = ({
  content,
  className,
}) => {
  return (
    <th
      className={`p-3 py-2 border-l text-[14px] border-l-TheadBorder-light dark:border-l-TheadBorder-dark font-[400] dark:text-[#FFFFFF] text-[#000000] ${className}`}
    >
      {content}
    </th>
  );
};

export default HeaderTableCell;
