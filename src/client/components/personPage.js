import React from 'react';
import {events} from '../lib/eventsPubSubs.js';
import { loadTemplate } from '../lib/utils';

class PersonPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            studentId:props.props.id,            
            studentName: props.props.name,
            studentSurname: props.props.surname,
            studentAttitudeTask:props.props.attitudeTask,
            studentImage:props.props.image
        }        
        console.log(this.state.studentName);
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
        //console.log(this.state);
        events.publish('dataservice/SaveStudent',this.state);   
        //alert("STOP");

        //formData.append('idStudent',id);
        //loadTemplate('api/uploadImage')
    }

    render() {
        return (
            <div>
                <h3>Add new Student</h3>
                <form id="newStudent" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstname">First name:</label>
                        <input type="text"  className="form-control" id="idFirstName" name="studentName" defaultValue={this.state.studentName} onChange={this.handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="surnames">Surnames:</label>
                        <input type="text"  className="form-control" id="idSurnames" name="studentSurname" defaultValue={this.state.studentSurname} onChange={this.handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="myImage">Profile image</label>
                        <input type="file" id="myProfile" name="studentImage" accept="image/jpeg" onChange={this.handleInputChange}/>
                        <img id="output" />
                    </div>
                    
                    <input type="submit" className="btn btn-primary" value="Save"/>
                </form> 
            </div>
            
            
        );
    }
}

export default PersonPage;
