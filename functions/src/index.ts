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

export const getCoinPrices = functions
  .region('us-west1')
  .runWith({
    timeoutSeconds: 75,
    memory: '2GB',
  })
  .pubsub.schedule('every 75 seconds')
  .onRun((context) => {
    return doGetCoinPrices(context);
  });

export const getLatestPrices = functions
  .region('us-west1')
  .runWith({
    timeoutSeconds: 75,
    memory: '2GB',
  })
  .pubsub.schedule('every 75 seconds')
  .onRun((context) => {
    return doGetLatestPrices(context);
  });
