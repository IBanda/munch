import { lazy, Suspense } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import AppLoader from './AppLoader';
import useUser from './AuthProvider';
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Avatar,
} from '@progress/kendo-react-layout';
import { Link } from 'react-router-dom';
import { useAuthFormControls } from './Context';
import { Skeleton } from '@progress/kendo-react-indicators';
const Signup = lazy(() => import('./Signup'));
const Login = lazy(() => import('./Login'));

export default function Header() {
  const { loading, user, logout } = useUser();
  const { setModal, modal, setForm, form } = useAuthFormControls();
  const onOpen = (form: 'signup' | 'login') => {
    setModal('visible');
    setForm(form);
  };
  const name = user?.name?.split(' ')[0];

  return (
    <header>
      <AppBar className="shadow-none bg-white px-2">
        <AppBarSection>
          <Link to="/">
            <img className="logo" src="logo.jpg" alt="logo" />
          </Link>
        </AppBarSection>
        <AppBarSpacer />
        <AppBarSection>
          {!loading ? (
            user ? (
              <div className="d-flex align-items-center">
                <small className="mr-2 d-none d-md-block font-weight-bold">
                  {name}
                </small>
                <Avatar shape="circle">
                  {user?.profilePic ? (
                    <img
                      className="m__avatar-img"
                      src={user?.profilePic}
                      alt={user?.name}
                    />
                  ) : (
                    user?.name?.[0].toUpperCase()
                  )}
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
          ) : (
            <Skeleton shape="rectangle" style={{ width: 100, height: 40 }} />
          )}
        </AppBarSection>
      </AppBar>
    </header>
  );
}
