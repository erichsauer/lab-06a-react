import './App.css';
import Detail from './Detail'
import List from './List'
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <header className="App-header">
          <Route 
                path="/" 
                exact
                render={(routerProps) => <List {...routerProps} />} 
              />
          <Route 
                path="/:id" 
                exact
                render={(routerProps) => <Detail {...routerProps} />} 
              />
      </header>
      </ Switch>
      </Router>
    </div>
  );
}

export default App;
