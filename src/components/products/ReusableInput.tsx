import React from 'react';

interface InputProps {
  label: string;
  type: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void; // Add optional onClick prop
  extraClass?: string; // Optional prop for additional classes
  required?: boolean;
  widthClass?: string; // Optional prop for width class with default value
  border?: string; // Optional prop for border class with default value
}

const ReusableInput: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  onClick, // Destructure onClick
  extraClass = 'bg-white', // Default background color is white
  required = false,
  widthClass = 'w-30', // Default width class is w-30
  border = 'border border-Input-border text-black',
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
        required={required}
        className={`${extraClass}  ${widthClass} px-2 ${border} rounded-md`}
        readOnly={!onChange}
      />
    </div>
  );
};

export default ReusableInput;
