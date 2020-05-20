import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class ContactButtons extends Component {



    render(){
        return(
            <FontAwesomeIcon icon={faCoffee} />
        )
    }
}

export default ContactButtons;