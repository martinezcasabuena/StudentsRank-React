import React from 'react';
import {events} from '../lib/eventsPubSubs.js';

class RankingListItemPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
                id:props.student.id,
                name: props.student.name,
                surnames: props.student.surnames,
                fg:props.student.fg,
                xp:props.student.xp,
                gt:props.student.gt       
        }        
        
        this.handleInputChange = this.handleInputChange.bind(this);   
        //this.handleSubmit = this.handleSubmit.bind(this);

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
            <div>
                <table className="table table-striped table-condensed">
                    <thead className="thead-dark">
                        <tr>
                            <th><a style={{float:'left'}} href="#expandedView"><button id="more_gt"><i className="fa fa-hand-o-right fa-1x"></i></button></a></th>
                            <th>The harder you work, the luckier you get</th>    
                            <th>FG 100% = XP 50% + GT 50%</th>
                        </tr>
                    </thead>
                    <tbody id="idTableRankingBody">
                        <tr className="js-rowStudent">
                            <td className="w-5" id="sorting"><h3>1</h3></td>
                            <td className="w-35">
                                <img className="profile" src="src/server/data/fotos/-569543398.jpg" height="60" width="48"/>
                                <a className="text-info" href='#student/{this.state.id}'>{this.state.surnames}, {this.state.name}</a>
                            </td>
                            <td className="w-60">
                                <table id="scoreTable" className="table-condensed" width="100%">
                                    <tbody>
                                        <tr>
                                            <td className="w-20">        
                                                <strong>{this.state.fg}</strong>
                                            </td>
                                            <td className="w-20">
                                                {this.state.xp}
                                            </td>
                                            <td className="w-20">
                                                {this.state.gt}
                                            </td>
                                            <td className="w-40 text-right">
                                                <a href='#addXP/{this.state.id}'><button className="btnS btn btn-primary">+XP</button></a>

                                                <a href='#editStudent/{this.state.id}'>
                                            <button className='btnS btn btn-success'><i className='fa fa-pencil fa-1x'></i></button></a>
                                        
                                            <a href='#deleteStudent/{this.state.id}'>
                                            <button className='btnS btn btn-danger'><i className='fa fa-trash-o fa-1x'></i></button></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>  
                                <table className="tableGradedTasks">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <a className="text-info" href="#detailGradedTask/1"> Tasca 1 20%)</a>
                                            </td>
                                        </tr>                
                                        <tr>    
                                            <td>
                                                <input type='number' className='gradedTaskInput' data-idstudent='{this.state.id}'
                                                data-idgradedtask='1' min="0" max="100" value='1'
                                                onChange={this.handleInputChange}/>
                                            </td> 
                                        </tr>
                                    </tbody>
                                </table>  
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            
        );
    }
}

export default RankingListItemPage;
