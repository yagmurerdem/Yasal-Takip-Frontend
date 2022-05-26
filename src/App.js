
import './App.css';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signin';
import Login from './Login';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import NavbarComp from './NavbarComp';


function App() {
  return (

<Container maxWidth="md">
  <div className="app">
    <Switch>
      <Route path="/" exact component={Signup}/>
      <Route path="/login" exact component={Login}/>
   
      <Route path="/navbarcomp" exact component={NavbarComp}/>
    </Switch>
  </div>
</Container>
   



  );
}

export default App;


<>
  {/* <Container maxWidth="md">
  <div className="app">
    <Switch>
      <Route path="/signup" exact component={Signup}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/deneme" exact component={deneme}/>
    </Switch>
  </div>
</Container> */}
</>



{/* <div className="App">
<Signup />
</div> */}
