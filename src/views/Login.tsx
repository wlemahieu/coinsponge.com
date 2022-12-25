/**
 * Login page view
 */
import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useGetFirebaseUser from '@src/hooks/useGetFirebaseUser';
import LoggedOut from '@src/views/Start_/LoggedOut';
import styles from '@views/Login.module.css';

const Login: FC = () => {
  const user = useGetFirebaseUser();
  return (
    <Container maxWidth="xs" className={styles.root}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {!user ? <LoggedOut /> : null}
    </Container>
  );
};

export default Login;
