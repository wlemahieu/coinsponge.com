/**
 * Home page view
 */
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import useGetFirebaseUser from '@src/hooks/useGetFirebaseUser';
import useGetFirestore from '@src/hooks/useGetFirestore';
import { doc, getDoc, collection, query, where } from 'firebase/firestore';
import numeral from 'numeral';

const Home: FC = () => {
  const navigate = useNavigate();
  const user = useGetFirebaseUser();
  const db = useGetFirestore();
  const [data, setData] = useState<Record<string, string>>();
  const onClick = () => {
    console.log('onClick');
  };

  useEffect(() => {
    (async () => {
      const resp = (await getDoc(doc(db, `prices`, `latest`))) as any;
      setData(resp.data());
    })();
  }, []);

  const rows = [
    {
      name: 'Nano',
      symbol: 'XNO',
      pair: 'NANOUSD',
      icon: (
        <Box sx={{ width: '25px', height: '25px', p: 0, m: 0, textAlign: 'center', pl: 0.2 }}>
          <Box component="span" sx={{ fontWeight: 500, fontSize: '19px' }}>
            Ӿ
          </Box>
        </Box>
      ),
    },
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      pair: 'BTCUSD',
      icon: <CurrencyBitcoinIcon />,
    },
  ];

  const preparedData = rows.map((row) => {
    const item = data ? data[row.pair] : null;
    const timestamp = item ? item[0] : null;
    const rawPrice = item ? item[1] : '420.69';
    const price = numeral(rawPrice).format('$0,0.00');
    return { ...row, timestamp, price };
  });

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Cryptocurrency Prices by Market Cap
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ overflow: 'hidden' }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Coin</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {preparedData.map((row, key) => {
              return (
                <TableRow key={`key-${key}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.icon}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}&nbsp;({row.symbol})
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.price}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Button fullWidth variant="contained" color="primary" onClick={onClick} sx={{ mt: 2 }}>
        View all coins
      </Button>
    </Container>
  );
};

export default Home;
