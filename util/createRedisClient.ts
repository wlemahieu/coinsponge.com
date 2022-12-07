import Redis from 'ioredis';
import JSONCache from 'redis-json';

const redis = new Redis() as any;

export default (prefix: string) => {
  return new JSONCache(redis, {prefix: `${prefix}:`});

}