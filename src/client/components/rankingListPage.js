import React from 'react';
import {events} from '../lib/eventsPubSubs.js';
import RankingListItemPage from './rankingListItemPage.js';
import {setCookie, getCookie} from '../lib/utils.js';

class RankingListPage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
                students:props.students,
                gtWeight:props.gtWeight,
                xpWeight:props.xpWeight,
                gradedTasks:props.gradedTasks
        };

        this.handleClick = this.handleClick.bind(this);
        // events.subscribe('students/changeStudentMark',(obj)=> {
        //     console.log(obj);
        //     this.setState({
        //         //students:obj.student
        //    })
        // })
    }

    handleClick(event){
        const target = event.target;
        $('.tableGradedTasks').toggle();
        if ($('.tableGradedTasks').is(':visible')) {
            setCookie('expandedView','visible',345);
            $('.fa-hand-o-right').addClass('fa-hand-o-down').removeClass('fa-hand-o-right');
        }else {
            setCookie('expandedView','hidden',345);
            $('.fa-hand-o-down').addClass('fa-hand-o-right').removeClass('fa-hand-o-down');
        }
    }

    componentDidMount() {
        if (getCookie('expandedView') === 'visible') {
            $('.tableGradedTasks').show();
            $('.fa-hand-o-right').addClass('fa-hand-o-down').removeClass('fa-hand-o-right');
        }else {
            $('.tableGradedTasks').hide();
            $('.fa-hand-o-down').addClass('fa-hand-o-right').removeClass('fa-hand-o-down');
          }        
      }

    componentWillUpdate(){
        console.log("UPDATE");
        this.sortStudents();
    }

    sortStudents(){
        if (getCookie('expandedView') !== 'visible') {
            this.state.students.sort(function(a,b) {
                return (b[1].getFinalGrade() - a[1].getFinalGrade());
            }); 
        }
    }

    render() {
        console.log("RENDER");
        this.sortStudents();

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
