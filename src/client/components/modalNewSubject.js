import React from 'react';
import {events} from '../lib/eventsPubSubs.js';

class ModalNewSubject extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            groups:props.groups
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
        events.publish('settings/saveNewSubject',this.state);
    }

    render() {
        const sharedGroups = this.state.groups;
        return (
            <div className="modal fade" id="SubjectModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add new subject</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">       
                                <form id="newSubject" className="form-inline" onSubmit={this.handleSubmit}> 
                                    <div className="form-group">
                                        <label htmlFor="text">Subject name:</label>
                                        <input type="text" name="subjectName" id="subjectName" defaultValue=""  onChange={this.handleInputChange} className="text ui-widget-content ui-corner-all" required/>
                                    </div>
                                    <input type="submit" value="New Subject" id="newSubjectInput" />
                                    At the moment of subject creation you are able if you want to reuse students created by other people make your choice:
                                    <select name="sharedGroups" id="sharedGroups" onChange={this.handleInputChange}>
                                        <option selected value=""></option>
                                        {sharedGroups.map((group) => 
                                            <option value={group.defaultSubject}> {group.defaultSubject}  -  {group.hits} students</option>
                                        )}
                                    </select>
                                </form>     
                            </div>                        
                        </div>
                        </div>   
                    </div>
                    <div className="modal-footer">                         
                        <button type="button" className="btn btn-secondary" id="closeModal" data-dismiss="modal">Close</button>          
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalNewSubject;
