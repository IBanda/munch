import { FormEvent, useState } from 'react';
import ImageUpload from './ImageUpload';
import { InputWithLabel } from './InputWithLabel';
import { UploadFileInfo, UploadOnAddEvent } from '@progress/kendo-react-upload';
import { Button } from '@progress/kendo-react-buttons';
import { Label } from '@progress/kendo-react-labels';
import { useMutation, gql } from '@apollo/client';
import { Loader } from '@progress/kendo-react-indicators';
import Modal, { ModalDispatch } from './Modal';
import { Notification } from '@progress/kendo-react-notification';

const SIGNUP = gql`
  mutation Signup($user: UserInput) {
    signup(user: $user) {
      id
      name
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
    await signup({
      variables: {
        user: { name, email, password, profilePic: file[0]?.getRawFile?.() },
      },
    });
    !loading && !error && setModal('hidden');
  };
  console.log(file[0]?.getRawFile?.());
  return (
    <Modal height={450} onClose={() => setModal('hidden')}>
      <form onSubmit={onSubmit} className="m__auth-form">
        <InputWithLabel
          label="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.value)}
          required
        />
        <InputWithLabel
          label="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.value)}
          required
        />
        <InputWithLabel
          label="Pasword"
          id="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.value)}
          required
        />

        <Label className="mb-0 mt-2">Profile Picture</Label>
        <ImageUpload files={file} onAdd={onAdd} removeFile={removeFile} />
        {error ? (
          <Notification className="w-100" type={{ style: 'error', icon: true }}>
            {error?.message}
          </Notification>
        ) : null}
        <Button className="w-100 mt-2 " primary={true}>
          {!loading ? 'Sign up' : <Loader />}
        </Button>
      </form>
    </Modal>
  );
}
