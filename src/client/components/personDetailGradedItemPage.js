import React from 'react';
import {events} from '../lib/eventsPubSubs.js';
import {formatDate} from '../lib/utils.js';


class PersonDetailGradedItemPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            gtTaskId:props.gradedTask[0],
            gtTaskName:props.gradedTask[2].name,
            gtDateTime:props.gradedTask[2].datetime,
            gtTaskPoints: props.gradedTask[1]
        }
    }

    render() {
        return (
             <div>            
                <li className="list-group-item">                 
                    {this.state.gtTaskPoints + '->' +
                        this.state.gtTaskName + '->' + formatDate(new Date(this.state.gtDateTime))
                    }
                </li> 
            </div>
        );
    }
}

export default PersonDetailGradedItemPage;
