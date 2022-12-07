import * as redisCore from 'redis';

export default () => {
  return redisCore.createClient({
    url: 'redis://127.0.0.1:6379',
  });
};
