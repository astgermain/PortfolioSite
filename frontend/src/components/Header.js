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
            <div>
                <div className="row header">
                    <div className="col-sm-4 col-md-5 headerLeft">
                        <div className="headerLeftLinks">
                            <Link to="/">
                                <span>Home</span>
                            </Link>
                            <span>Projects</span>
                            <span>About</span>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-2 center-align">
                        <ContactButtons />
                    </div>
                    <div className="col-sm-4 col-md-5 headerRight">
                    {this.state.loggedIn ? 
                        <div className="headerRightLinks">
                            <b>Hi, </b> {this.checkUsersName()}
                            <button onClick={this.onLogoutClick} className="btn btn-primary">
                                Logout
                            </button>
                        </div>
                    :
                        <div className="headerRightLinks">
                            <Link to="/register">
                                <button className="btn btn-primary">
                                    <span>Register</span>
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-primary">
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
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/">Projects</a>
                            </li>
                            <li>
                                <a href="/">About</a>
                            </li>
                            {this.state.loggedIn ? 
                                <li>
                                    <button onClick={this.onLogoutClick} className="btn btn-primary">
                                        Logout
                                    </button>
                                </li>
                            :
                            <div>
                                <li>
                                    <Link to="/login">
                                        <button onClick={this.onMobileClick} className="btn btn-primary">
                                            <span>Login</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register">
                                        <button onClick={this.onMobileClick} className="btn btn-primary">
                                            <span>Register</span>
                                        </button>
                                    </Link>
                                </li>
                            </div>
                                
                            }
                        </ul>
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