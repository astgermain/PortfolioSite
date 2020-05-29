import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import DBAdmin from './DBAdmin';
import Slide from 'react-reveal/Slide';
import openSocket from 'socket.io-client';
const socket = openSocket('https://localhost:8000');
class Dashboard extends Component {
    state = {
        opened: false
    };
    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.sendSocketIO = this.sendSocketIO.bind(this)
        }
    }

    sendSocketIO() {
        socket.emit('example_message', 'demo')
    }

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
            <Slide left>
                <div>
                    <button onClick={this.sendSocketIO}>Send Socket.io</button>
                </div>
                <div className="container dashboard">
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
                        </div>
                    </div>
                </div>
            </Slide>
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