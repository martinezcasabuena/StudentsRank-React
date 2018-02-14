import React from 'react';
import {events} from '../lib/eventsPubSubs.js';
import PersonDetailAttitudeItemPage from './personDetailAttitudeItemPage.js';
import PersonDetailGradedItemPage from './personDetailGradedItemPage.js';

class PersonDetailPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {  
            student:props.student,              
            attitudeTask:props.attitudeTask
        }
    }
    render() {
        const attitudeTasksItems = this.state.student.attitudeTasks.reverse().map((attitudeTask) =>
        <PersonDetailAttitudeItemPage attitudeTask={this.state.attitudeTask.getAttitudeById(parseInt(attitudeTask.id))}
        idStudent={this.state.student.id}/>
        );

        const gradedTasksItems = this.state.student.getStudentMarks().map((gradedTask) =>
        <PersonDetailGradedItemPage gradedTask={gradedTask}/>
        );

        return (
            <div>
                <img src={'src/server/data/fotos/' + this.state.student.id + '.jpg'} />
                <h1>{this.state.student.name} {this.state.student.surname} {this.state.student.getFinalGrade()}</h1>
                <h3>Attitude tasks</h3>

                <ul className="list-group">
                    {attitudeTasksItems}
                </ul>

                <h3>Graded tasks</h3>
                <ul className="list-group">
                    {gradedTasksItems}
                </ul>
            </div>  
        );
    }
}

export default PersonDetailPage;
