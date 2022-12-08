import { Component } from 'solid-js';
import logo from '@assets/android-chrome-192x192.png';
import styles from '@components/Header.module.css';

const Header: Component = () => {
  return (
    <header class={styles.root}>
      <img src={logo} class={styles.logo} alt="logo" />
    </header>
  );
};

export default Header;
