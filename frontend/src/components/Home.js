import React, { Component } from 'react';
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
        
    }
    componentDidUpdate(nextProps){
        
    }

    

    render(){
        
        
        return(
            <div>
                
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