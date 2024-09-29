import React, { useEffect, useRef, useState } from 'react';
import styles from './AboutUs.module.css';

export const AboutUs: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const aboutUsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (aboutUsRef.current) {
        const rect = aboutUsRef.current.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const aboutText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <>
      <svg
        width="100%"
        height="0%"
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
      <section className={styles.aboutUs} ref={aboutUsRef}>
        <h2>Despre Noi</h2>
        <p>
          {aboutText.split(' ').map((word, index) => (
            <span
              key={index}
              className={`${styles.textLine} ${isInView ? styles.complexFadeIn : styles.complexFadeOut}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {word}{' '}
            </span>
          ))}
        </p>
      </section>
    </>
  );
};
