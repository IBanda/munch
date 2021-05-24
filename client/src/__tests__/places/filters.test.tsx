import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';
import { MemoryRouter } from 'react-router';
import { mockGeolocation } from '__tests__/__utils__/mockGeolocation';

beforeEach(() => {
  render(<App />, {
    wrapper: MemoryRouter,
  });
});

test('Add and remove filters', async () => {
  mockGeolocation();
  userEvent.click(screen.getByTestId('link-to-places'));
  await waitForElementToBeRemoved(() => screen.getAllByTestId('skeleton'));
  userEvent.click(screen.getByText('Filter'));
  userEvent.type(screen.getByLabelText('Keywords'), 'Rules');
  userEvent.click(screen.getByLabelText('Cuisine'));
  userEvent.click(screen.getByText('Seafood'));
  userEvent.click(screen.getByLabelText('Dining options'));
  userEvent.click(screen.getByText('Indoor'));
  userEvent.click(screen.getByText('Search'));
  expect(global.window.location.search).toBe(
    '?cuisine=Seafood&dining=Indoor&keyword=Rules'
  );
  await waitFor(() => screen.getAllByTestId('skeleton'));
  await waitForElementToBeRemoved(() => screen.getAllByTestId('skeleton'));
  expect(screen.getByText('Rules')).toBeInTheDocument();
  expect(screen.getAllByTestId('place')).toHaveLength(1);
  userEvent.click(screen.getByText('Clear'));
  await waitFor(() => expect(screen.getAllByTestId('place')).toHaveLength(22));
});
