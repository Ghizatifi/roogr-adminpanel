import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderTableCell from './HeaderTableCell';
import TableCell from './TableCell';

export interface HeaderColumn {
  key: string;
  content: React.ReactNode;
  className?: string | ((rowIndex: number) => string);
}

export interface LogColumn {
  key?: string;
  content: React.ReactNode;
  className?: string | ((rowIndex: number) => string);
  isIcon?: boolean;
  IconComponent?: React.ComponentType<{ className?: string }>;
  iconClass?: string;
}

export interface LogRow {
  id?: number | string;
  customer_activity_id?: number;
  columns: LogColumn[];
}

interface MainTableProps {
  logs: LogRow[] | null | undefined;
  headers?: HeaderColumn[];
  header2?: boolean;
  /** Accessible description for the table */
  ariaLabel?: string;
}

const MainTable: React.FC<MainTableProps> = ({
  logs,
  headers = [],
  header2,
  ariaLabel,
}) => {
  const { t } = useTranslation();
  const hasHeaders = headers && headers.length > 0;
  const hasLogs = logs && logs.length > 0;
  const columnCount = hasHeaders ? headers.length : (hasLogs && logs[0]?.columns) ? logs[0].columns.length : 1;

  return (
    <div className="relative overflow-x-auto scroll-smooth rounded-xl border border-[#E6E8F5] dark:border-strokedark">
      <table
        className="w-full min-w-[600px] table-auto text-left rtl:text-right text-base"
        role="grid"
        aria-label={ariaLabel}
      >
        {hasHeaders && (
          <thead>
            <tr className="flex border-b border-[#E6E8F5] bg-[#F9FAFF] dark:border-strokedark dark:bg-white/5">
              {headers.map((header) => (
                <HeaderTableCell
                  key={header.key}
                  content={header.content}
                  className={
                    typeof header.className === 'function'
                      ? header.className(0)
                      : header.className ?? ''
                  }
                />
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {hasLogs ? (
            logs.map((log, index) => (
              <tr
                key={log.id ?? log.customer_activity_id ?? `row-${index}`}
                className={
                  header2
                    ? index % 2 === 0
                      ? 'flex bg-[#F9FAFF] dark:bg-MainTableBG-OddDark border-b border-[#E6E8F5]/50 dark:border-strokedark/50'
                      : 'flex bg-white dark:bg-MainTableBG-EvenDark border-b border-[#E6E8F5]/50 dark:border-strokedark/50'
                    : index % 2 === 0
                    ? 'flex bg-white dark:bg-MainTableBG-EvenDark border-b border-[#E6E8F5]/50 dark:border-strokedark/50'
                    : 'flex bg-[#F9FAFF] dark:bg-MainTableBG-OddDark border-b border-[#E6E8F5]/50 dark:border-strokedark/50'
                }
              >
                {log.columns.map((col, colIndex) => (
                  <TableCell
                    key={col.key ?? `cell-${index}-${colIndex}`}
                    content={
                      col.isIcon ? (
                        <span className="flex items-center justify-center gap-1">
                          {col.IconComponent && (
                            <col.IconComponent className={col.iconClass} />
                          )}
                          {col.content}
                        </span>
                      ) : (
                        col.content
                      )
                    }
                    className={
                      typeof col.className === 'function'
                        ? col.className(index)
                        : col.className
                    }
                  />
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columnCount}
                className="px-4 py-8 text-center text-[#A5A9C5] dark:text-bodydark text-sm"
              >
                {t('NotData')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
