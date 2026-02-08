import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import NotificationItem from './NotificationItem';
import AddNotification from './popupNotification';
import { useTranslation } from 'react-i18next';
import useNotifications from '../../hooks/Notification/my-notifications';

const DropdownNotification = () => {
  const { t } = useTranslation();
  const { notifications, loading, error, refreshNotifications } =
    useNotifications();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const permissions: any = localStorage.getItem('permissions');

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          to="#"
          className="relative flex items-center justify-center dark:text-header-dark text-header-light"
        >
          <span
            className={`absolute top-3 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? 'hidden' : 'inline'
            }`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>
          <MdOutlineNotificationsActive className="text-2xl" />
        </Link>

        {dropdownOpen && (
          <div className=" rounded-lg absolute -right-27 mt-2.5 flex h-90 w-75 flex-col  border border-header-inputBorder bg-white shadow-default dark:border-header-inputBorderdark dark:bg-boxdark sm:right-0 sm:w-80">
            <div className="px-4.5 py-3">
              {permissions[1] == 1 && (
                <h5 className="text-lg flex justify-between font-medium dark:text-header-dark text-header-light">
                  {t('notifications.popup.add')}

                  <button onClick={() => setIsModalOpen(true)}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433284 8.00042 -0.1937 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9967 7.34885 18.9421 4.80723 17.0674 2.93259C15.1928 1.05794 12.6512 0.00330774 10 0ZM13.8462 10.7692H10.7692V13.8462C10.7692 14.0502 10.6882 14.2458 10.5439 14.3901C10.3997 14.5343 10.204 14.6154 10 14.6154C9.79599 14.6154 9.60033 14.5343 9.45607 14.3901C9.31182 14.2458 9.23077 14.0502 9.23077 13.8462V10.7692H6.15385C5.94984 10.7692 5.75418 10.6882 5.60992 10.5439C5.46566 10.3997 5.38462 10.204 5.38462 10C5.38462 9.79599 5.46566 9.60033 5.60992 9.45607C5.75418 9.31181 5.94984 9.23077 6.15385 9.23077H9.23077V6.15384C9.23077 5.94983 9.31182 5.75418 9.45607 5.60992C9.60033 5.46566 9.79599 5.38461 10 5.38461C10.204 5.38461 10.3997 5.46566 10.5439 5.60992C10.6882 5.75418 10.7692 5.94983 10.7692 6.15384V9.23077H13.8462C14.0502 9.23077 14.2458 9.31181 14.3901 9.45607C14.5343 9.60033 14.6154 9.79599 14.6154 10C14.6154 10.204 14.5343 10.3997 14.3901 10.5439C14.2458 10.6882 14.0502 10.7692 13.8462 10.7692Z"
                        fill="#40C734"
                      />
                    </svg>
                  </button>
                </h5>
              )}
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <ul className="flex h-auto flex-col overflow-y-auto">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.system_notification_id}
                    notification={notification}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </li>
      {permissions[1] == 1 && (
        <AddNotification
          name="Category Name"
          id={1}
          url="categories"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          refreshNotifications={refreshNotifications}
        />
      )}
    </ClickOutside>
  );
};

export default DropdownNotification;
