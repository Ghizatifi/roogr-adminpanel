import { useTranslation } from 'react-i18next';

export default function NotfoundUser() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className={`text-center md:mt-10 text-lg md:text-2xl font-bold`}>
        {t('notfound.user')}
      </h1>
      <div className="flex justify-center">
        <img src="./../../../404error.png" alt="" width={600} />
      </div>
    </div>
  );
}
