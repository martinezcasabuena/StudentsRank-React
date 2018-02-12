import React from 'react';
import {events} from '../lib/eventsPubSubs.js';
import AttitudeTask from '../classes/attitudetask.js';

class PersonDetailAttitudeItemPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            atTaskId:props.attitudeTask.id,
            atTaskName:props.attitudeTask.name,            
            atTaskTimestamp:props.attitudeTask.timestamp,
            atTaskPoints: props.attitudeTask.points,
            //atTaskDescription: props.attitudeTask,            
            idStudent:props.student
        }
        console.log(AttitudeTask.getAttitudeTasksFromMap()[0]);
    }

    render() {
        return (
             <div>            
                <li className="list-group-item">
                    <a href={'#deleteXP/' + this.state.idStudent +'/' + this.state.atTaskId} >
                        <button className='btnS btn btn-danger'><i className='fa fa-trash-o fa-1x'></i></button>
                    </a> {this.state.atTaskPoints} -> {this.state.atTaskDescription} ->  {this.state.atTaskTimestamp}
                </li> 
            </div>
        );
    }
}

export default PersonDetailAttitudeItemPage;
