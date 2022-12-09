/**
 * Global site menu navigation
 */
import { Component } from 'solid-js';
import { useLocation } from '@solidjs/router';
import styles from '@components/Navigation.module.css';

const Navigation: Component = () => {
  const location = useLocation();
  console.log({ location });

  return <div class={styles.root}>Nav</div>;
};

export default Navigation;
