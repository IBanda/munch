import AppErrorBoundary from 'components/AppErrorBoundary';
import Home from 'pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/places" exact>
              <AppErrorBoundary>
                <Places />
              </AppErrorBoundary>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
