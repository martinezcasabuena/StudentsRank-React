import React from 'react';
import {events} from '../lib/eventsPubSubs.js';

class MenuPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user: props.user,
            settings: props.settings
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        console.log(this.state.user);
    }

    handleOnChange(event){
        if (event.target.value === 'NEW subject'){
            events.publish("settings/newSubject");
        }else{
            events.publish("settings/changeSubject",event.target.value);
            console.log(event.target.value);     
        }
    }

    render() {
        const user = this.state.user;
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-faded">             
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul id="menuButtons" className="navbar-nav mx-auto">
                        {user.displayName ? (
                                <li className="nav-item"><a className="nav-link" href=""> {user.displayName} </a></li>
                            ) : (
                                null
                        )}
                        <li className="nav-item"><select id="subjectsItems" onChange={this.handleOnChange}>
                        {user.subjects.map((subject) => 
                            subject === user.defaultSubject ? (
                                <option key={subject[0]} selected value={subject} >{subject}</option>
                            ) : (
                                <option key={subject[0]} value={subject} >{subject} </option>
                            )
                        )}
                        <option value="NEW subject">NEW subject</option>
                        </select>

                        <br></br><span id="termMenu"> {this.state.settings.defaultTerm} </span></li>
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
