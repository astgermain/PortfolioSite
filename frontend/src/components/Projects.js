import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Jump from 'react-reveal/Jump';


class Projects extends Component {

    state = {
        opened: false,
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

    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDb();
        
    }
    
    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
        
    }
    getDataFromDb = () => {
        fetch('/api/project')
            .then((data) => data.json())
            .then((res) => this.setState({ data: res.data }))
            .catch(err => this.setState({ data: [] }))
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    handleClick() {
        this.setState({ opened: !this.state.opened});
    }
    render() {
        let data = this.state.data
        let dl = 0
        try{
            dl = data.length
        }
        catch{
            dl = 0
        }

        return (
            <Jump>
                <div className="project">
                    <h1 className="mainHeader">
                        Projects
                    </h1>
                    <h2 className="subHeader">
                        This is just a few of my projects.
                    </h2>
                    <h2 className="subHeader">
                        If there is no link to source code the project is under NDA, email me for a snippet.
                    </h2>
                    {dl <= 0
                    ? 'No Projects yet'
                    //should map to state and let it rerender itself
                    : data.map((dat) => (
                        <li key={dat._id} style={{ padding: '10px' }}>
                        <span style={{ color: 'gray' }}> name: </span> {dat.name} <br />
                        <span style={{ color: 'gray' }}> link: </span> {dat.link} <br />
                        <span style={{ color: 'gray' }}> image: </span> {dat.image} <br />
                        <span style={{ color: 'gray' }}> about: </span> {dat.about} 
                        <button onClick={() => this.deleteFromDB(dat._id)}>
                            DELETE
                        </button>
                        </li>
                    ))}
                </div>
            </Jump>
    );
  }
}
Projects.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Projects);