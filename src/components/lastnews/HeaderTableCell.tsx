import React from 'react';

interface HeaderTableCellProps {
  content: React.ReactNode;
  className?: string;
}

const HeaderTableCell: React.FC<HeaderTableCellProps> = ({
  content,
  className = '',
}) => {
  return (
    <th
      scope="col"
      className={`flex-1 min-w-0 p-3 py-2.5 text-[14px] font-medium text-[#374151] dark:text-gray-200 border-l border-[#E6E8F5] dark:border-strokedark first:border-l-0 ${className}`}
    >
      {content}
    </th>
  );
};

export default HeaderTableCell;
