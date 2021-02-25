import './App.css';
import DetailPage from './DetailPage'
import ListPage from './ListPage'
import NavBar from './NavBar'
import AddPage from './AddPage'
import EditPage from './EditPage'
import HomePage from './HomePage.js'
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
            <NavBar/>
            <Route 
                  path="/" 
                  exact
                  render={(routerProps) => <HomePage {...routerProps} />} 
                  />
            <Route 
                  path="/list" 
                  exact
                  render={(routerProps) => <ListPage {...routerProps} />} 
                  />
            <Route 
                  path="/list/:id" 
                  exact
                  render={(routerProps) => <DetailPage {...routerProps} />} 
                />
            <Route 
                  path="/add"
                  exact
                  render={(routerProps) => <AddPage {...routerProps} />} 
                />
            <Route 
                  path="/edit/:id"
                  exact
                  render={(routerProps) => <EditPage {...routerProps} />} 
                />
          </main>
        </ Switch>
      </Router>
  );
}

export default App;
