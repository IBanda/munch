import { useQuery, gql, useMutation, MutationFunction } from '@apollo/client';
import { createContext, useContext } from 'react';

interface Props {
  children: React.ReactNode;
}

interface ContextInterface {
  user: { id: string; name: string; email: string; profilePic: string };
  loading: boolean;
  logout: MutationFunction;
}

const GET_USER = gql`
  query GetUser {
    user: getUser {
      id
      name
      email
      profilePic
    }
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

const AuthContext = createContext<ContextInterface | null>(null);

export function AuthProvider({ children }: Props) {
  const { data, loading } = useQuery(GET_USER);
  const [logout] = useMutation(LOGOUT, {
    update(cache) {
      cache.modify({
        fields: {
          getUser() {
            return null;
          },
        },
      });
    },
  });

  const user = data?.user;
  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser can only be used within the AuthProvider');
  }
  return context;
}
