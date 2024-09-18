import { ReactNode } from 'react';
import styles from './Container.module.css';

export const Container = ({ children }: { children: ReactNode }) => (
  <div className={styles.container}>
    <div className={styles.box}>
      {children}
    </div>
  </div>
);