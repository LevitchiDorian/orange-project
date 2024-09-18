import React from 'react';
import styles from './AboutUs.module.css'; // Asigură-te că ai un fișier CSS corespunzător

export const AboutUs: React.FC = () => {
  return (
    <>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <path
          d="M 0,600 L 0,225 C 193.33333333333337,203.53333333333333 386.66666666666674,182.06666666666666
          554,204 C 721.3333333333333,225.93333333333334 862.6666666666665,291.26666666666665 1006,302 C
          1149.3333333333335,312.73333333333335 1294.6666666666667,268.8666666666667 1440,225 L 1440,600 L 0,600 Z"
          fill="#FFEFDD"
        />
      </svg>
      <section className={styles.aboutUs}>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>
      </section>
    </>
  );
};
