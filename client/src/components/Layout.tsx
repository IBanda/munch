import { useState } from 'react';
import { AuthFormControl } from './Context';
import Header from './Header';

interface Props {
  children: React.ReactNode;
  fluid?: boolean;
  className?: string;
}

export default function Layout({ children, fluid, className }: Props) {
  const [modal, setModal] = useState<'hidden' | 'visible'>('hidden');
  const [form, setForm] = useState<'signup' | 'login'>('login');

  return (
    <div className={`container${fluid ? '-fluid' : ''} ${className}`}>
      <AuthFormControl.Provider value={{ setModal, setForm, modal, form }}>
        <Header />
        {children}
      </AuthFormControl.Provider>
    </div>
  );
}
