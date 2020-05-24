import React, { Component } from 'react'
import ContactButtons from './ContactButtons'

class Header extends Component {
    

    render(){
        
        return(
            <div>
                <div className="row">
                    <div className="col s12 center-align">
                        <ContactButtons />
                        <div className="col s6">
                            <a href="/" className="links">Home</a>
                        </div>
                        <div className="col s6">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;