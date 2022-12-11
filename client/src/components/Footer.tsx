import styles from '@components/Footer.module.css';
import polygonio from '@assets/polygonio.svg';
import nano from '@assets/nano.svg';
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
      <div class={styles.brandWrapper}>
        <div class={styles.brand}>
          Protected by&nbsp;
          <A href="https://cloudflare.com/" target="_blank" rel="noreferrer">
            <img src={cloudflare} class={styles.cloudflare} />
          </A>
        </div>
        <div class={styles.brand}>
          Powered by&nbsp;
          <A href="https://polygon.io/" target="_blank" rel="noreferrer">
            <img src={polygonio} />
          </A>
        </div>
        <div class={styles.brand}>
          Building on&nbsp;
          <A href="https://nano.org/" target="_blank" rel="noreferrer">
            <img src={nano} />
          </A>
        </div>
      </div>
      <div class={styles.legal}>© 2022 Pugs, LLC. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
