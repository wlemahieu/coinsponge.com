import * as functions from 'firebase-functions';
import doSendEmail from './sendEmail';
// import doGetCoinPrice from './getCoinPrice';

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

/*
export const getCoinPrice = functions
  .region('us-west1')
  .pubsub.schedule('every 1 minutes')
  .onRun((context) => {
    return doGetCoinPrice(context);
  });
*/
