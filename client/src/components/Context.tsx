import React, { createContext, useContext } from 'react';

const AppState = createContext<string | null>(null);
const AppDispatch = createContext<any>(null);

interface Props {
  children: React.ReactNode;
  id?: string;
  setId?: any;
}

export function AppStateProvider({ children, id }: Props) {
  return <AppState.Provider value={id as string}>{children}</AppState.Provider>;
}

export function AppDispatchProvider({ children, setId }: Props) {
  return <AppDispatch.Provider value={setId}>{children}</AppDispatch.Provider>;
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
