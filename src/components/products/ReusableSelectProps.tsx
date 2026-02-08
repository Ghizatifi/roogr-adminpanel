import React from 'react';

interface ReusableSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  extraClass?: string;
  required?: boolean;
}

const ReusableSelect: React.FC<ReusableSelectProps> = ({
  label,
  value,
  options,
  onChange,
  extraClass = '',
  required = false,
}) => {
  return (
    <div className="flex w-30 flex-col">
      <label className="mb-2">
        {' '}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`px-2 py-1   rounded-md ${extraClass}`}
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className={value === option.value ? extraClass : ''}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReusableSelect;
