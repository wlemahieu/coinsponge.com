/**
 * App structure, session fetch, socket listeners
 */
import { Accessor, Component, createContext, createEffect, createSignal, onMount, Show } from 'solid-js';
import { createStore, SetStoreFunction, Store } from 'solid-js/store';
import { Router } from '@solidjs/router';
import Header from '@components/Header';
import Navigation from '@components/Navigation';
import Routes from '@components/Routes';

const functionURL = 'https://coinsponge-com-5awxk26zha-uw.a.run.app';

const v1GetMyUser = async (): Promise<string> => {
  const url = import.meta.env.PROD ? functionURL : 'http://localhost:7777';
  const path = '/v1/me';
  console.log({ url, path });
  const results = await fetch(`${url}${path}`, {
    method: 'GET',
    credentials: 'include',
  });
  return await results.text();
};

interface DefaultValuesI {
  sessionID: string;
}

type StoreT = [Store<DefaultValuesI>, SetStoreFunction<DefaultValuesI>];

const defaultValues: DefaultValuesI = {
  sessionID: '',
};

export type AppContextT = [DefaultValuesI, Accessor<WebSocket>];
export const AppContext = createContext<AppContextT>();

const App: Component = () => {
  const [state, setState]: StoreT = createStore(defaultValues);
  const [wss] = createSignal<WebSocket>(new WebSocket('ws://localhost:7777'));

  onMount(async () => {
    console.log('import.meta.env.PROD', import.meta.env.PROD);
    const sessionID = await v1GetMyUser();
    setState('sessionID', () => sessionID);
  });

  createEffect(() => {
    // const ws = wss();
    // Connection opened
    /*
    ws.addEventListener('open', (event: Event) => {
      // console.log('ws open event = ', event);
    });

    // Connection closed
    ws.addEventListener('close', (event: CloseEvent) => {
      // console.log('ws close event = ', event);
    });*/
    // Listen for messages
    /*
    ws.addEventListener('message', (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log('message', data);
    });
    */
  });

  return (
    <AppContext.Provider value={[state, wss]}>
      <Show when={state.sessionID.length}>
        <Router>
          <Header />
          <Navigation />
          <Routes />
        </Router>
      </Show>
    </AppContext.Provider>
  );
};

export default App;
