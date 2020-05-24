import React, { Component } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";



class Home extends Component {
    
    constructor() {
        super();
        this.state = {
            email: "",
            loggedIn: false,
            errors: {}
        };
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated) {
            this.setState({loggedIn: true});
        }
    }
    componentDidUpdate(nextProps){
        if(nextProps.auth.isAuthenticated && !(this.state.loggedIn)) {
            this.setState({loggedIn: true});
        }
        else if(!(nextProps.auth.isAuthenticated) && (this.state.loggedIn)) {
            this.setState({loggedIn: false});
        }
        if(nextProps.errors !== this.props.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    checkUsersName = () => {
        const { user } = this.props.auth;
        try{
            let uName = user.name.split(" ")[0]
            return uName
        }
        catch{
            return ""
        }
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.setState({loggedIn: false});
    };

    render(){
        
        
        return(
            <div>
                <div style={{ height: "75vh" }} className="container valign-wrapper">
                    {this.state.loggedIn ? 

                    <div>
                        <div><b>Hi, </b> {this.checkUsersName()}</div>
                        <button onClick={this.onLogoutClick} className="btn btn-primary">
                            Logout
                        </button>
                    </div>
                        
                    :
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
                    }
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps,{ logoutUser })(Home);