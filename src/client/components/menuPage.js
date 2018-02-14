import React from 'react';
import {events} from '../lib/eventsPubSubs.js';

class MenuPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user: props.user
        }        
        this.handleOnChange = this.handleOnChange.bind(this);   
        
    }

    handleOnChange(event){
        if (event.target.value === 'NEW subject'){
            events.publish("settings/newSubject");
        }else{
            events.publish("settings/changeSubject",event.target.value);            
        }
    }

    render() {
        const user = this.state.user;
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-faded">             
                <a className="navbar-brand" href="#home"><h2><i className="fa fa-cubes fa-2x"></i>&nbsp;+x<strong>BRAIN</strong></h2></a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">                    
                <span className="navbar-toggler-icon"></span>
            
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul id="menuButtons" className="navbar-nav mx-auto">
                        {user.displayName ? (
                                <li className="nav-item"><a className="nav-link" href=""> {user.displayName} </a></li>
                            ) : (
                                null
                        )}
                        <li className="nav-item"><select id="subjectsItems" onChange={this.handleOnChange}>
                        {user.subjects.map((subject) => 
                            user.subject === user.defaultSubject ? (
                                <option selected value={subject} >{subject}</option>
                            ) : (
                                <option value={subject} >{subject} </option>
                            )
                        )}
                        <option value="NEW subject">NEW subject</option>
                        </select>
                        <br></br><span id="termMenu"> {user.defaultTerm} </span></li>
                        <li className="nav-item"><a className="nav-link" href="#addStudent"><button className="btn btn-secondary"> + StudentS  </button></a></li>
                        <li className="nav-item"><a className="nav-link" href="#addGradedTask"><button className="btn btn-secondary"> + Graded task</button></a></li>
                        <li className="nav-item"><a className="nav-link" href="#settings"><button className="btn btn-secondary">Settings</button></a></li>
                        <li className="nav-item"><a className="nav-link" href="#reactTest"><button className="btn btn-secondary">REACT</button></a></li>
                        {user.displayName ? (
                                <li className="nav-item"><a className="nav-link" href="#logout"><button className="btn btn-danger"> LOGOUT</button></a></li>
                            ) : (
                                null
                        )}
                    </ul>
                </div>
            </nav>


        );
    }
}

export default MenuPage;
