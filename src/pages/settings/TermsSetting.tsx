import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';

const TermsSetting: React.FC = () => {
  const { t } = useTranslation();
  const [description, setDescription] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const displayTearms = async () => {
    try {
      const res = await axiosInstance.get(`/information/5`);
      setDescription(res.data.data.description);
      setMetaDescription(res.data.data.meta_description);
    } catch (error: any) {
      console.error(error);
    }
  };
  const body = {
    information_id: 5,
    language_id: 2,
    description: description,
    meta_title: 'terms',
    meta_description: metaDescription,
    meta_keyword: 'ffprivacy',
    status: 0,
    sort_order: 5,
  };

  const updateTerms = async () => {
    try {
      await axiosInstance.put(`/information/5`, body, {
        method: 'PUT',
        headers: {
          'content-type': 'Application/json',
        },
      });
      displayTearms();
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    displayTearms();
  }, []);

  const handleChange = (content: string) => {
    setDescription(content);
  };

  return (
    <>
      <div>
        <ReactQuill
          value={description}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ font: [] }, { size: [] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }, { background: [] }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ direction: 'rtl' }],
              ['link', 'image', 'video'],
              ['clean'],
            ],
          }}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={updateTerms}
          className="mt-5 cursor-pointer rounded-lg bg-Input-TextGreen dark:bg-login-dark px-4 py-1 text-white
                            dark:text-black text-2xl transition hover:bg-opacity-90"
        >
          {' '}
          {t('popup.save')}
        </button>
      </div>
    </>
  );
};

export default TermsSetting;
