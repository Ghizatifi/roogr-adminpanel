import React from 'react';

interface TableCellProps {
  content: React.ReactNode;
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ content, className = '' }) => {
  return (
    <td
      className={`flex-1 min-w-0 p-3 text-[14px] font-[400] text-[#374151] dark:text-gray-200 text-center border-l border-[#E6E8F5]/50 dark:border-strokedark/50 first:border-l-0 ${className}`}
    >
      {content}
    </td>
  );
};

export default TableCell;
