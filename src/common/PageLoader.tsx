import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useTranslation } from 'react-i18next';

interface BreadcrumbLink {
  label: string;
  path: string;
}

interface PageLoaderProps {
  /** Page name for breadcrumb (e.g. "Users") */
  pageName?: string;
  /** Links for breadcrumb (e.g. [{ label: 'Users', path: '/users' }]) */
  breadcrumbLinks?: BreadcrumbLink[];
  /** Optional label under spinner (e.g. "Chargement...") */
  label?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  pageName = '',
  breadcrumbLinks = [],
  label,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {(pageName || breadcrumbLinks.length > 0) && (
        <Breadcrumb pageName={pageName} breadcrumbLinks={breadcrumbLinks} />
      )}
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent dark:border-[#70F1EB] dark:border-t-transparent" />
        <p className="mt-4 text-sm text-body dark:text-bodydark">
          {label ?? t('common.loading')}
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
