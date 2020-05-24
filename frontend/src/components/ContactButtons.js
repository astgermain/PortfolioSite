import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons'

class ContactButtons extends Component {

    componentDidMount = () => {
        setTimeout(function(){
            document.getElementById("preload1").className="linkedInButton";
            document.getElementById("preload2").className="githubButton";
            document.getElementById("preload3").className="emailContactButton";
            document.getElementById("preload4").className="resumeButton";
        },510);
    }

    render(){
        return(
            <div className="contactCenter">
                <div className="row">
                    <div className="col-6 colHoverEffectHelp">
                        <div className="linkedInButtonPre" id="preload1">
                            <FontAwesomeIcon icon={faLinkedin} className="linkedInIcon"/>
                            <span className="linkedInLabel">LinkedIn</span>
                        </div>
                    </div>
                    <div className="col-6 colHoverEffectHelp">
                        <div className="githubButtonPre" id="preload2">
                            <FontAwesomeIcon icon={faGithubSquare} className="githubIcon"/>
                            <span className="githubLabel">GitHub</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 colHoverEffectHelp">
                        <div className="emailContactButtonPre" id="preload3">
                            <FontAwesomeIcon icon={faEnvelope} className="emailContactIcon"/>
                            <span className="emailContactLabel">Email</span>
                        </div>
                    </div>
                    <div className="col-6 colHoverEffectHelp">
                        <div className="resumeButtonPre" id="preload4">
                            <FontAwesomeIcon icon={faFileAlt} className="resumeIcon"/>
                            <span className="resumeLabel">Resume</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactButtons;