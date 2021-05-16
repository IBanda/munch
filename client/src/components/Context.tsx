import React, { createContext, Dispatch, useContext } from 'react';
import { ModalDisatch } from './Modal';

interface Context {
  id?: string;
  setId?: Dispatch<React.SetStateAction<string>>;
  setWindow?: Dispatch<React.SetStateAction<{ open: boolean; id: string }>>;
}

interface AuthFormControlInterface extends ModalDisatch {
  form: 'signup' | 'login';
  setForm: Dispatch<React.SetStateAction<'login' | 'signup'>>;
  modal: 'hidden' | 'visible';
}

interface UploadContext {
  (id: string): void;
}

const AppState = createContext<Context | null>(null);
const AppDispatch = createContext<Context | null>(null);
export const UploadState = createContext<UploadContext | null>(null);
export const AuthFormControl = createContext<AuthFormControlInterface | null>(
  null
);

interface Props {
  children: React.ReactNode;
  context: Context;
}

export function AppStateProvider({ children, context }: Props) {
  return <AppState.Provider value={context}>{children}</AppState.Provider>;
}

export function AppDispatchProvider({ children, context }: Props) {
  return (
    <AppDispatch.Provider value={context}>{children}</AppDispatch.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppState);
  if (!context && context !== '') {
    throw new Error('useAppState should only be used in AppStateProvider');
  }
  return context;
}
export function useDispatch() {
  const context = useContext(AppDispatch);
  if (!context) {
    throw new Error('useDispatch should only be used in AppDispatchProvider');
  }
  return context;
}

export function useAuthFormControls() {
  const context = useContext(AuthFormControl);
  if (!context) {
    throw new Error(
      'useAuthFormControls should only be used in AuthFormControl'
    );
  }
  return context;
}
