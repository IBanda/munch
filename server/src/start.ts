import apolloExpressServer from './server';
import './db';
async function start() {
  const { httpServer, server } = await apolloExpressServer();
  httpServer.listen(4000, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
    console.log(
      `🚀 Server ready at http://localhost:4000${server.subscriptionsPath}`
    );
  });
}
start();
