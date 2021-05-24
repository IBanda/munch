import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

beforeEach(() => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
});
afterEach(() => localStorage.removeItem('users'));

describe('Authentication', () => {
  global.URL.createObjectURL = jest.fn();
  global.URL.revokeObjectURL = jest.fn();
  test('User sign up', async () => {
    userEvent.click(await waitFor(() => screen.getByText('Sign up')));
    await load();
    act();
    await load();
    const logoutBtn = screen.getByText('Logout');
    expect(logoutBtn).toBeInTheDocument();
  });

  test('Duplicate email should error', async () => {
    userEvent.click(await waitFor(() => screen.getByText('Sign up')));
    act();
    await load();
    const logoutBtn = screen.getByText('Logout');
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);
    userEvent.click(await waitFor(() => screen.getByText('Sign up')));
    act();

    await load();
    await waitFor(() =>
      expect(screen.getByText('Email already exists')).toBeInTheDocument()
    );
  });

  test('User Sign in', async () => {
    userEvent.click(await waitFor(() => screen.getByText('Sign in')));

    await load();

    userEvent.type(screen.getByLabelText('Email'), 'test@mail.com');
    userEvent.type(screen.getByLabelText('Password'), '123456');
    userEvent.click(screen.getByTestId('signin-btn'));

    await load();

    const logoutBtn = screen.getByText('Logout');
    expect(logoutBtn).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('Non registered email should error', async () => {
    userEvent.click(await waitFor(() => screen.getByText('Sign in')));

    userEvent.type(screen.getByLabelText('Email'), 'notuser@mail.com');
    userEvent.type(screen.getByLabelText('Password'), '123456');
    userEvent.click(screen.getByTestId('signin-btn'));

    await load();

    expect(
      screen.getByText('User with this email does not exist')
    ).toBeInTheDocument();
  });

  test('Wrong password should error', async () => {
    userEvent.click(await waitFor(() => screen.getByText('Sign in')));

    userEvent.type(screen.getByLabelText('Email'), 'test@mail.com');
    userEvent.type(screen.getByLabelText('Password'), '12ds3456');
    userEvent.click(screen.getByTestId('signin-btn'));

    await load();

    expect(screen.getByText('Invalid password')).toBeInTheDocument();
  });
});

function act() {
  userEvent.type(screen.getByLabelText('Name'), 'Test User');
  userEvent.type(screen.getByLabelText('Email'), 'test@mail.com');
  userEvent.type(screen.getByLabelText('Password'), '123456');
  userEvent.click(screen.getByTestId('signup-btn'));
}

async function load() {
  await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
}
