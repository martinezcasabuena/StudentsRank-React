import React from 'react';
import {events} from '../lib/eventsPubSubs.js';
import GradedTaskItemPage from './gradedTaskItemPage.js';

class RankingListItemPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            student:props.student[1],
            index:props.index,
            gradedTasks:props.student[1].getStudentMarks()
        }

        this.handleMouseHover = this.handleMouseHover.bind(this);
    }

    handleMouseHover(event){
        $('.profile').each(function(index) {
            $(this).mouseenter(function() { //TEST
              $(this).removeAttr('width'); //TEST
              $(this).removeAttr('height'); //TEST
            });
            $(this).mouseout(function() { //TEST
              $(this).attr('width',48); //TEST
              $(this).attr('height',60); //TEST
            });
        });
    }

    render() {
        //const gradedTaskItems = this.state.gradedTasks.reverse().map((gradedTask) =>
        const gradedTaskItems = this.state.gradedTasks.map((gradedTask) =>
        <GradedTaskItemPage key={gradedTask[0]} gradedTask={gradedTask} student={this.state.student} />            
        );
        return (
            <tr className="js-rowStudent">
            <td className="w-5" id="sorting"><h3>{this.state.index}</h3></td>
            <td className="w-35">
                    <img className="profile" src={"src/server/data/fotos/" + this.state.student.id + '.jpg'} height="60" width="48" onMouseOver={this.handleMouseHover}/>
                    <a className="text-info" href={'#student/' + this.state.student.id}>{this.state.student.surname}, {this.state.student.name}</a>
                </td>
                <td className="w-60">
                    <table id="scoreTable" className="table-condensed" width="100%">
                        <tbody>
                            <tr>
                                <td className="w-20">        
                                    <strong>{this.state.student.getFinalGrade()}</strong>
                                </td>
                                <td className="w-20">
                                    {this.state.student.getXPtotalPoints()}
                                </td>
                                <td className="w-20">
                                    {this.state.student.getGTtotalPoints()}
                                </td>
                                <td className="w-40 text-right">
                                <a href={'#addXP/'+this.state.student.id}><button className="btnS btn btn-primary">+XP</button></a>
                                
                                <a href={'#editStudent/'+this.state.student.id}>
                                <button className='btnS btn btn-success'><i className='fa fa-pencil fa-1x'></i></button></a>
                            
                                <a href={'#deleteStudent/'+this.state.student.id}>
                                <button className='btnS btn btn-danger'><i className='fa fa-trash-o fa-1x'></i></button></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="tableGradedTasks">
                        <tbody>
                            <tr>
                            {gradedTaskItems}
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        );
    }
}

export default RankingListItemPage;
