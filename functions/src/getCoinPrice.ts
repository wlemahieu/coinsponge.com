import axios from 'axios';
import { EventContext } from 'firebase-functions/v1';

type ContextT = EventContext<Record<string, string>>;

const getCoinPrice = async (context: ContextT) => {
  console.log('getCoinPrice', context);
  try {
    const results = await axios.get(
      'https://www.binance.us/api/v3/klines?symbol=BTCUSD&interval=1m&startTime=1671933771000&endTime=1672020171000&limit=1000',
    );
    console.log('results', results);
  } catch (e) {
    console.log('e', e);
  }
};

export default getCoinPrice;
