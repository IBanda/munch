import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Places from './pages/Places';

function App() {
  return (
    <Router>
      <Places />
    </Router>
  );
}

export default App;
