/**
 * Global site menu navigation
 */
import styles from '@components/Navigation.module.css';
import { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Link from '@suid/material/Link';

const Navigation: Component = () => {
  const navigate = useNavigate();

  const goToCoins = () => navigate('/');

  return (
    <nav class={styles.root}>
      <ul class={styles.list}>
        <li>
          <Link onClick={goToCoins}>Coins</Link>
        </li>
        <li>
          <Link href="https://trello.com/b/mwGqpn5b/coinspongecom" target="_blank" rel="noreferrer">
            Roadmap
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
