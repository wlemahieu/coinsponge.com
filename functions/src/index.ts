import * as functions from 'firebase-functions';
import doSendEmail from './sendEmail';
import doGetCoinPrice from './getCoinPrice';
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

export const getCoinPrice = functions
  .region('us-west1')
  .runWith({
    timeoutSeconds: 120,
    memory: '512MB',
  })
  .pubsub.schedule('every 2 minutes')
  .onRun((context) => {
    return doGetCoinPrice(context);
  });

export const getLatestPrices = functions
  .region('us-west1')
  .runWith({
    timeoutSeconds: 120,
    memory: '512MB',
  })
  .pubsub.schedule('every 1 minutes')
  .onRun((context) => {
    return doGetLatestPrices(context);
  });
