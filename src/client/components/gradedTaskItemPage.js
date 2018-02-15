import React from 'react';
import {events} from '../lib/eventsPubSubs.js';

class GradedTaskItemPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            student:props.student,
            gtTask:props.gradedTask[1],
            taskMark:props.gradedTask[1].points
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputOnBlur = this.handleInputOnBlur.bind(this);   
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleInputOnBlur(event){
        events.publish('student/changeStudentMark',this.state);
    }

    render() {
        return (
            <td>
                <table className="tableGradedTasks">
                    <tbody>
                        <tr>
                            <td>
                                <a className="text-info" href={'#detailGradedTask/' + this.state.gtTask.id}>
                                {this.state.gtTask.name} ({this.state.gtTask.weight}%)</a>
                            </td>
                        </tr>                
                        <tr>    
                            <td>
                                <input type='number' name="taskMark" className='gradedTaskInput' data-idstudent={this.state.student.id}
                                data-idgradedtask={this.state.gtTask.id} min="0" max="100" value={this.state.taskMark}
                                onChange={this.handleInputChange} onBlur={this.handleInputOnBlur} />
                            </td> 
                        </tr>
                    </tbody>
                </table>
            </td>
        );
    }
}

export default GradedTaskItemPage;
