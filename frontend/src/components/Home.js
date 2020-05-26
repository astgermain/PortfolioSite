import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions"; 
import Tada from 'react-reveal/Tada';
import Zoom from 'react-reveal/Zoom';
import { Link } from "react-router-dom";



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
                <div className="home-content">
                    <Zoom delay={7000}>
                    <h2 className="subHeader3">^</h2>
                        <h2 className="subHeader3">You can find my Github, LinkedIn, Resume, and Email above</h2>
                    </Zoom>
                    <Tada>
                        <h1 className="mainHeader">Hi, I'm Andrew</h1>
                    </Tada>
                    <Zoom delay={1000}>
                        <h2 className="subHeader">I'm a professional software developer based out of the SF Bay Area</h2>
                    </Zoom>
                    <Zoom delay={3000}>
                        <h2 className="subHeader">I am <span className="status">currently</span> looking for new opportunities!</h2>
                    </Zoom>
                    <Zoom delay={4500}>
                        <h2 className="subHeader2">Take a look at some of my projects</h2>
                    </Zoom>
                    <Zoom delay={4500}>
                        <Link to="/projects">
                            <button className="btn btn-home">
                                View Projects
                            </button>
                        </Link>
                        <div>
                        <a href="https://github.com/astgermain/andrewstgermainresume/blob/master/AndrewStGermainResume_10_4.pdf" target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-home2">Resume</button>
                        </a>
                        </div>
                        <div>
                        <a href="https://github.com/astgermain" target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-home2">GitHub</button>
                        </a>
                        </div>
                        <div>
                        <a href="https://www.linkedin.com/in/astger/" target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-home2">LinkedIn</button>
                        </a>
                        </div>
                    </Zoom>
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