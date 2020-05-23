import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'


class LoginModal extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    componentWillUpdate(nextProps){
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if(nextProps.errors !== this.props.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };
    

    render(){
        const { errors } = this.state;
        const alertItems = Object.entries(errors).map(([key, value]) => {
            if(value != null){
              return(
                <div key={key} className="alert alert-danger" role="alert">
                    {value}
                </div>
              )
            }
            return null
        })
        //const passwordIcon = <FontAwesomeIcon icon={faCoffee} />
        return(
            <div className="container-fluid">
                <div className="loginForm">
                    <div className="row justify-content-md-center">
                        <div className="col-md-auto">
                            <h4>
                                <b>Login</b> 
                            </h4>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-auto">
                            <p className="grey-text text-darken-1">
                                Don't have an account? <Link to="/register" className="links">Register</Link>
                            </p>
                        </div>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group">
                            {errors.email || errors.emailnotfound || errors.password || errors.passwordincorrect ? 
                                <div>
                                    {alertItems}
                                </div>
                            :
                            ""}
                            <div className="row">
                                <div className="col">
                                    <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    />
                                    {this.state.email === "" ? 
                                        <div className="selectedInput">Email</div>
                                    :
                                        <div className="hasInput">Email</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    />
                                    {this.state.password === "" ? 
                                        <div className="selectedInput">Password</div>
                                    :
                                        <div className="hasInput">Password</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-md-center">
                            <button className="btn-block btn-primary" type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

LoginModal.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(LoginModal);