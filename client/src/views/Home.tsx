/**
 * Default home page view
 */
import { Component } from 'solid-js';
import styles from '@views/Home.module.css';
import Typography from '@suid/material/Typography';

const Home: Component = () => {
  return (
    <div class={styles.root}>
      <Typography variant="h2" gutterBottom>
        CoinSponge.com
      </Typography>
    </div>
  );
};

export default Home;
