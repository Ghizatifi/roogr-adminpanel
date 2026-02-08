import { useTranslation } from 'react-i18next';
import LoginHeader from '../../components/Header/LoginHeader';

export default function Notfound() {
  const { t } = useTranslation();
  return (
    <div>
      <LoginHeader />
      <h1 className={`text-center md:mt-10 text-lg md:text-2xl font-bold`}>
        {t('notfound.title')}
      </h1>
      <div className="flex justify-center">
        <img src="./../../../404error.png" alt="" width={600} />
      </div>
    </div>
  );
}
