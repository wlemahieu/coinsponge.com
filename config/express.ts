import express, { Application, Request, Response } from 'express';
import nocache from 'nocache';
import cors from 'cors';

export interface RequestI extends Request {
  sessionID: string;
}
export interface ResponseI extends Response {};

export default (): [Application] => {
  const app = express();

  app.use(nocache());
  app.use(cors({ credentials: true, origin: true }));

  return [app];
}