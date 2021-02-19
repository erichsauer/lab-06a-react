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
      <Router>
        <Switch>
          <main className="App-main">
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
          </main>
        </ Switch>
      </Router>
  );
}

export default App;
