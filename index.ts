import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@config': `${__dirname}/config`,
});

import configExpress from '@config/express';
import configSessions from '@config/sessions';
import configSockets from '@config/sockets';
import configRoutes from '@config/routes';
import configStaticFiles from '@config/staticFiles';

const [app] = configExpress();
const [sessionParser] = configSessions();
const [server, wss] = configSockets(app, sessionParser);
configRoutes(app);
configStaticFiles(app);

server.listen(process.env.PORT || 7777, () => {
  console.log(`*~~% www.coinsponge.com %~~*`);
});
