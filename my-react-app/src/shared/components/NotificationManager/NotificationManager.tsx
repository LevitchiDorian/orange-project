import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { removeNotification } from '../../../features/notification/notificationSlice';

const NotificationManager: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notification.notifications);

  useEffect(() => {
    notifications.forEach((noti) => {
      const key = noti.id;
      notification[noti.type]({
        message: noti.message,
        description: noti.description,
        key,

        onClose: () => dispatch(removeNotification(noti.id)),
      });
    });
  }, [notifications, dispatch]);

  return null;
};

export default NotificationManager;
