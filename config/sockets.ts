import { Application } from 'express';
import http, { Server } from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

export interface ExtWebSocket extends WebSocket {
  isAlive?: boolean;
  sessionID?: string;
  socketID?: string;
}

const heartbeat = (ws: ExtWebSocket) => {
  ws.isAlive = true;
}

export const wss = new WebSocketServer({ noServer: true });

export default (app: Application, sessionParser: any): [Server, any] => {
  const server = http.createServer(app);
  
  server.on('upgrade', function (request: any, socket: any, head: any) {
    sessionParser(request, {}, () => {
      if (!request.sessionID) {
        console.log('unauthorized!');
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }
  
      wss.handleUpgrade(request, socket, head, function (ws) {
        wss.emit('connection', ws, request);
      });
    });
  });

  app.use(sessionParser);

  // USER CONNECTED (onload events)
  wss.on('connection', async function connection(client: ExtWebSocket, request: any) {
    const { sessionID } = request;
    console.log('user connected', sessionID, Date.now());
  
    // CLIENT ALIVE-CHECK
    client.isAlive = true;
    client.sessionID = request.sessionID;
    client.socketID = uuidv4();
    client.on('pong', () => heartbeat(client));
    
    // message all clients in the ui
    client.on('message', async function message(d, isBinary) {
      if (client.readyState === WebSocket.OPEN) {
        const clientSessID = client.sessionID as string;
        console.log({clientSessID});
      }
      // wss.clients.forEach(function each(client: ExtWebSocket) {});
    });
  });

  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(client: ExtWebSocket) {
      if (client.isAlive === false) {
        console.log('user disconnected');
        return client.terminate();
      };
      client.isAlive = false;
      client.ping();
    });
  }, 5000);

  wss.on('close', function close() {
    clearInterval(interval);
  });

  wss.on('open', function connection(client) {
    client.send('open');
  });
  
  return [server, wss];
}