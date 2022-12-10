import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@config': `${__dirname}/config`,
  '@pulse': `${__dirname}/pulse`,
  '@routes': `${__dirname}/routes`,
  '@store': `${__dirname}/store`,
  '@transformers': `${__dirname}/transformers`,
});

import configExpress from '@config/express';
import configSessions from '@config/sessions';
import configSockets from '@config/sockets';
import configRoutes from '@config/routes';
import configStaticFiles from '@config/staticFiles';
import configPulse from '@config/pulse';

const [app] = configExpress();
const [sessionParser] = configSessions();
const [server, wss] = configSockets(app, sessionParser);
configRoutes(app);
configStaticFiles(app);
configPulse(wss);

const port = process.env.PORT || 7777;

server.listen(port, () => {
  console.log(`*~~% coinsponge.com (port ${port}) %~~*`);
});
