import './App.css';
import React, { Component } from 'react';
import DBAdmin from './DBAdmin';

class App extends Component {
  // initialize our state
  state = {
    opened: false
  };

  handleClick() {
    this.setState({ opened: !this.state.opened});
  }

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
    const dbAdmin = this.state.opened ? <DBAdmin/> : ''
    const dbAdminButton = this.state.opened ? 'Close DB Admin' : 'Open DB Admin'
    return (
      <div>
        <button className="btn btn-primary" onClick={() => this.handleClick()}>{dbAdminButton}</button>
        {dbAdmin}
      </div>
    );
  }
}

export default App;
