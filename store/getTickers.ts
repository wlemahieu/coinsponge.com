/**
 * getTickers.ts
 *
 * Get all stored tickers
 */
import Redis from '@config/redis';
import transformTicker from '@transformers/transformTicker';

export default async (): Promise<Array<unknown>> => {
  const redis = Redis();
  const resp = await redis.get('TICKERS');
  if (resp) {
    const tickers = await Promise.all(JSON.parse(resp).map((ticker: string) => redis.hgetall(ticker)));
    return tickers.map((ticker) => transformTicker(ticker));
  }
  return [];
};
