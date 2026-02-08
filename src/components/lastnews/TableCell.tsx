// import React from 'react';

interface TableCellProps {
  content: string | JSX.Element;
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ content, className = '' }) => {
  return (
    <td className={`p-3 font-[400] text-[14px] text-center  ${className}`}>
      {content}
    </td>
  );
};

export default TableCell;
