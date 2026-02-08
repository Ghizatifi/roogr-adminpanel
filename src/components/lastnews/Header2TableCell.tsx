import React from 'react';

interface HeaderTableCellProps {
  content: string;
  className: string;
}

const Header2TableCell: React.FC<HeaderTableCellProps> = ({
  content,
  className,
}) => {
  return (
    <th
      className={`p-3 py-2 border-l text-[18px] border-l-TheadBorder-light dark:border-l-TheadBorder-dark font-[400] dark:text-red text-[#000000] ${className}`}
    >
      {content}
    </th>
  );
};

export default Header2TableCell;
