import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage.jsx"
import Home from "./components/Home"
import DogsCreate from './components/DogsCreate';
import Detail from './components/Detail';


function App() {
  return (
   <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= "/" component={LandingPage}/>
        <Route exact path= "/home" component={Home}/>
        <Route exact path= "/dogs" component={DogsCreate}/>
        <Route exact path= "/dogDetail/:id" component={Detail}/>
      </Switch>
      
    </div>
   </BrowserRouter>
  );
}

export default App;
