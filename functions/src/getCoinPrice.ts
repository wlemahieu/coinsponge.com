import axios from 'axios';
import { EventContext } from 'firebase-functions/v1';
import { DateTime } from 'luxon';
// import { doc, setDoc } from 'firebase/firestore';
import { initializeApp } from '@firebase/app';
import { getFirestore, connectFirestoreEmulator } from '@firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';

type ContextT = EventContext<Record<string, string>>;

const baseURL = 'https://www.binance.us/api/v3/klines';

const firebaseConfig = {
  apiKey: 'AIzaSyAzBYq8pLcIDa6DgAbnyuVg0Id1AKbae3A',
  authDomain: 'coinsponge-com.firebaseapp.com',
  projectId: 'coinsponge-com',
  storageBucket: 'coinsponge-com.appspot.com',
  messagingSenderId: '700506993969',
  appId: '1:700506993969:web:4b2ee26409040b2d66ac10',
  measurementId: 'G-C4Y69T6VD7',
};

let absoluteEndTime = '1569853320000'; //October 1st, 2019 (start of btcusd on binance)
let symbol = 'BTCUSD';
let interval = '1m';
// let startTime = '1671933771000'; // Saturday, December 24, 2022 6:02:51 PM
// let endTime = '1672020171000'; // Sunday, December 25, 2022 6:02:51 PM
let limit = '1000';

let url = `${baseURL}?symbol=${symbol}&interval=${interval}&endTime=${absoluteEndTime}&limit=${limit}`;

type StartTimestamp = number;
type OpenPrice = number;
type HighPrice = number;
type LowPrice = number;
type ClosePrice = number;
type BtcVolume = number;
type EndTimestamp = number;
type BusdVolume = number;

type ItemT = [
  StartTimestamp,
  OpenPrice,
  HighPrice,
  LowPrice,
  ClosePrice,
  BtcVolume,
  EndTimestamp,
  BusdVolume,
  //?,
  //?,
  //?,
  //?,
];

const getCoinPrice = async (context: ContextT) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // connect to the local emulators
  if (process.env.MODE === 'development') {
    console.log('----- DEVELOPMENT MODE -----');
    connectFirestoreEmulator(db, '127.0.0.1', 6060);
  }

  const now = DateTime.now();
  console.log(`getCoinPrice --- ${now} --- ${url}`);
  try {
    const results = await axios.get(url);
    const data = results?.data as Array<ItemT>;
    if (data?.length) {
      data.map((row: ItemT) => {
        void row;
        /*
        const [startTimestamp, openPrice, highPrice, lowPrice, closePrice,  btcVolume, endTimestamp, busdVolume] = row;
        const st = DateTime.fromMillis(startTimestamp);
        const stf = st.toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        const et = DateTime.fromMillis(endTimestamp);
        const etf = et.toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        console.log({startTimestamp: stf, openPrice, highPrice, lowPrice, closePrice,  btcVolume, endTimestamp: etf, busdVolume});
      */
      });
    }
  } catch (e) {
    console.log('e', e);
  }

  try {
    const docRef = await addDoc(collection(db, 'users'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export default getCoinPrice;
