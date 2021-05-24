import { ApolloProvider } from '@apollo/client';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from 'components/AuthProvider';
import Layout from 'components/Layout';
import apolloClient from 'lib/apolloClient';
import Places from 'pages/Places';
import { MemoryRouter } from 'react-router';
import { load } from '__tests__/__utils__/load';
import { mockGeolocation } from '__tests__/__utils__/mockGeolocation';

test('Marker click should open window', async () => {
  mockGeolocation();
  render(
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Layout>
          <Places />
        </Layout>
      </AuthProvider>
    </ApolloProvider>,
    {
      wrapper: MemoryRouter,
    }
  );

  await waitForElementToBeRemoved(() => screen.getAllByTestId('skeleton'));

  const markers = screen.getAllByTestId('marker');
  expect(markers).toHaveLength(22);

  userEvent.click(markers[0]);

  await load();

  expect(screen.getByTestId('place-details')).toBeInTheDocument();
});
