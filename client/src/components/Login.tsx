import { Button } from '@progress/kendo-react-buttons';
import { Error } from '@progress/kendo-react-labels';
import { FormEvent, useState } from 'react';
import { InputWithLabel } from './InputWithLabel';
import Modal, { ModalDisatch } from './Modal';
import { useMutation, gql } from '@apollo/client';
import { Loader } from '@progress/kendo-react-indicators';

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

export default function Login({ setModal }: ModalDisatch) {
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({
      variables: {
        user: {
          email,
          password,
        },
      },
    });
    !loading && setModal('hidden');
  };
  return (
    <Modal onClose={() => setModal('hidden')}>
      <form onSubmit={onSubmit}>
        <InputWithLabel
          type="email"
          value={email}
          id="email"
          label="Email"
          onChange={(e) => setEmail(e.value)}
          required
        />
        <Error>Email is required</Error>
        <InputWithLabel
          type="password"
          value={password}
          id="password"
          label="Password"
          onChange={(e) => setPassword(e.value)}
          required
        />
        <Error>Password is required</Error>

        <Button className="w-100 mt-4 btn-sm" primary={true}>
          {loading ? <Loader /> : 'Sign in'}
        </Button>
      </form>
    </Modal>
  );
}
