import styles from '@components/Footer.module.css';
import polygonio from '@assets/polygonio.svg';
import cloudflare from '@assets/cloudflare.svg';
import { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { A } from '@solidjs/router';
import Link from '@suid/material/Link';

const Footer: Component = () => {
  const navigate = useNavigate();

  const goToAbout = () => navigate('/about');
  const goToPrivacyPolicy = () => navigate('/privacy-policy');
  const goToContactUs = () => navigate('/contact');

  return (
    <footer class={styles.root}>
      <ul class={styles.list}>
        <li>
          <Link onClick={goToAbout}>About</Link>
        </li>
        <li>
          <Link onClick={goToPrivacyPolicy}>Privacy policy</Link>
        </li>
        <li>
          <Link onClick={goToContactUs}>Contact us</Link>
        </li>
      </ul>
      <div>
        Protected by:
        <A href="https://www.cloudflare.com/" target="_blank" rel="noreferrer">
          <img src={cloudflare} class={styles.cloudflare} />
        </A>
      </div>
      <div>
        Powered By:
        <A href="https://polygon.io/" target="_blank" rel="noreferrer">
          <img src={polygonio} class={styles.polygonio} />
        </A>
      </div>
      <div>© 2022 Pugs, LLC. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
