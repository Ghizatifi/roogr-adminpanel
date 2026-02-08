import React from 'react';
import { useTranslation } from 'react-i18next';

interface NotFoundSectionProps {
  data: unknown[];
  fallbackMessage?: string;
}

const NotFoundSection: React.FC<NotFoundSectionProps> = ({
  data,
  fallbackMessage,
}) => {
  const { t } = useTranslation();
  const message = fallbackMessage || t('NotData');

  return (
    data.length === 0 && (
      <div className="bg-Input-blue mt-5 border border-Input-border rounded-sm text-[#767876] p-5">
        <div>{message}</div>
      </div>
    )
  );
};

export default NotFoundSection;
