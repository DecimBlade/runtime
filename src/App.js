import React from 'react';
//import database from './firebase';
// import LandingPage from './components/LandingPage';
// import Dashboard from './features/dashboard/dashboard';
// import Watchlists from './components/Watchlists';
// import Friends from './features';
// import Profile from './components/Profile';
import { Route } from 'react-router-dom';
import { NavBar } from './components';
// import { render } from '@testing-library/react';
// import SignUp from './components/SignUp';

import './index.css';



function App() {
  return ( // Comment out the pages you want to test
    // SignUp() // Signup Page where users can sign up
    // LandingPage()
    <NavBar />
    // <div>
    //         <h1>Hello</h1>
    // {/* Landing Page where users can sign in */}
    // <Route name='LandingPage' exact path="/" component={LandingPage}></Route>
    // <Route name='Dashboard' exact path="/dashboard" component={Dashboard}></Route>
    // <Route name='Watchlists' exact path="/watchlists" component={Watchlists}></Route>
    // <Route name='Friends' exact path="/friends" component={Friends}></Route>
    // <Route name='Profile' exact path="/profile" component={Profile}></Route>
    // </div>
  );
};
export default App;