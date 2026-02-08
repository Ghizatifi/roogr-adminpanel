import React from 'react';
import { useTranslation } from 'react-i18next';
interface ProfileBioProps {
  Bio: string | null;
}
const Bio: React.FC<ProfileBioProps> = ({ Bio }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="bg-Input-blue border  border-Input-border rounded-sm text-[#767876] p-5">
        {Bio ? (
          <div>{Bio}</div>
        ) : (
          <div className="text-center">{t('NotData')}</div>
        )}
      </div>
    </>
  );
};

export default Bio;
