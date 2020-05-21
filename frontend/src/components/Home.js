import React, { Component } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";




class Home extends Component {
    

    render(){
        
        return(
            <div>
                <div style={{ height: "75vh" }} className="container valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <div className="col s6">
                                <Link to="/register">
                                    <button>
                                        <span>Register</span>
                                    </button>
                                </Link>
                            </div>
                            <div className="col s6">
                                <Link to="/login">
                                    <button>
                                        <span>Login</span>
                                    </button>
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