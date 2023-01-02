import { wanted } from '../getCoinPrices_/getCrawlerDocs';
import { getDocs, collection, QuerySnapshot } from 'firebase/firestore';
import { DateTime } from 'luxon';

const getLatestSnapshot = async (db: any, pair: string, year: number): Promise<QuerySnapshot> => {
  if (year <= 2015) {
    return Promise.reject('Cannot go before 2015');
  }

  /**
   * Get all collections to determine which ones are latest for each pair
   */
  let querySnapshot;

  try {
    const collectionName = `${pair}-${year}`;
    querySnapshot = await getDocs(collection(db, collectionName));
    if (querySnapshot.empty) {
      return getLatestSnapshot(db, pair, year - 1);
    }
    return querySnapshot as QuerySnapshot;
  } catch (e) {
    return Promise.reject(e);
  }
};

const getLatestSnapshots = async (db: any): Promise<Array<[string, QuerySnapshot]>> => {
  const currentYear = DateTime.now().year;
  const promises = wanted.map((pair: string) => {
    return getLatestSnapshot(db, pair, currentYear);
  });
  const promised = await Promise.all(promises);
  return wanted.map((pair: string, key: number) => {
    const promise = promised[key];
    return [pair, promise];
  });
};

export default getLatestSnapshots;
