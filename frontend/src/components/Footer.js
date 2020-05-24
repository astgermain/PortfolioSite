import React, { Component } from 'react'

class Footer extends Component {

    constructor() {
        super();
        this.state = {
            
        };
    }

    

    

    

    render(){
        return(
            <div className="row footer">
                <div className="col-4">
                &copy; 2020 Andrew St Germain. All Rights Reserved.   
                </div>
                <div className="col-4">
                E-Mail: <a href="mailto:astgermain@mail.sfsu.edu">astgermain@mail.sfsu.edu</a>
                </div>
                <div className="col-4">
                Phone: +1-310-696-9341  
                </div>
            </div>
        )
    }
}


export default Footer;