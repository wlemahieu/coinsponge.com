import { getDocs, collection } from 'firebase/firestore';

export interface CrawlerMetaI {
  pair: string;
  lastStartTime: string;
  lastItemTime: string;
}

export type ReturnT = Array<CrawlerMetaI>;

// grab all crawler documents to see when they were crawled last and if they are realtively caught up
const getCrawlerDocs = async (db: any): Promise<ReturnT> => {
  const map: ReturnT = [];
  try {
    const querySnapshot = (await getDocs(collection(db, 'crawler'))) as any;
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      const { lastStartTime, lastItemTime } = data;
      map.push({
        pair: doc.id,
        lastStartTime,
        lastItemTime,
      });
    });
  } catch (e) {
    console.log(e);
  }
  return [{ pair: 'BTCUSD', lastStartTime: '0', lastItemTime: '0' }];
  //return map;
};

export default getCrawlerDocs;
