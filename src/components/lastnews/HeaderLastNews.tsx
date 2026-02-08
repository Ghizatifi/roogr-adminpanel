import { useTranslation } from 'react-i18next';
import { LuCalendarDays } from 'react-icons/lu';

const HeaderLastNews = () => {
  const { t } = useTranslation();
  return (
    <>
      <p className="text-2xl my-5 text-black dark:text-white flex ">
        <LuCalendarDays className="mx-3 mt-1" />
        {t('lastNews.title')}
      </p>
    </>
  );
};

export default HeaderLastNews;
