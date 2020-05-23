import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class RegisterModal extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillUpdate(nextProps) {
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
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history); 
    };
    

    render(){
        const { errors } = this.state;
        return(
            <div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                        <b>Register</b> below
                    </h4>
                    <p className="grey-text text-darken-1">
                        Already have an account? <Link to="/login" className="links">Log in</Link>
                    </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                        {errors.name ? 
                            <div className="alert alert-danger" role="alert">
                                {errors.name}
                            </div>
                        :
                        ""}
                        <label htmlFor="name">Name</label>
                        <input
                        onChange={this.onChange}
                        value={this.state.name}
                        error={errors.name}
                        id="name"
                        type="text"
                        className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        {errors.email ? 
                            <div className="alert alert-danger" role="alert">
                                {errors.email}
                            </div>
                        :
                        ""}
                        <label htmlFor="email">Email</label>
                        <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        {errors.password ? 
                            <div className="alert alert-danger" role="alert">
                                {errors.password}
                            </div>
                        :
                        ""}
                        <label htmlFor="password">Password</label>
                        <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        {errors.password2 ? 
                            <div className="alert alert-danger" role="alert">
                                {errors.password2}
                            </div>
                        :
                        ""}
                        <label htmlFor="password2">Confirm Password</label>
                        <input
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                        id="password2"
                        type="password"
                        className="form-control"
                        />
                    </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button className="btn btn-primary" type="submit">
                        Sign up
                        </button>
                    </div>
                </form>
                <FontAwesomeIcon icon={faCoffee} />
            </div>


            
        )
    }
}

RegisterModal.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegisterModal));