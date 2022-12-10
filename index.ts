import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@config': `${__dirname}/config`,
  '@routes': `${__dirname}/routes`,
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

const port = process.env.PORT || 7777;

server.listen(port, () => {
  console.log(`*~~% coinsponge.com (port ${port}) %~~*`);
});
