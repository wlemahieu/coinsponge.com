import styles from '@components/Footer.module.css';
import { Component } from 'solid-js';
import { A } from '@solidjs/router';

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
      <span>© 2022 Pugs, LLC. All Rights Reserved.</span>
    </footer>
  );
};

export default Footer;
