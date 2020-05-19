// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import DBAdmin from './components/DBAdmin';

class App extends Component {
  // initialize our state
  state = {
    
  };

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
      <div>
        <DBAdmin />
      </div>
    );
  }
}

export default App;
