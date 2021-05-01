import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-integration-testing';
import apolloExpressServer from '../../server';

async function testClient() {
  const { server } = await apolloExpressServer();
  const { query, mutate, setOptions } = createTestClient({
    apolloServer: server as never,
  });

  setOptions({
    request: {
      session: {},
    },
  });
  return { query, mutate };
}

export { gql, testClient };
