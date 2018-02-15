import React from 'react';
import {events} from '../lib/eventsPubSubs.js';

class PersonPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            studentId:props.props.id,            
            studentName: props.props.name,
            studentSurname: props.props.surname,
            studentAttitudeTask:props.props.attitudeTask,
            myImage:props.props.image
        }        
        this.handleInputChange = this.handleInputChange.bind(this);   
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleOnImageChange = this.handleOnImageChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value; target.type === 'file' ? target.files : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    // handleOnImageChange(event) {
    //     let input = event.target;
    //     let reader = new FileReader();
    //     reader.onload = function() {
    //       let dataURL = reader.result;
    //       let output = $('#output');
    //       output.src = dataURL;
    //     };
    //     reader.readAsDataURL(input.files[0]);
    // }

    handleSubmit(event) {
        event.preventDefault();
        let saveStudent = $('#newStudent');
        var formData = new FormData(saveStudent[0]);
        console.log(this.state);
        events.publish('dataservice/SaveStudent',{student:this.state,formData:formData});   
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
                        <input type="file" id="myProfile" name="myImage" accept="image/jpeg" onChange={this.handleInputChange}/>
                        <img id="output" />
                    </div>
                    
                    <input type="submit" className="btn btn-primary" value="Save"/>
                </form> 
            </div>
            
            
        );
    }
}

export default PersonPage;
