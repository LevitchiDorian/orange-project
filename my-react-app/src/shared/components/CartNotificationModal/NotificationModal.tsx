import React from 'react';
import styles from './NotificationModal.module.css';

interface NotificationModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ show, onClose, message }) => {
  if (!show) return null;

  return (
    <div className={styles.notification}>
      <p>{message}</p>
      <button onClick={onClose} className={styles.closeButton}>
        &times;
      </button>
    </div>
  );
};

export default NotificationModal;
