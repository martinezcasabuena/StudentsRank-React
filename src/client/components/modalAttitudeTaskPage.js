import React from 'react';
import {events} from '../lib/eventsPubSubs.js';

class ModalAttitudeTaskPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            student:props.student,
            attitudeTasks:props.attitudeTasks
            /*taskForm:{
                taskPoints:20,
                taskDescription:''
            }*/ 
        }
        this.handleInputChange = this.handleInputChange.bind(this);   
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
        //events.publish('attitudeTask/addNewXPTask',({student:this.state.student,taskForm:this.state.taskForm}));           
        events.publish('attitudeTask/addNewXPTask',({student:this.state.student}));   
    }

    handleClick(event) {
        const target = event.target;
        //console.log(target.getAttribute('data-idat'));
        //$('#XPModal').modal('toggle');
         events.publish('attitudeTask/addXPtoStudent',({student:this.state.student,idTask:target.getAttribute('data-idat')}));

    }

    render() {
        let attitudeTasks = this.state.attitudeTasks.sort(function(a,b) {
            return (b[1].hits - a[1].hits);
          });
    
        return (
            
            // <div className="modal fade" id="XPModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div id="XPModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">            
               <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">XP to {this.state.student.surname} ,{this.state.student.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        {attitudeTasks.map((attitudeTask) => 
                                            <div>
                                                <button className={"xp btn btn-"+ attitudeTask[1].type} 
                                                data-idat={attitudeTask[1].id} value={attitudeTask[1].points}
                                                onClick={this.handleClick}>
                                                {attitudeTask[1].points} {attitudeTask[1].description}
                                                </button>
                                            </div>
                                        )}
                                    </div>          
                                </div>
                            </div>   
                        </div>
                        <div className="modal-footer">
                            <form id="newAttitudeTask" className="form-inline" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="points">Points: </label>
                                    <input type="text" name="points" id="points" size="3" defaultValue="20"
                                    className="text ui-widget-content ui-corner-all" onChange={this.handleInputChange} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="text">Text:</label>
                                    <input type="text" name="text" id="description" defaultValue="" 
                                    className="text ui-widget-content ui-corner-all" onChange={this.handleInputChange} required/>
                                </div>
                                <input type="submit" value="New XP task" />                  
                            </form>
                        <button type="button" className="btn btn-secondary" id="closeModal" data-dismiss="modal">Close</button>          
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalAttitudeTaskPage;
