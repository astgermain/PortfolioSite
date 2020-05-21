import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import DBAdmin from './DBAdmin';

class Dashboard extends Component {
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
        const dbAdmin = this.state.opened ? <DBAdmin/> : ''
        const dbAdminButton = this.state.opened ? 'Close DB Admin' : 'Open DB Admin'
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b> {user.name.split(" ")[0]} 👏
                                {user.admin === true ? 
                                <div>
                                    <button className="btn btn-primary" onClick={() => this.handleClick()}>{dbAdminButton}</button>
                                    {dbAdmin}
                                </div>
                                 : 'You are not an admin for this site. Please request access if you need it. User features coming soon.'
                                }
                                
                        </h4>
                        <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        onClick={this.onLogoutClick}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                        Logout
                        </button>
                    </div>
                </div>
            </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);