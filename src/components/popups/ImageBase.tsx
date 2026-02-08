import { useState } from 'react';
import { FaAsterisk } from 'react-icons/fa';
import { PiUploadSimpleBold } from 'react-icons/pi';
interface ImageBaseProps {
  imageUrl?: string;
  setFieldValue: (field: string, value: any) => void;
  name: string;
  label: string;
}
export default function ImageBase({
  imageUrl,
  setFieldValue,
  name,
  label,
}: ImageBaseProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    imageUrl || null,
  );

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const base64String = await convertToBase64(file);
      if (base64String) {
        setFieldValue(name, base64String);
        setImagePreview(base64String);
      }
    }
  };

  return (
    <div className="mx-3 flex justify-around">
      <label
        htmlFor={name}
        className="flex mb-2 text-lg font-semibold text-gray-900 dark:text-white"
      >
        {label}

        <FaAsterisk className="text-[8px] text-[#E02828]" />
      </label>
      <div className="my-1 w-20 flex justify-center p-6 rounded-lg border border-dashed border-gray-900/25">
        <div className="text-center">
          <div className="w-26 text-sm text-gray-600">
            <label
              htmlFor={name}
              className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 
                            focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 
                            hover:text-indigo-500"
            >
              <input
                id={name}
                name={name}
                type="file"
                className="sr-only"
                onChange={(event) => handleFileChange(event, setFieldValue)}
              />
              <span>
                <PiUploadSimpleBold className="text-3xl text-center m-auto" />
              </span>
            </label>
          </div>
        </div>
      </div>
      {imagePreview && (
        <div className="m-5 text-Input-borderGreen">
          <img src={imagePreview} width={80} alt="" />
        </div>
      )}
    </div>
  );
}
