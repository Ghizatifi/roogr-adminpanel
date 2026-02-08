import { ErrorMessage, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { FaAsterisk } from 'react-icons/fa';

interface InputTextProps {
  type: string;
  name: string;
  label: string;
  min?: number;
  max?: number;
  isReq?: boolean;
  flex?: string;
}
export default function InputText({
  type,
  name,
  label,
  min,
  isReq,
  flex,
}: InputTextProps) {
  const { t } = useTranslation();
  return (
    <div>
      <div className={`md:mb-4 md:mt-1 mt-4 ${flex}`}>
        <label
          htmlFor={name}
          className="flex mb-2 text-md font-semibold text-gray-900 dark:text-white"
        >
          {label}
          {isReq ? '' : <FaAsterisk className="text-[4px] text-[#E02828]" />}
        </label>
        <Field
          type={type}
          min={min}
          name={name}
          id={name}
          className="md:w-36 w-full shadow-sm border border-gray-300 text-gray-900
              text-sm rounded-md block  p-1 outline-0 dark:placeholder-gray-400 dark:shadow-sm-light placeholder:text-xs"
          placeholder={t('admins.form.placeholder')}
        />
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-danger text-xs"
      />
    </div>
  );
}
