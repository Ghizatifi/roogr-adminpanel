import React from 'react';
import HeaderTableCell from './HeaderTableCell';
import TableCell from './TableCell';

interface MainTableProps {
  logs: any;
  headers?: any;
  header2?: boolean;
}

const MainTable: React.FC<MainTableProps> = ({ logs, headers, header2 }) => {
  return (
    <div className="relative overflow-x-auto scroll-smooth  ">
      <table className="w-full text-[20px] text-left rtl:text-right">
        {/* Render thead for headers if provided */}
        {headers && logs?.length > 0 && headers.length > 0 && (
          <thead className="bg-[#EDEDED] dark:bg-[#3E3E46]">
            <tr className="flex justify-between">
              {headers?.map((header) => (
                <HeaderTableCell
                  key={header.key}
                  content={header.content}
                  className={`flex-1 ${
                    typeof header.className === 'function'
                      ? header.className(0) // Assuming index 0 for header rows
                      : header.className
                  }`}
                />
              ))}
            </tr>
          </thead>
        )}

    <tbody>
  {logs?.map((log, index) => (
    <tr
      key={`row-${log.customer_activity_id ?? index}`}
      className={`flex justify-between items-center ${
        header2
          ? index % 2 === 0
            ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
            : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'
          : index % 2 === 0
          ? 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'
          : 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
      }`}
    >
      {log.columns.map((col, colIndex) => (
        <TableCell
          key={`cell-${log.customer_activity_id ?? index}-${col.key ?? colIndex}`}
          content={
            col.isIcon ? (
              <span className="flex items-center">
                {col.IconComponent && (
                  <col.IconComponent className={col.iconClass} />
                )}
                {col.content}
              </span>
            ) : (
              col.content
            )
          }
          className={`flex-1 ${
            typeof col.className === 'function' ? col.className(index) : col.className
          }`}
        />
      ))}
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default MainTable;
// import React, { useEffect, useState } from 'react';
// import HeaderTableCell from './HeaderTableCell';
// import TableCell from './TableCell';

// interface MainTableProps {
//   logs: any;
//   headers?: any;
//   header2?: boolean;
// }

// const MainTable: React.FC<MainTableProps> = ({ logs, headers, header2 }) => {
//   const [isXScrollable, setIsXScrollable] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsXScrollable(window.innerWidth <= 1000);
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div
//       className={`relative ${
//         isXScrollable ? 'overflow-x-scroll' : ''
//       } scroll-smooth `}
//     >
//       <table className="w-full text-[20px] text-left rtl:text-right">
//         {/* Render thead for headers if provided */}
//         {headers && logs?.length > 0 && headers.length > 0 ? (
//           <thead className="bg-[#EDEDED] dark:bg-[#3E3E46]">
//             <tr className="flex justify-between">
//               {headers?.map((header) => (
//                 <HeaderTableCell
//                   key={header.key}
//                   content={header.content}
//                   className={`flex-1 ${
//                     typeof header.className === 'function'
//                       ? header.className(0)
//                       : header.className
//                   }`}
//                 />
//               ))}
//             </tr>
//           </thead>
//         ) : null}

//         <tbody>
//           {/* Render logs */}
//           {logs?.length > 0 ? (
//             logs.map((log, index) => (
//               <tr
//                 key={log.id}
//                 className={`flex justify-between items-center ${
//                   header2 // Check if header2 is true
//                     ? index % 2 === 0
//                       ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
//                       : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'
//                     : index % 2 === 0
//                     ? 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'
//                     : 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
//                 }`}
//               >
//                 {log.columns.map((col) => (
//                   <TableCell
//                     key={col.key}
//                     content={
//                       col.isIcon ? (
//                         <span className="flex items-center">
//                           {col.IconComponent && (
//                             <col.IconComponent className={col.iconClass} />
//                           )}
//                           {col.content}
//                         </span>
//                       ) : (
//                         col.content
//                       )
//                     }
//                     className={`flex-1 ${
//                       typeof col.className === 'function'
//                         ? col.className(index)
//                         : col.className
//                     }`}
//                   />
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={headers?.length || 1} className="text-center py-4">
//                 No data available.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MainTable;
