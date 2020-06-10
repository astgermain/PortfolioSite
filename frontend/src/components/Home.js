import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions"; 
import Tada from 'react-reveal/Tada';
import Zoom from 'react-reveal/Zoom';



class Home extends Component {
    
    constructor() {
        super();
        this.state = {
            email: "",
            loggedIn: false,
            errors: {},
            data: [],
            id: 0,
            message: null,
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
            name: null,
            link: null,
            image: null,
            about: null,
        };
    }

    componentDidMount() {
        this.getDataFromDb();
        
    }
    
    componentWillUnmount() {
        
    }
    getDataFromDb = () => {
        fetch('/api/project')
            .then((data) => data.json())
            .then((res) => this.setState({ data: res.data }))
            .catch(err => this.setState({ data: [] }))
    };
    

    render(){
        let data = this.state.data
        let dl = 0
        try{
            dl = data.length
        }
        catch{
            dl = 0
        }
        return(
                <div className="home-content">
                    <Tada>
                        <h1 className="mainHeader">Hi, I'm Andrew</h1>
                    </Tada>
                        <h2 className="subHeader">I'm a professional software developer based out of the SF Bay Area</h2>
=                       <h2 className="subHeader">I am <span className="status">currently</span> looking for new opportunities!</h2>
                    
                    <Zoom delay={2500}>
                        <h2 className="subHeader2">Take a look at some of my projects</h2>
                    </Zoom>
                    <Zoom delay={2500}>
                        <div className="row">
                            {dl <= 0
                            ? 'No Projects yet'
                            //should map to state and let it rerender itself
                            : data.map((dat) => (
                                <div key={dat._id} className="col-sm-12 col-md-6 projectBoxes">
                                    <div className="card">
                                        <div className="img-container">
                                            <img src={dat.image} className="card-img-top" alt=""></img>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{dat.name}</h5>
                                            <p className="card-text">{dat.about}</p>
                                            <div className="row">
                                                <div className="col-12">
                                                    <a href={dat.link} className="btn btn-header" target="_blank" rel="noopener noreferrer">See More</a>
                                                </div>                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mobilePadding">
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