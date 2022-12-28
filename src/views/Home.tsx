/**
 * Home page view
 */
import { FC } from 'react';
import styles from '@views/Home.module.css';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import useGetFirebaseUser from '@src/hooks/useGetFirebaseUser';

const Home: FC = () => {
  const navigate = useNavigate();
  const user = useGetFirebaseUser();

  const onClick = () => {
    console.log('onClick');
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <Button variant="contained" color="primary" onClick={onClick}>
        View all coins
      </Button>
    </Container>
  );
};

export default Home;
