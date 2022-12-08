/**
 * Default home page view
 */
import { Component } from 'solid-js';
import styles from '@views/Home.module.css';

const Home: Component = () => {
  return <div class={styles.root}>Welcome to CoinSponge.com</div>;
};

export default Home;
