import React from 'react';
import {events} from '../lib/eventsPubSubs.js';
import RankingListItemPage from './rankingListItemPage.js';
import {setCookie} from '../lib/utils.js';

class RankingListPage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {                
                students:props.students,
                gtWeight:props.gtWeight,
                xpWeight:props.xpWeight,
                gradedTasks:props.gradedTasks
        };
        
       /* events.subscribe('students/change',(obj)=> {
            this.setState({
                students:obj
            })
        })*/
        
        /*this.handleInputChange = this.handleInputChange.bind(this);   
        this.handleSubmit = this.handleSubmit.bind(this);      */
        this.handleClick = this.handleClick.bind(this);
        
    }

    handleClick(event){
        const target = event.target;
        console.log(target);
        $('.tableGradedTasks').toggle();
    
        if ($('.tableGradedTasks').is(':visible')) {
            setCookie('expandedView','visible',345);
            $('.fa-hand-o-right').addClass('fa-hand-o-down').removeClass('fa-hand-o-right');
        }else {
            setCookie('expandedView','hidden',345);
            $('.fa-hand-o-down').addClass('fa-hand-o-right').removeClass('fa-hand-o-down');
        }
    }

    /*handleInputChange(event) {
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
    }*/

    render() {
        //console.log(this.state.gradedTasks);
        let cont =1;
        const studentsItems = this.state.students.map((student) =>
            <RankingListItemPage key={student[0]} index={cont++} student={student}
            gradedTasks={this.state.gradedTasks} />            
        );
        return (
            <table className="table table-striped table-condensed">
            <thead className="thead-dark">
            <tr>
                <th><button id="more_gt" onClick={this.handleClick}><i className="fa fa-hand-o-right fa-1x"></i></button></th>
                <th>The harder you work, the luckier you get</th>    
                <th>FG 100% = XP {this.state.xpWeight}% + GT {this.state.gtWeight}%</th>
            </tr>
            </thead>
            <tbody id="idTableRankingBody">
                {studentsItems}               
            </tbody>

            </table>
        );
    }
}

export default RankingListPage;
