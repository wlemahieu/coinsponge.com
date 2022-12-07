import configExpress from '@config/express';
import configSessions from '@config/sessions';
import configSockets from '@config/sockets';
import configRoutes from '@config/routes';

const [app] = configExpress();
const [sessionParser] = configSessions();
const [server, wss] = configSockets(app, sessionParser);
configRoutes(app);

server.listen(process.env.port || 7777, () => {
  console.log(`*~~% www.coinsponge.com %~~*`);
});