import Home from 'pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Places from './pages/Places';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/places" exact>
          <Places />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
