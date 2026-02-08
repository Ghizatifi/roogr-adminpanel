import { useParams } from 'react-router-dom';
import Chat from '../../components/reports/Chat';
import useDisplayUserChats from '../../hooks/chat/useDisplayUserChats';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import NotFoundSection from '../../components/Notfound/NotfoundSection';

export default function UserChats() {
  const { userId } = useParams();
  const chats = useDisplayUserChats(userId);
  const displayChats = () => {
    return chats;
  };
  const { t } = useTranslation();
  const breadcrumbLinks = [
    { label: t('Reports.label.chat'), path: `/reports/chat` },
  ];
  return (
    <>
        <Breadcrumb
          pageName={t('Reports.label.userChat')}
          breadcrumbLinks={breadcrumbLinks}
        />
      {chats.length == 0 ? (
        <NotFoundSection data={chats} />
      ) : (
          <div
            className={`bg-secondaryBG dark:bg-secondaryBG-dark  rounded-md`}
          >
            {chats.map((chat) => (
              <Chat
                chat={chat}
                key={chat.id}
                displayChats={displayChats}
                length={chats.length}
                userId={userId}
                chatId={chat.id}
              />
            ))}
          </div>
      )}
    </>
  );
}
