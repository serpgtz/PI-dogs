import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage.jsx"
import Home from "./components/Home"
import DogsCreate from './components/DogsCreate';


function App() {
  return (
   <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= "/" component={LandingPage}/>
        <Route exact path= "/home" component={Home}/>
        <Route exact path= "/dogs" component={DogsCreate}/>
      </Switch>
      
    </div>
   </BrowserRouter>
  );
}

export default App;
