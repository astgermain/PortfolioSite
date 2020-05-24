import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/Dashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}


class App extends Component {
  // initialize our state
  

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
  
  }

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  

  render() {
    
    return (
      <Provider store={store}>
        <Router>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={RegisterModal} />
            <Route exact path="/login" component={LoginModal} />
            <Route exact path="/about" component={About} />
            <Route exact path="/projects" component={Projects} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Footer />
        </Router>
      </Provider>
      
    );
  }
}

export default App;
