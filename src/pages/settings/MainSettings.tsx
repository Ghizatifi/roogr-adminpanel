import React, { useEffect, useState } from 'react';
import { TabsPill } from '../../components/TabsPill';
import { useTranslation } from 'react-i18next';
import TermsSetting from './TermsSetting';
import ComissionSetting from './ComissionSetting';
import BanksSetting from './BanksSetting';
import SmsSetting from './SmsSetting';
import VerificationSetting from './VerificationSetting';
import BannersSetting from './BannersSetting';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { selectLanguage } from '../../store/slices/language';
import { useSelector } from 'react-redux';
import Other from './Other';

const MainSettings: React.FC = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const initialTab = sessionStorage.getItem('activeTab') || 'terms';
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const breadcrumbLinks = [
    { label: t('settings.settings'), path: '/settings' },
  ];
  useEffect(() => {
    sessionStorage.setItem('activeTab', activeTab);
  }, [activeTab]);
  const translatedTabLabel = t(`settings.${activeTab}`);

  const settingsTabs = [
    { id: 'terms', label: t('settings.terms') },
    { id: 'comission', label: t('settings.comission') },
    { id: 'banks', label: t('settings.banks') },
    { id: 'sms', label: t('settings.sms') },
    { id: 'verification', label: t('settings.verification') },
    { id: 'banners', label: t('settings.banners') },
    { id: 'other', label: t('settings.other') },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    sessionStorage.setItem('activeTab', tabId);
  };

  return (
    <>
      <Breadcrumb
        pageName={translatedTabLabel}
        breadcrumbLinks={breadcrumbLinks}
      />
      <div className="md:flex flex-col bg-secondaryBG-light dark:bg-secondaryBG-dark p-4 rounded">
        <div className={`mb-4 overflow-x-auto md:mb-4 ${language === 'ar' ? 'md:ms-4' : 'md:me-4'}`}>
          <TabsPill
            tabs={settingsTabs}
            value={activeTab}
            onChange={handleTabChange}
            glider={true}
          />
        </div>
        <div className="text-medium text-gray-500 dark:text-gray-400 dark:bg-secondaryBG-dark rounded-lg w-full flex-1">
          {activeTab === 'terms' && <TermsSetting />}
          {activeTab === 'comission' && <ComissionSetting />}
          {activeTab === 'banks' && <BanksSetting />}
          {activeTab === 'sms' && <SmsSetting />}
          {activeTab === 'verification' && <VerificationSetting />}
          {activeTab === 'banners' && <BannersSetting />}
          {activeTab === 'other' && <Other />}
        </div>
      </div>
    </>
  );
};

export default MainSettings;
