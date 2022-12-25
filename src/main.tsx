/**
 * App entry point, load css & render App component on root
 */
import './reset.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from '@firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from '@firebase/app-check';
import { getAnalytics, logEvent } from '@firebase/analytics';
import { connectAuthEmulator, getAuth } from '@firebase/auth';
import { getFunctions, connectFunctionsEmulator } from '@firebase/functions';
import { getFirestore, connectFirestoreEmulator } from '@firebase/firestore';
import { getStorage, connectStorageEmulator } from '@firebase/storage';
import Providers from '@src/components/Providers';

const firebaseConfig = {
  apiKey: 'AIzaSyAzBYq8pLcIDa6DgAbnyuVg0Id1AKbae3A',
  authDomain: 'coinsponge-com.firebaseapp.com',
  projectId: 'coinsponge-com',
  storageBucket: 'coinsponge-com.appspot.com',
  messagingSenderId: '700506993969',
  appId: '1:700506993969:web:4b2ee26409040b2d66ac10',
  measurementId: 'G-C4Y69T6VD7',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, 'app started');

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfO3qcjAAAAAIL7hd7gwKlFvoDEVhXhSEsIQ5ka'),
  isTokenAutoRefreshEnabled: true,
});

// connect to the local emulators
if (import.meta.env.MODE === 'development' || import.meta.env.dev) {
  console.log('----- DEVELOPMENT MODE -----');
  const region = 'us-west1';
  const functions = getFunctions(app, region);
  const storage = getStorage(app);
  const auth = getAuth(app);
  const db = getFirestore(app);
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectStorageEmulator(storage, '127.0.0.1', 9199);
  connectFirestoreEmulator(db, '127.0.0.1', 6060);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers />
    </BrowserRouter>
  </React.StrictMode>,
);
