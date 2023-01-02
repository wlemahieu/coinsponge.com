import { getDocs, collection } from 'firebase/firestore';

export interface CrawlerMetaI {
  pair: string;
  lastStartTime: string;
  lastItemTime: string;
  isRunning: boolean;
}

export const wanted = ['NANOUSD', 'BTCUSD', 'ETHUSD'];

export type ReturnT = Array<CrawlerMetaI>;

// grab all crawler documents to see when they were crawled last and if they are realtively caught up
const getCrawlerDocs = async (db: any): Promise<ReturnT> => {
  const map: ReturnT = [];
  try {
    const querySnapshot = (await getDocs(collection(db, 'crawler'))) as any;
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      const { lastStartTime, lastItemTime, isRunning } = data;
      map.push({
        pair: doc.id,
        lastStartTime,
        lastItemTime,
        isRunning,
      });
    });
  } catch (e) {
    console.log(e);
  }

  const fixedMap = wanted.map((pair: string) => {
    const found = map.find((row: CrawlerMetaI) => row.pair === pair);
    if (found) {
      return found;
    }
    return { pair, lastStartTime: '0', lastItemTime: '0', isRunning: false };
  });

  return fixedMap;
};

export default getCrawlerDocs;
