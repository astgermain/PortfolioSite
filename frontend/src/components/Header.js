import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";
import ContactButtons from './ContactButtons'

class Header extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            loggedIn: false,
            errors: {},
            mobileMenuState: ""
        };
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated) {
            this.setState({loggedIn: true});
        }
    }
    componentWillUpdate(nextProps){
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
        if(this.state.mobileMenuState === " act") return this.setState({mobileMenuState: ""})
    };

    onMobileClick = () => {
        if(this.state.mobileMenuState === " act") return this.setState({mobileMenuState: ""})
        return this.setState({mobileMenuState: " act"})
    };

    

    render(){
        return(
            <div className="container-fluid">
                <div className="row header">
                    <div className="col-sm-4 col-md-5 headerLeft">
                        <div className="headerLeftLinks">
                            <Link to="/">
                                <button className="btn btn-header">
                                    Home
                                </button>
                            </Link>
                            <Link to="/">
                                <button className="btn btn-header">
                                    Projects
                                </button>
                            </Link>
                            <Link to="/">
                                <button className="btn btn-header">
                                    About
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-2 center-align">
                        <ContactButtons />
                    </div>
                    <div className="col-sm-4 col-md-5 headerRight">
                    {this.state.loggedIn ? 
                        <div className="headerRightLinks">
                            <Link to="/dashboard">
                                <button className="btn btn-header">
                                    <span>Dashboard</span>
                                </button>
                            </Link>
                            <button onClick={this.onLogoutClick} className="btn btn-header">
                                Logout
                            </button>
                        </div>
                    :
                        <div className="headerRightLinks">
                            <Link to="/register">
                                <button className="btn btn-header">
                                    <span>Register</span>
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-header">
                                    <span>Login</span>
                                </button>
                            </Link>
                        </div>
                    }
                    </div>
                </div>
                <div className="row mobileHeader">
                    <button className={"menuBtn" + this.state.mobileMenuState} onClick={this.onMobileClick.bind(this)}><span className="lines"></span></button>				
                    <nav className={"mainMenu" + this.state.mobileMenuState}>
                        {this.state.loggedIn ? 
                        <ul>
                            <li>
                                <Link to="/">
                                    <button href="/" className="btn btn-header">Home</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <button href="/" className="btn btn-header">Projects</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <button href="/" className="btn btn-header">About</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard">
                                    <button onClick={this.onMobileClick} className="btn btn-header">
                                        Dashboard
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <button onClick={this.onLogoutClick} className="btn btn-header">
                                    Logout
                                </button>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <Link to="/">
                                    <button href="/" className="btn btn-header">Home</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <button href="/" className="btn btn-header">Projects</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <button href="/" className="btn btn-header">About</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    <button onClick={this.onMobileClick} className="btn btn-header">
                                        <span>Login</span>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/register">
                                    <button onClick={this.onMobileClick} className="btn btn-header">
                                        <span>Register</span>
                                    </button>
                                </Link>
                            </li>
                        </ul>
                                
                        }
                        
                    </nav>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps,{ logoutUser })(Header);