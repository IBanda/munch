import apolloExpressServer from './server';
import db from './db';
async function start() {
  const { connect } = db();
  await connect();
  const { server, app } = await apolloExpressServer();
  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Server ready at ${server.graphqlPath}`);
  });
}
start();
