import { FormEvent, useState } from 'react';
import ImageUpload from './ImageUpload';
import { Input } from '@progress/kendo-react-inputs';
import { UploadFileInfo, UploadOnAddEvent } from '@progress/kendo-react-upload';
import { Button } from '@progress/kendo-react-buttons';
import { Label } from '@progress/kendo-react-labels';
import { useMutation, gql } from '@apollo/client';
import { Loader } from '@progress/kendo-react-indicators';
import Modal, { ModalDispatch } from './Modal';
import { Notification } from '@progress/kendo-react-notification';

export const SIGNUP = gql`
  mutation Signup($user: UserInput) {
    signup(user: $user) {
      id
      name
      email
      profilePic
    }
  }
`;

export default function Signup({ setModal }: ModalDispatch) {
  const [signup, { loading, error }] = useMutation(SIGNUP, {
    update(cache, { data: { signup } }) {
      cache.modify({
        fields: {
          getUser() {
            return signup;
          },
        },
      });
    },
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState<Array<UploadFileInfo>>([]);

  const onAdd = (e: UploadOnAddEvent) => {
    setFile(e.newState);
  };
  const removeFile = (id: string) => {
    setFile((prev) => prev.filter((file) => file.uid !== id));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signup({
        variables: {
          user: { name, email, password, profilePic: file[0]?.getRawFile?.() },
        },
      });
      !loading && !error && setModal('hidden');
    } catch (error) {}
  };

  return (
    <Modal height={450} onClose={() => setModal('hidden')}>
      <form onSubmit={onSubmit} className="m__auth-form">
        <Input
          label="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.value)}
          valid={true}
          required
        />
        <Input
          label="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.value)}
          valid={true}
          required
        />
        <Input
          label="Password"
          id="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.value)}
          valid={true}
          required
        />

        <Label editorId="" className="mb-0 mt-2">
          Profile Picture
        </Label>
        <ImageUpload files={file} onAdd={onAdd} removeFile={removeFile} />
        {error ? (
          <Notification className="w-100" type={{ style: 'error', icon: true }}>
            {error?.message}
          </Notification>
        ) : null}
        <Button
          type="submit"
          data-testid="signup-btn"
          className="w-100 mt-2 "
          primary={true}
        >
          {!loading ? (
            'Sign up'
          ) : (
            <div data-testid="loader">
              <Loader />
            </div>
          )}
        </Button>
      </form>
    </Modal>
  );
}
