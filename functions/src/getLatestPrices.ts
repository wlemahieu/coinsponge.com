import { EventContext } from 'firebase-functions/v1';
// import { DateTime } from 'luxon';
import { initializeApp } from '@firebase/app';
import { getFirestore, connectFirestoreEmulator } from '@firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import getLatestSnapshots from './getLatestPrices_/getLatestSnapshot';

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

const foo: ItemT = [1, 1, 1, 1, 1, 1, 1, 1];
void foo;

type ContextT = EventContext<Record<string, string>>;

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

const getLatestPrices = async (context: ContextT) => {
  void context;
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
    const querySnapshots = await getLatestSnapshots(db);

    const promises = querySnapshots.map(([pair, querySnapshot]) => {
      const items: [number, number][] = [];
      querySnapshot.forEach((doc: any) => {
        const data = doc.data();
        const keys = Object.keys(data);
        const values = Object.values(data);
        const dayMS = keys[keys.length - 1] as any;
        const lastValue = values[values.length - 1] as any;
        const closePrice = lastValue[3];
        items.push([dayMS, closePrice]); // close price for now
      });
      const lastItem = items[items.length - 1];

      return async () => {
        await setDoc(
          doc(db, `prices`, `latest`),
          {
            [pair]: lastItem,
          },
          { merge: true },
        );
        await setDoc(
          doc(db, `crawler`, pair),
          {
            lastItemTime: lastItem[0],
          },
          { merge: true },
        );
      };
    });

    return Promise.all(promises);
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

export default getLatestPrices;
