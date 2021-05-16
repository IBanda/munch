import { lazy, Suspense, useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import AppLoader from './AppLoader';
import useUser from './AuthProvider';
import { Avatar } from '@progress/kendo-react-layout';

const Signup = lazy(() => import('./Signup'));
const Login = lazy(() => import('./Login'));

export default function Header() {
  const { loading, user, logout } = useUser();
  const [modal, setModal] = useState<'hidden' | 'visible'>('hidden');
  const [form, setForm] = useState<'signup' | 'login'>();

  const onOpen = (form: 'signup' | 'login') => {
    setModal('visible');
    setForm(form);
  };

  return (
    <header className="d-flex justify-content-between border p-2 align-items-center">
      <img className="logo" src="logo.jpg" alt="logo" />
      {!loading ? (
        user ? (
          <div className="d-flex align-items-center">
            <small className="mr-2 d-none d-md-block">{user?.name}</small>
            <Avatar shape="circle">
              <img
                className="m__avatar-img"
                src={user?.profilePic}
                alt={user?.name}
              />
            </Avatar>
            <Button
              onClick={() => logout()}
              look="outline"
              className="btn-sm ml-2"
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <div>
              <Button
                onClick={() => onOpen('signup')}
                className="bg-success text-white  btn-sm"
              >
                Sign up
              </Button>
              <Button
                onClick={() => onOpen('login')}
                look="outline"
                className=" ml-1  btn-sm"
              >
                Sign in
              </Button>
            </div>
            {modal === 'visible' ? (
              <Suspense
                fallback={
                  <div className="m__overlay">
                    <AppLoader />
                  </div>
                }
              >
                {form === 'login' ? (
                  <Login setModal={setModal} />
                ) : (
                  <Signup setModal={setModal} />
                )}
              </Suspense>
            ) : null}
          </>
        )
      ) : null}
    </header>
  );
}
