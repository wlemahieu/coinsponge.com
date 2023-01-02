import { initializeApp } from '@firebase/app';
import { getFirestore, connectFirestoreEmulator } from '@firebase/firestore';
import { DateTime } from 'luxon';
import { ContextT } from './types';
import getCrawlerDocs, { CrawlerMetaI } from './getCoinPrices_/getCrawlerDocs';
import getCoinPrice from './getCoinPrices_/getCoinPrice';

const firebaseConfig = {
  apiKey: 'AIzaSyAzBYq8pLcIDa6DgAbnyuVg0Id1AKbae3A',
  authDomain: 'coinsponge-com.firebaseapp.com',
  projectId: 'coinsponge-com',
  storageBucket: 'coinsponge-com.appspot.com',
  messagingSenderId: '700506993969',
  appId: '1:700506993969:web:4b2ee26409040b2d66ac10',
  measurementId: 'G-C4Y69T6VD7',
};

let isEmulator = false;

const wanted = ['NANOUSD', 'BTCUSD'];
void wanted;

// grab all crawler documents to see when they were crawled last and if they are realtively caught up
const getCoinPrices = async (context: ContextT) => {
  console.log('getCoinPrices');
  void context;
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // connect to the local emulators
  if (process.env.MODE === 'development' && !isEmulator) {
    connectFirestoreEmulator(db, '127.0.0.1', 6060);
    console.log('Connected to emulator...');
    isEmulator = true;
  }

  const crawlerDocs = await getCrawlerDocs(db);
  console.log('Finding itemsNeedingCrawl...');
  const itemsNeedingCrawl = crawlerDocs
    .filter((row: CrawlerMetaI) => {
      const latestItemTime = DateTime.fromMillis(parseInt(row.lastItemTime, 10));
      return DateTime.now() > latestItemTime;
    })
    .map((row: CrawlerMetaI) => row.pair);
  console.log('itemsNeedingCrawl', itemsNeedingCrawl);
  if (itemsNeedingCrawl.length) {
    const coinPrice = await getCoinPrice(db, itemsNeedingCrawl[0]);
    console.log('coinPrice', coinPrice);
  }
  return Promise.resolve();
};

export default getCoinPrices;
