import { ApolloProvider } from '@apollo/client';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import { AuthProvider } from 'components/AuthProvider';
import PlaceDetails from 'components/PlaceDetails';
import Layout from 'components/Layout';
import apolloClient from 'lib/apolloClient';
import { MemoryRouter } from 'react-router';
import { load } from '__tests__/__utils__/load';
const stub: any = () => {};

beforeEach(() => {
  render(
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Layout>
          <PlaceDetails id={'ChIJbUnC58oEdkgR4pwzPtYGrbY'} setWindow={stub} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>,
    {
      wrapper: MemoryRouter,
    }
  );
});

test('Add  a review/increment ratings count', async () => {
  await signin();

  userEvent.type(
    screen.getByTestId('editor'),
    'Wow the place has amazing service'
  );

  const ratingContainer = screen.getByTestId('rating');

  userEvent.click(
    ratingContainer.querySelector('span[title="3"]') as TargetElement
  );

  const postBtn = screen.getByText('Post');

  expect(postBtn).not.toBeDisabled();

  userEvent.click(postBtn);

  await load();
  expect(screen.getByTestId('num-of-ratings')).toHaveTextContent('3');
  expect(
    screen.getByText('Wow the place has amazing service')
  ).toBeInTheDocument();
});

test('Delete a review/decrement ratings count', async () => {
  await signin();

  const btns = screen.getAllByTestId('del-btn');

  expect(btns).toHaveLength(2);

  userEvent.click(btns[0]);

  await waitFor(() =>
    expect(screen.getAllByTestId('review-card')).toHaveLength(1)
  );
  expect(screen.getByTestId('num-of-ratings')).toHaveTextContent('1');
});

async function signin() {
  await load();

  await waitFor(() => screen.getAllByTestId('review-card'));

  userEvent.click(screen.getByTestId('indetail-signin'));

  await waitFor(() => screen.getByTestId('auth-form'));
  userEvent.type(screen.getByLabelText('Email'), 'test@mail.com');
  userEvent.type(screen.getByLabelText('Password'), '123456');
  userEvent.click(screen.getByTestId('signin-btn'));
  await load();
}
