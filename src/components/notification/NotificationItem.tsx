import React from 'react';
import { Link } from 'react-router-dom';
import { Notification } from '../../types/notification';

interface NotificationItemProps {
  notification: Notification;
}
const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const formattedDate = new Date(notification.date_add).toLocaleDateString();
  return (
    <li>
      <Link
        className="flex flex-col gap-2.5 border-t border-header-inputBorder px-4.5 py-3 hover:bg-secondaryBG-light dark:border-header-inputBorderdark dark:hover:bg-meta-4"
        to="#"
      >
        <p className="text-sm">{notification.message}</p>
        <p className="text-xs flex justify-between text-TextBlue dark:text-TextGreen">
          {formattedDate}
          <span className="text-xs"> </span>
        </p>
      </Link>
    </li>
  );
};

export default NotificationItem;
