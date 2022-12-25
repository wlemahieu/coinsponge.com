/**
 * About page view
 */
import { FC } from 'react';
import styles from '@views/About.module.css';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import wes from '@assets/wes.jpg';

const About: FC = () => {
  return (
    <Container maxWidth="xs" className={styles.root}>
      <Typography variant="h4" gutterBottom>
        About
      </Typography>
      <div className={styles.memberBlock}>
        <Typography variant="body1" className={styles.description}>
          Welcome to coinsponge.com - a new free service which aggregates cryptocurrency metrics and allows for custom
          email or phone notifications
        </Typography>
        <Typography variant="h6" gutterBottom>
          Managing Member:
        </Typography>
        <div>
          <Avatar src={wes} variant="circular" className={styles.member} alt="A white guy in Thailand." />
          <span>Wesley LeMahieu</span>
        </div>
      </div>
    </Container>
  );
};

export default About;
