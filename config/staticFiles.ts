import express, { Application, Request, Response } from 'express';
import path from 'path';

export default (app: Application): void => {
  const NODE_ENV = process.env.NODE_ENV as string;

  if (['production', 'staging'].includes(NODE_ENV)) {
    const sendFilePath = path.join(__dirname, 'index.html');

    app.use(
      express.static(__dirname, {
        lastModified: false,
      }),
    );

    app.get('*', (req: Request, res: Response) => {
      res.sendFile(sendFilePath);
    });
  }
};
