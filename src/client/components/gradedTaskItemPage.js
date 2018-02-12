import React from 'react';
import {events} from '../lib/eventsPubSubs.js';

class GradedTaskItemPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            taskId:props.gradedTask[0],
            taskMark:props.gradedTask[1],            
            taskName:props.gradedTask[2].name,
            taskWeight:props.gradedTask[2].weight,
            idStudent:props.student
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
                                <a className="text-info" href={'#detailGradedTask/' + this.state.taskId}>
                                {this.state.taskName} ({this.state.taskWeight}%)</a>
                            </td>
                        </tr>                
                        <tr>    
                            <td>
                                <input type='number' name="taskMark" className='gradedTaskInput' data-idstudent={this.state.idStudent}
                                data-idgradedtask={this.state.taskId} min="0" max="100" value={this.state.taskMark}
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
