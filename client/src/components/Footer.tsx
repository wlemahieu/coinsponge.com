import styles from '@components/Footer.module.css';
import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import cloudflare from '@assets/cloudflare.svg';
import polygonio from '@assets/polygonio.svg';

const Footer: Component = () => {
  return (
    <footer class={styles.root}>
      <ul class={styles.list}>
        <li>
          <A href="/about">About</A>
        </li>
        <li>
          <A href="/privacy-policy">Privacy policy</A>
        </li>
        <li>
          <A href="/contact">Contact us</A>
        </li>
      </ul>
      <div>
        Protected by:
        <img src={cloudflare} class={styles.cloudflare} />
      </div>
      <div>
        Powered By:
        <img src={polygonio} class={styles.polygonio} />
      </div>
      <div>© 2022 Pugs, LLC. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
