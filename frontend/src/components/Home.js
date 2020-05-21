import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Link } from "react-router-dom";
import DBAdmin from './DBAdmin';
import { createStore } from 'redux'

function counter(state = 0, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }
  
let store = createStore(counter)
  
store.subscribe(() => console.log(store.getState()))

class Home extends Component {
    state = {
        opened: false
    };
    
    handleClick() {
        this.setState({ opened: !this.state.opened});
        store.dispatch({ type: 'INCREMENT' })
    }

    render(){
        const dbAdmin = this.state.opened ? <DBAdmin/> : ''
        const dbAdminButton = this.state.opened ? 'Close DB Admin' : 'Open DB Admin'
        return(
            <div>
                
                <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
            </div>
        )
    }
}

export default Home;