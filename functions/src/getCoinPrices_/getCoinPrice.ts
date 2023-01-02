import axios from 'axios';
import { DateTime } from 'luxon';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ItemT } from '../types';

const baseURL = 'https://www.binance.us/api/v3/klines';

const absoluteStartTime = 1568678400000; // September 17th, 2019 (start of btcusd on binance)
let endTime = absoluteStartTime;
const interval = '1m';
const limit = '1000';

const getCoinPrice = async (db: any, symbol: string) => {
  // get the last time the crawler ran for this symbol
  try {
    const resp = (await getDoc(doc(db, `crawler`, symbol))) as any;
    const meta = resp.data();
    if (meta?.lastStartTime) {
      endTime = parseInt(meta.lastStartTime) + 86400000; // add 1 day
    }
  } catch (e) {
    console.log(e);
  }

  // create the crawl url
  const url = `${baseURL}?symbol=${symbol}&interval=${interval}&endTime=${endTime}&limit=${limit}`;
  console.log(url);

  // retrieve data
  try {
    const results = await axios.get(url);
    const data = results?.data as Array<ItemT>;

    // 1000 1-minute items
    if (data?.length) {
      const promises = data.map((row: ItemT) => {
        const [startTimestamp, openPrice, highPrice, lowPrice, closePrice, btcVolume, busdVolume] = row;
        const st = DateTime.fromMillis(startTimestamp);
        const startOfDay = st.startOf('day').toMillis();
        const { year } = st;
        const field = startTimestamp / 1000;
        const docName = startOfDay / 1000;
        const collectionName = `${symbol}-${year}`;
        return setDoc(
          doc(db, collectionName, `${docName}`),
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

  // update lastStartTime for symbol
  try {
    await setDoc(
      doc(db, `crawler`, symbol),
      {
        lastStartTime: `${endTime}`,
      },
      { merge: true },
    );
  } catch (e) {
    console.log(e);
  }
  return Promise.resolve();
};

export default getCoinPrice;
