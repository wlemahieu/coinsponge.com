/**
 * The Pulse keeps everything running smoothly. It gathers resources multiple
 * times a second and propagates those resources to any loops that need them.
 *
 * This allows for multiple loops running on sub-second intervals without
 * unnecessarily flooding Redis with individual calls from clients.
 */
import EventEmitter from 'events';
import debounce from 'lodash/debounce';

import getTickers from '@store/getTickers';
import emitChangedTournaments from '@pulse/loops/emitChangedTickers';

const emitter = new EventEmitter();

// gather all resources on an interval
const gatherResources = debounce(async (wss: any) => {
  // get all the things
  const [tickers] = await Promise.allSettled([getTickers()]);

  // propagate all the things to sub-components
  if (tickers.status === 'fulfilled') {
    emitter.emit('tickers', tickers.value);
  }

  gatherResources(wss);
}, 2000);

export default (wss: any) => {
  gatherResources(wss);
  emitChangedTournaments(emitter, wss);
};
