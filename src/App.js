import React, { useEffect, useState } from 'react';
import Navbar from './components/navigation/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import RatingsPage from './pages/RatingsPage'
import DashboardPage from './pages/DashboardPage'
import FriendsPage from './pages/FriendsPage'
import ProfilePage from './pages/ProfilePage'
import WatchListPage from './pages/WatchListPage'
import SignIn from './pages/auth/components/SignIn'
import SignUp from './pages/auth/components/SignUp';
import {AuthProvider, useAuth} from './pages/auth/contexts/AuthContext.js';
import PrivateRoute from './pages/auth/components/PrivateRoute';
import SetProfile from './pages/auth/components/SetProfile';
import ForgotPassword from './pages/auth/components/ForgotPassword';
import Footer from './components/navigation/Footer';
import Support from './pages/SupportPage';
import TermsAndConditions from './pages/TermsAndConditionsPage';
import About from './pages/AboutMePage';
import Contact from './pages/ContactPage';

// App component which runs the whole application
function App() {
  
  // const {currentUser} = useAuth()

  // // logged in status
  // const [loggedIn, setLoggedIn] = useState(false)
  
  // // check for inactivity and log out
  // const checkForInactivity = () => {

  //   // Get expiretime from local storage
  //   const expireTime = localStorage.getItem('expireTime')

  //   // if no user, keep expiretime at 0
  //   if(currentUser) {
  //     setLoggedIn(true)
  //   }

  //   // If expire time is earlier than current time, log out
  //   if (expireTime < Date.now() && loggedIn) {
  //     signout()
  //     setLoggedIn(false)
  //   }
  // }

  // // function to update expire time
  // const updateExpireTime = () => {
    
  //   // set expire time to 10 seconds of inactivity, from current time
  //   const timer = Date.now() + 10000

  //   // set expire time in local storage
  //   localStorage.setItem('expireTime', timer)
  // }

  // // use effect to set interval to check for inactivity
  // useEffect(() => {

  
  //   // check for inactivity every 1 seconds
  //   const interval = setInterval(() => {
  //     checkForInactivity()
  //   }, 1000) 

  //   // clear interval on unmount
  //   return () => clearInterval(interval)
  // }, [])

  // // reset expire time on user activity
  // useEffect(() => {
    
  //   // set initial expire time
  //   updateExpireTime()

  //   // add event listeners to reset inactivity timer
  //   window.addEventListener("click", updateExpireTime)
  //   window.addEventListener("keypress", updateExpireTime)
  //   window.addEventListener("scroll", updateExpireTime)
  //   window.addEventListener("mousemove", updateExpireTime)

  //   // event listeners must be removed to add new ones
  //   window.removeEventListener("click", updateExpireTime)
  //   window.removeEventListener("keypress", updateExpireTime)
  //   window.removeEventListener("scroll", updateExpireTime)
  //   window.removeEventListener("mousemove", updateExpireTime)
  // }, [])
  

  // Returns the app component which handles the routing of the application
  return (
    <>
        <Router>
          <AuthProvider> 
          <Navbar/>
          <Routes>
            <Route exact path='/'  element={<LandingPage/>} />
            <Route path='/friends'  element={<PrivateRoute><FriendsPage/></PrivateRoute>}/>
            <Route path='/profile' element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
            <Route path='/watchlist' element={<PrivateRoute><WatchListPage/></PrivateRoute>}/>
            <Route path='/dashboard' element={<PrivateRoute><DashboardPage/></PrivateRoute>}/>
            <Route path='/ratings' element={<PrivateRoute><RatingsPage/></PrivateRoute>}/>
            {/* <Route path='/friends'  element={<FriendsPage/>}/> */}
            {/* <Route path='/profile' element={<ProfilePage/>}/> */}
            {/* <Route path='/watchlist' element={<WatchListPage/>}/> */}
            {/* <Route path='/dashboard' element={<DashboardPage/>}/> */}
            {/* <Route path='/ratings' element={<RatingsPage/>}/> */}
            <Route path='/support' element={<Support/>}/>
            <Route path='/terms-and-conditions' element={<TermsAndConditions/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/set-profile' element={<PrivateRoute><SetProfile/></PrivateRoute>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
          </Routes>
          </AuthProvider>
          <Footer/>
        </Router>
    </>      
  );
}

export default App;