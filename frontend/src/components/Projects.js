import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import Jump from 'react-reveal/Jump';


class Projects extends Component {
    state = {
        opened: false
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    handleClick() {
        this.setState({ opened: !this.state.opened});
    }
    render() {
        const { user } = this.props.auth;
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
                </div>
            </Jump>
    );
  }
}
Projects.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Projects);