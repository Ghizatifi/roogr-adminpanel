import { Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { FaAsterisk } from 'react-icons/fa';
interface SelectLevelProps {
  name: string;
}
export default function SelectLevel({ name }: SelectLevelProps) {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="md:mb-3 md:mt-0 mt-4 font-semibold text-md flex">
        {t('admins.form.level')}
        <FaAsterisk className="text-[4px] text-[#E02828]" />
      </div>
      <Field
        as={`select`}
        name={name}
        id={name}
        className="shadow-sm border border-gray-300 text-gray-900 
            text-[14px] rounded-md md:w-36 w-full p- outline-0 dark:placeholder-gray-400 dark:shadow-sm-light"
      >
        <option value="" hidden>
          {t('admins.form.select-type')}
        </option>
        <option value="1">{t('admins.form.delegate')}</option>
        <option value="2">{t('admins.form.observer')}</option>
        <option value="3">{t('admins.form.supervisor')}</option>
      </Field>
    </div>
  );
}
