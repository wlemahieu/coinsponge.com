import { FC } from 'react';
import styles from '@components/Footer.module.css';
import cloudflare from '@assets/cloudflare.svg';
import firebase from '@assets/firebase.svg';
import nano from '@assets/nano.svg';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

const Footer: FC = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.root}>
      <ul className={styles.list}>
        <li>
          <Link onClick={() => navigate('/terms')}>Terms of Use</Link>
        </li>
        <li>
          <Link onClick={() => navigate('/privacy')}>Privacy Policy</Link>
        </li>
        <li>
          <Link onClick={() => navigate('/cookies')}>Cookies Policy</Link>
        </li>
        <li>
          <Link onClick={() => navigate('/contact')}>Contact</Link>
        </li>
      </ul>
      <div className={styles.brandWrapper}>
        <div className={styles.brand}>
          Protected by&nbsp;
          <a href="https://cloudflare.com/" target="_blank" rel="external nofollow noopener">
            <img src={cloudflare} className={styles.cloudflare} />
          </a>
        </div>
        <div className={styles.brand}>
          Powered by&nbsp;
          <a href="https://firebase.google.com/" target="_blank" rel="external nofollow noopener">
            <img src={firebase} className={styles.firebase} />
          </a>
        </div>
        <div className={styles.brand}>
          Integrating&nbsp;
          <a href="https://nano.org" target="_blank" rel="external nofollow noopener">
            <img src={nano} className={styles.firebase} />
          </a>
        </div>
      </div>
      <div className={styles.legal}>© 2022 Pugs, LLC. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
