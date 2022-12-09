/**
 * Global site menu navigation
 */
import styles from '@components/Navigation.module.css';
import { Component } from 'solid-js';
import { useLocation } from '@solidjs/router';
import { A } from '@solidjs/router';

const Navigation: Component = () => {
  const location = useLocation();
  console.log({ location });

  return (
    <nav class={styles.root}>
      <ul class={styles.list}>
        <li>
          <A href="/">Coins</A>
        </li>
        <li>
          <A href="/spore">Spore</A>
        </li>
        <li>
          <A href="https://trello.com/b/mwGqpn5b/coinspongecom" target="_blank">
            Roadmap
          </A>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
