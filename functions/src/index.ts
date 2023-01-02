import * as functions from 'firebase-functions';
import doSendEmail from './sendEmail';
import doGetCoinPrices from './getCoinPrices';
import doGetLatestPrices from './getLatestPrices';

export const sendEmail = functions
  .region('us-west1')
  .runWith({ enforceAppCheck: true, secrets: ['SENDGRID_API_KEY'] })
  .https.onCall(async (data, context) => {
    if (context.app == undefined) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called from an App Check verified app.',
      );
    }
    return doSendEmail(data.text);
  });

/**
 * At current scale, this takes ~51s.
 */
export const getCoinPrices = functions
  .region('us-west1')
  .runWith({
    timeoutSeconds: 120,
    memory: '1GB',
  })
  .pubsub.schedule('every 1 minutes')
  .onRun((context) => {
    return doGetCoinPrices(context, 'BTCUSD');
  });

// temp for backfills
export const getCoinPrices2 = functions
  .region('us-west1')
  .runWith({
    timeoutSeconds: 120,
    memory: '1GB',
  })
  .pubsub.schedule('every 1 minutes')
  .onRun((context) => {
    return doGetCoinPrices(context, 'ETHUSD');
  });

// temp for backfills

export const getCoinPrices3 = functions
  .region('us-west1')
  .runWith({
    timeoutSeconds: 120,
    memory: '1GB',
  })
  .pubsub.schedule('every 1 minutes')
  .onRun((context) => {
    return doGetCoinPrices(context, 'NANOUSD');
  });

export const getLatestPrices = functions
  .region('us-west1')
  .runWith({
    timeoutSeconds: 60,
    memory: '2GB',
  })
  .pubsub.schedule('every 1 minutes')
  .onRun((context) => {
    return doGetLatestPrices(context);
  });
