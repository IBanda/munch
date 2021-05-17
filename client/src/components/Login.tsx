import { Button } from '@progress/kendo-react-buttons';
import { FormEvent, useState } from 'react';
import { InputWithLabel } from './InputWithLabel';
import Modal, { ModalDispatch } from './Modal';
import { useMutation, gql } from '@apollo/client';
import { Loader } from '@progress/kendo-react-indicators';
import { Notification } from '@progress/kendo-react-notification';

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
  };
  return (
    <Modal height={320} onClose={() => setModal('hidden')}>
      <form onSubmit={onSubmit} className="m__auth-form">
        <InputWithLabel
          type="email"
          value={email}
          id="email"
          label="Email"
          onChange={(e) => setEmail(e.value)}
          required
        />
        <InputWithLabel
          type="password"
          value={password}
          id="password"
          label="Password"
          onChange={(e) => setPassword(e.value)}
          required
        />
        {error ? (
          <Notification className="w-100" type={{ style: 'error', icon: true }}>
            {error?.message}
          </Notification>
        ) : null}
        <Button className="w-100 mt-4 " primary={true}>
          {loading ? <Loader /> : 'Sign in'}
        </Button>
      </form>
    </Modal>
  );
}
