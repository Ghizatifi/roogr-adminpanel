import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/instanc';
import { BiUpload } from 'react-icons/bi';

interface ImageSetting {
  [key: string]: string; // Map `key` to `value`
}

export default function Other() {
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState(true);
  const [settingImgs, setSettingImgs] = useState<ImageSetting>({});

  const displayAppStatus = async () => {
    try {
      const res = await axiosInstance.get(`/maintenance`);
      setIsChecked(res.data.data[0]?.maintenance === 0);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || 'Error fetching app status',
      );
    }
  };

  const handleAppSubmit = async () => {
    try {
      await axiosInstance.put(`/maintenance/1`, {
        maintenance: isChecked ? 1 : 0,
      });
      await displayAppStatus();
      toast.success(`${t('popup.add_toast')}`);
    } catch (error: any) {
      console.error(error);
      await displayAppStatus();
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
  };

  const handleToggle = async () => {
    setIsChecked((prev) => !prev);
    await handleAppSubmit();
  };

  const displaySettingImgs = async () => {
    try {
      const res = await axiosInstance.get('/settings/images');

      // Transform array into object { key: value }
      const imagesObj: ImageSetting = res.data.data.reduce(
        (acc: ImageSetting, item: { key: string; value: string }) => {
          acc[item.key] = item.value;
          return acc;
        },
        {},
      );

      setSettingImgs(imagesObj);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to load images');
    }
  };

  const handleImageUpload = async (key: string, value: string) => {
    try {
      await axiosInstance.post('/settings/images', { key, value });
      toast.success('Image updated successfully');
      await displaySettingImgs();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to update image');
    }
  };

  useEffect(() => {
    displayAppStatus();
    displaySettingImgs();
  }, []);
  const imageLabels: { [key: string]: string } = {
    config_admin_image: 'التنبيهات',
    config_inquiry_image: 'الاستفسارات',
    config_communication_image: 'الشكاوي',
    config_suggestion_image: 'الاقتراحات',
  };

  return (
    <div>
      {/* App Status Toggle */}
      <div className="w-40 flex justify-between">
        <div>{t('settings.appStatus')}</div>
        <div>
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isChecked}
              onChange={handleToggle}
            />

            <div
              className={`relative w-11 h-6 rounded-full peer ${
                isChecked ? 'bg-TextGreen' : 'bg-gray-200'
              } peer-checked:bg-blue-600`}
            >
              <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Images Upload Section */}

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(imageLabels).map(([key, label]) => (
          <div key={key} className="flex flex-col items-center space-y-5">
            <label className="text-lg font-bold">{label}</label>

            <img
              src={settingImgs[key] || './../../../public/Defualt.png'}
              alt={key}
              className="w-24 h-24 rounded-full border"
            />

            <label className="cursor-pointer flex items-center text-TextGreen space-x-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
              <BiUpload className="w-5 h-5" />
              <span className="text-sm px-2">Upload</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result === 'string') {
                        handleImageUpload(key, reader.result);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
