import AppErrorBoundary from 'components/AppErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Places from './pages/Places';
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'lib/apolloClient';
import { AuthProvider } from 'components/AuthProvider';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Router>
          <AppErrorBoundary>
            <Places />
          </AppErrorBoundary>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
