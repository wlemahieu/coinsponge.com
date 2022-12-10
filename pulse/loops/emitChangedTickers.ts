/**
 * emitChangedTickers.ts
 *
 * 5s loop for emitting changed tickers
 *
 */
import EventEmitter from 'events';
import { WebSocketServer } from 'ws';
import debounce from 'lodash/debounce';
import emitChangedTournaments from '@pulse/core/emitChangedTickers';

let tickers: Array<any> = [];

const doDebounce = debounce(async (emitter: EventEmitter, wss: WebSocketServer) => {
  await emitChangedTournaments(wss, tickers);
  doDebounce(emitter, wss);
}, 5000);

const loopEmitChangedTickers = (emitter: EventEmitter, wss: WebSocketServer) => {
  emitter.on('tickers', (data) => {
    tickers = data;
  });
  doDebounce(emitter, wss);
};

export default loopEmitChangedTickers;
