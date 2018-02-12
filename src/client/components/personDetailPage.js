import React from 'react';
import {events} from '../lib/eventsPubSubs.js';
import PersonDetailAttitudeItemPage from './personDetailAttitudeItemPage.js';

class PersonDetailPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {                
            studentId:props.student.id,            
            studentName: props.student.name,
            studentSurname: props.student.surname,
            studentAttitudeTask:props.student.attitudeTasks,
            finalGrade:props.student.getFinalGrade()
            //studentGradedTask:props.props.gradedTask,
        }
        console.log(props);
    }

    render() { 
        const attitudeTasksItems = this.state.studentAttitudeTask.map((attitudeTask) =>
        <PersonDetailAttitudeItemPage attitudeTask={attitudeTask} student={this.state.studentId}/>
    );
        return (
            <div>
                <img src={'src/server/data/fotos/' + this.state.studentId + '.jpg'} />
                <h1>{this.state.studentName} {this.state.studentSurname} {this.state.finalGrade}</h1>
                <h3>Attitude tasks</h3>

                <ul className="list-group">
                    {attitudeTasksItems}
                </ul>

                <h3>Graded tasks</h3>
                <ul className="list-group">
                    {/* ${TPL_GRADED_TASKS} */}
                </ul>
   
            </div>  
        );
    }
}

export default PersonDetailPage;
