import axios from 'axios';
import { EventContext } from 'firebase-functions/v1';
import { DateTime } from 'luxon';
// import { doc, setDoc } from 'firebase/firestore';
import { initializeApp } from '@firebase/app';
import { getFirestore, connectFirestoreEmulator } from '@firebase/firestore';
import { setDoc, getDoc, doc } from 'firebase/firestore';

type StartTimestamp = number;
type OpenPrice = number;
type HighPrice = number;
type LowPrice = number;
type ClosePrice = number;
type BtcVolume = number;
type EndTimestamp = number;
type BusdVolume = number;

/**
 * Known items from the desctructured array of datapoints
 */
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

const absoluteStartTime = 1568678400000; // September 17th, 2019 (start of btcusd on binance)
let endTime = absoluteStartTime;
const interval = '1m';
const limit = '1000';
let symbol = 'BTCUSD';
let isEmulator = false;

const getCoinPrice = async (context: ContextT) => {
  void context;
  const now = DateTime.now();
  console.log(`getCoinPrices() ${now}`);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // connect to the local emulators
  if (process.env.MODE === 'development' && !isEmulator) {
    connectFirestoreEmulator(db, '127.0.0.1', 6060);
    isEmulator = true;
  }

  /**
   * Update crawler meta with last crawled time.
   */
  try {
    const resp = (await getDoc(doc(db, `crawler`, `meta`))) as any;
    const meta = resp.data();
    if (meta?.lastStartTime) {
      endTime = parseInt(meta.lastStartTime) + 86400000; // add 1 day
    }
  } catch (e) {
    console.log(e);
  }

  const url = `${baseURL}?symbol=${symbol}&interval=${interval}&endTime=${endTime}&limit=${limit}`;
  console.log(url);

  if (endTime >= now.toUTC().toMillis() + 86400000) {
    console.log('--- Crawl all caught up! ---');
    return Promise.resolve();
  }

  /**
   * After determining where the crawler left-off,
   * start retrieving data.
   */
  try {
    const results = await axios.get(url);
    const data = results?.data as Array<ItemT>;
    // 1000 1-minute items
    if (data?.length) {
      const promises = data.map((row: ItemT) => {
        const [startTimestamp, openPrice, highPrice, lowPrice, closePrice, btcVolume, busdVolume] = row;
        const startOfDay = DateTime.fromMillis(startTimestamp).startOf('day').toMillis();
        const field = startTimestamp / 1000;
        const docName = startOfDay / 1000;
        return setDoc(
          doc(db, symbol, `${docName}`),
          {
            [`${field}`]: [openPrice, highPrice, lowPrice, closePrice, btcVolume, busdVolume],
          },
          { merge: true },
        );
      });
      await Promise.all(promises);
    }
  } catch (e) {
    console.log(e);
  }

  try {
    await setDoc(
      doc(db, `crawler`, `meta`),
      {
        lastStartTime: `${endTime}`,
      },
      { merge: true },
    );
  } catch (e) {
    console.log(e);
  }
};

export default getCoinPrice;
