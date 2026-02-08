import React, { useEffect, useState } from 'react';
import TabButton from '../../components/setting/TabButton';
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

  return (
    <>
      <Breadcrumb
        pageName={translatedTabLabel}
        breadcrumbLinks={breadcrumbLinks}
      />
      <div className="md:flex bg-secondaryBG-light dark:bg-secondaryBG-dark p-4 rounded">
        <ul
          className={`flex-column space-y space-y-2 ${
            language === 'ar' ? 'w-52' : 'w-64'
          } text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0`}
        >
          <TabButton
            btnTab="terms"
            label={t('settings.terms')}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            btnTab="comission"
            label={t('settings.comission')}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            btnTab="banks"
            label={t('settings.banks')}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            btnTab="sms"
            label={t('settings.sms')}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            btnTab="verification"
            label={t('settings.verification')}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            btnTab="banners"
            label={t('settings.banners')}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            btnTab="other"
            label={t('settings.other')}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </ul>
        <div className="text-medium text-gray-500 dark:text-gray-400 dark:bg-secondaryBG-dark rounded-lg w-full">
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
