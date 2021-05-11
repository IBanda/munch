import React, { createContext, useContext } from 'react';

interface Context {
  id?: string;
  setId?: React.SetStateAction<any>;
  setWindow?: React.SetStateAction<any>;
}
const AppState = createContext<Context | null>(null);
const AppDispatch = createContext<Context | null>(null);

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
