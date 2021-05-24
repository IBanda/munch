import { Button } from '@progress/kendo-react-buttons';
import { FormEvent, useState } from 'react';
import Modal, { ModalDispatch } from './Modal';
import { useMutation, gql } from '@apollo/client';
import { Loader } from '@progress/kendo-react-indicators';
import { Notification } from '@progress/kendo-react-notification';
import { Input } from '@progress/kendo-react-inputs';

const SIGNIN = gql`
  mutation Signin($user: UserInput) {
    signin(user: $user) {
      id
      name
      email
      profilePic
    }
  }
`;

export default function Login({ setModal }: ModalDispatch) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(SIGNIN, {
    update(cache, { data: { signin } }) {
      cache.modify({
        fields: {
          getUser() {
            return signin;
          },
        },
      });
    },
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login({
        variables: {
          user: {
            email,
            password,
          },
        },
      });
      if (!loading && !error) {
        setModal('hidden');
      }
    } catch (error) {}
  };
  return (
    <Modal height={320} onClose={() => setModal('hidden')}>
      <form
        data-testid="auth-form"
        onSubmit={onSubmit}
        className="m__auth-form"
      >
        <Input
          type="email"
          value={email}
          id="email"
          label="Email"
          valid={true}
          required
          onChange={(e) => setEmail(e.value)}
        />

        <Input
          type="password"
          value={password}
          id="password"
          label="Password"
          required
          width="100%"
          valid={true}
          onChange={(e) => setPassword(e.value)}
        />
        {error ? (
          <Notification className="w-100" type={{ style: 'error', icon: true }}>
            {error?.message}
          </Notification>
        ) : null}
        <Button data-testid="signin-btn" className="w-100 mt-4 " primary={true}>
          {loading ? (
            <div data-testid="loader">
              <Loader />
            </div>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </Modal>
  );
}
