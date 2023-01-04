import axios from 'axios';
import { DateTime } from 'luxon';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ItemT } from '../types';

const baseURL = 'https://www.binance.us/api/v3/klines';
const interval = '1m';
const limit = '750';
// 1440 1min points per day. capture all with 2 crawls per day per symbol

const getCoinPrice = async (db: any, symbol: string) => {
  let crawlSymbol = symbol;
  let isRunning = false;
  let startTime;

  // get the last time the crawler ran for this symbol
  try {
    const resp = (await getDoc(doc(db, `crawler`, symbol))) as any;
    const meta = resp.data();
    isRunning = Boolean(meta?.isRunning);
    if (meta?.lastStartTime) {
      startTime = parseInt(meta.lastStartTime, 10) + 86400000 / 2; // add 1/2 day
    } else {
      startTime = parseInt(meta.absoluteStartTime, 10);
    }
    // check for ticker changes (rare, but XNO had one)
    if (meta?.tickerChange) {
      const newStartTime = parseInt(meta.tickerChange.startTime, 10);
      if (startTime >= newStartTime) {
        crawlSymbol = meta.tickerChange.ticker;
      }
    }
  } catch (e) {
    console.log(e);
  }

  if (isRunning) {
    return Promise.reject('Instance already running!');
  }

  // set crawler to running state
  try {
    await setDoc(
      doc(db, `crawler`, symbol),
      {
        isRunning: true,
      },
      { merge: true },
    );
  } catch (e) {
    console.log(e);
  }

  if (!startTime) {
    return Promise.reject(`No startTime defined for ${symbol}!`);
  }

  // create the crawl url
  const url = `${baseURL}?symbol=${crawlSymbol}&interval=${interval}&startTime=${startTime}&limit=${limit}`;
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

  // update lastStartTime for symbol and set not running
  try {
    await setDoc(
      doc(db, `crawler`, symbol),
      {
        lastStartTime: `${startTime}`,
        isRunning: false,
      },
      { merge: true },
    );
  } catch (e) {
    console.log(e);
  }

  return Promise.resolve();
};

export default getCoinPrice;
