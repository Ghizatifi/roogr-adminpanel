import React, { useState } from 'react';
import UserForm from './UserFormDetials';
import UserProducts from './products/UserProducts';
import UserInfo from './Info/UserInfo';
import { useTranslation } from 'react-i18next';
import { TabsPill } from '../TabsPill';
import CategorySubscriptionUserid from './Category-subscription/UserCategorySubscription';
import VerifactionRequestByUserid from './verifaction_requests/Userverifaction_requests';
import { useParams } from 'react-router-dom';
import AccordionContacUs from './contactUs/AccordionContacUs';
import Chat from '../reports/Chat';
import useDisplayUserChats from '../../hooks/chat/useDisplayUserChats';
import NotFoundSection from '../Notfound/NotfoundSection';
import UserChatBanList from './BanList/ChatBanList';
import BanProfileList from './BanList/HistoryBanList';
import UserBanProdList from './BanList/prodBanList';
import { User } from '../../types/user';
import UserProductReport from '../reports/UserProductReport';
import UserChatReport from '../reports/UserChatReport';

type ProfileTabId =
  | 'details'
  | 'info'
  | 'products'
  | 'ticket'
  | 'chats'
  | 'contact'
  | 'reports'
  | 'banlist';

interface ProfileAccordionProps {
  user: User;
  loading: boolean;
  error: string | null;
}

const ProfileAccordion: React.FC<ProfileAccordionProps> = ({
  user,
  loading,
  error,
}) => {
  const { id } = useParams();
  const chats = useDisplayUserChats(id);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ProfileTabId>('details');

  const displayChats = () => chats;

  const tabs: { id: ProfileTabId; label: string }[] = [
    { id: 'details', label: t('profile.detials') },
    { id: 'info', label: t('profile.info') },
    { id: 'products', label: t('profile.products') },
    { id: 'ticket', label: t('profile.ticket') },
    { id: 'chats', label: t('profile.chats') },
    { id: 'contact', label: t('profile.contactUs') },
    { id: 'reports', label: t('profile.reprts') },
    { id: 'banlist', label: t('profile.banList') },
  ];

  return (
    <div className="rounded-xl border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
      {/* Tabs */}
      <div className="border-b border-stroke px-2 py-3 dark:border-strokedark sm:px-4">
        <nav className="overflow-x-auto" aria-label="Profile sections">
          <TabsPill
            tabs={tabs}
            value={activeTab}
            onChange={(id) => setActiveTab(id as ProfileTabId)}
            glider={true}
            className="w-full min-w-0 sm:w-auto"
          />
        </nav>
      </div>

      {/* Panel */}
      <div className="min-h-[200px] p-4 sm:p-5">
        {activeTab === 'details' && (
          user && <UserForm user={user} loading={loading} error={error} />
        )}

        {activeTab === 'info' && <UserInfo user={user} />}

        {activeTab === 'products' && <UserProducts user={user} />}

        {activeTab === 'ticket' && (
          <>
            <CategorySubscriptionUserid />
            <VerifactionRequestByUserid />
          </>
        )}

        {activeTab === 'chats' && (
          chats.length === 0 ? (
            <NotFoundSection data={chats} />
          ) : (
            <div className="mt-2 rounded-lg bg-secondaryBG dark:bg-secondaryBG-dark">
              {chats.map((chat) => (
                <Chat
                  key={chat.id}
                  chat={chat}
                  displayChats={displayChats}
                  length={chats.length}
                  userId={id}
                  chatId={chat.id}
                />
              ))}
            </div>
          )
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <AccordionContacUs
              idPre="RQ1-"
              id={id}
              pageName="contact-us.inquiries"
              type="inquiry"
            />
            <AccordionContacUs
              idPre="RQ2-"
              id={id}
              pageName="contact-us.issues"
              type="issue"
            />
            <AccordionContacUs
              idPre="RFP-"
              id={id}
              pageName="contact-us.suggestions"
              type="suggestion"
            />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-4">
            <UserProductReport user={user} />
            <UserChatReport user={user} />
          </div>
        )}

        {activeTab === 'banlist' && (
          <div className="space-y-4">
            <BanProfileList user={user} />
            <UserBanProdList />
            <UserChatBanList user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAccordion;
