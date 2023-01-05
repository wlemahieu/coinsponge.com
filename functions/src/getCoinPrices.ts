import { initializeApp } from '@firebase/app';
import { getFirestore, connectFirestoreEmulator } from '@firebase/firestore';
// import { DateTime } from 'luxon';
import { ContextT } from './types';
// import getCrawlerDocs, { CrawlerMetaI } from './getCoinPrices_/getCrawlerDocs';
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

// grab all crawler documents to see when they were crawled last and if they are realtively caught up
const getCoinPrices = async (context: ContextT, symbol: string) => {
  void context;
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // connect to the local emulators
  if (process.env.MODE === 'development' && !isEmulator) {
    connectFirestoreEmulator(db, '127.0.0.1', 6060);
    console.log('Connected to emulator...');
    isEmulator = true;
  }

  /*
  if (symbol === 'ETHUSD') {
    await new Promise((r) => setTimeout(r, 20000));
  } else if (symbol === 'NANOUSD') {
    await new Promise((r) => setTimeout(r, 40000));
  }
  */

  /*
  const crawlerDocs = await getCrawlerDocs(db);

  // look at existing items that need more crawling
  const itemsNeedingCrawl = crawlerDocs
    .filter((row: CrawlerMetaI) => {
      const latestItemTime = DateTime.fromMillis(parseInt(row.lastItemTime, 10));
      return (!row?.lastItemTime || DateTime.now() > latestItemTime) && !row.isRunning;
    })
    .map((row: CrawlerMetaI) => row.pair);

  if (itemsNeedingCrawl.length) {
    const symbol = itemsNeedingCrawl[0];
    console.log('symbol', symbol);
    if (crawler === 1) {
      await new Promise((r) => setTimeout(r, 20000));
    } else if (crawler === 2) {
      await new Promise((r) => setTimeout(r, 40000));
    }
    await getCoinPrice(db, symbol);
  }
  */

  await getCoinPrice(db, symbol);

  return Promise.resolve();
};

export default getCoinPrices;
