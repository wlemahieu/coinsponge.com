import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';

// create express session using redis
const redisStore = connectRedis(session);
const redisClient = new Redis() as any;

const secret = 'Si10!ZtwS5WR*'; // Change and move to cloud
const path = '/';
const httpOnly = true;
const secure = false;
const cookie = {
  path,
  httpOnly,
  secure,
};

const resave = false;
const saveUninitialized = true;
const unset = 'destroy';

export default () => {
  const store = new redisStore({
    client: redisClient,
    ttl: 1000 * 60 * 60, // 1hr TTL
  });
  
  const sessionParser = session({
    secret,
    cookie,
    store,
    resave,
    name: 'connect.client.sid',
    saveUninitialized,
    unset,
  });
  
  return [sessionParser];
}