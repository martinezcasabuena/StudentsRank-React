import React from 'react';
import {events} from '../lib/eventsPubSubs.js';

class PersonDetailGradedItemPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            gtTask:props.gradedTask[1]
        }
    }

    render() {
        return (
             <div>            
                <li className="list-group-item">                 
                    {this.state.gtTask.points + '->' +
                        this.state.gtTask.name + '->' + this.state.gtTask.datetime
                    }
                </li> 
            </div>
        );
    }
}

export default PersonDetailGradedItemPage;
