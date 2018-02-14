import React from 'react';
import {events} from '../lib/eventsPubSubs.js';

class PersonDetailAttitudeItemPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            atTask:props.attitudeTask,          
            idStudent:props.idStudent
        }
    }

    render() {
        return (
             <div>            
                <li className="list-group-item">
                    <a href={'#deleteXP/' + this.state.idStudent +'/' + this.state.atTask.id} >
                        <button className='btnS btn btn-danger'><i className='fa fa-trash-o fa-1x'></i></button>
                    </a> {this.state.atTask.points} -> {this.state.atTask.description} ->  {this.state.atTask.datetime}
                </li> 
            </div>
        );
    }
}

export default PersonDetailAttitudeItemPage;
