import { Component } from 'solid-js';
import logo from '@assets/android-chrome-192x192.png';
import styles from '@components/Header.module.css';
import Typography from '@suid/material/Typography';

const Header: Component = () => {
  return (
    <header class={styles.root}>
      <img src={logo} class={styles.logo} alt="logo" />
      <Typography variant="h2" gutterBottom>
        CoinSponge.com
      </Typography>
    </header>
  );
};

export default Header;
