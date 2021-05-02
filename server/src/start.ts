import apolloExpressServer from './server';
import db from './db';
async function start() {
  const { connect } = db();
  await connect();
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
