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
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);   
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        events.publish('dataservice/SaveGradedTask',this.state);        
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
                                <input type='number' className='gradedTaskInput' data-idstudent='{this.state.id}'
                                data-idgradedtask={this.state.taskId} min="0" max="100" defaultValue={this.state.taskMark}
                                onChange={this.handleInputChange}/>
                            </td> 
                        </tr>
                    </tbody>
                </table>
            </td>
        );
    }
}

export default GradedTaskItemPage;
