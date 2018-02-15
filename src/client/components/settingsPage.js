import React from 'react';
import {events} from '../lib/eventsPubSubs.js';

class SettingsPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {                
            settings:props.settings
        }
        console.log(this.state);
        this.handleInputChange = this.handleInputChange.bind(this);   
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);           
    }

    handleOnChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });

        events.publish('settings/changeWeight',this.state);
        events.publish('settings/changeDefaultTerm',this.state);        
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    componentDidMount() {
        let itemWeightChanger = $('#weightChanger');
        itemWeightChanger.val(this.state.settings.weightXP);
        let labelXPWeight = $('#idXPweight');
        labelXPWeight.text(this.state.settings.weightXP + '% XP weight');
        let labelGPWeight = $('#idGPweight');
        labelGPWeight.text(this.state.settings.weightGP + '% GP weight');
    }
        
    render() {
        const terms = this.state.settings.terms;
        return (
            <div>
                <h3>Settings</h3>
                <form id="newSettings">
                <div className="form-group">
                    <label htmlFor="xp" id="idXPweight">Weight XP</label><br></br>
                    <input type="range" min="0" max="100" id="weightChanger" name='rangeChanger' value={this.state.settings.weightXP} onChange={this.handleOnChange}/><br></br>
                    <label htmlFor="gt" id="idGPweight">Weight GT</label>
                </div>
                </form> 

                <form id="existingTerms">
                    DEFAULT TERM:
                    <div className="form-group">
                        <select id="termsItems" onChange={this.handleInputChange} name="defaultTerm">
                            {terms.map((term) => 
                                term.name === this.state.settings.defaultTerm ? (
                                    <option key={term[0]} selected value={term.name}>{term.name}</option>
                                ) : (
                                        <option key={term[0]} value={term.name}>{term.name}</option>
                                )
                            )}
                            {
                                'ALL' === this.state.settings.defaultTerm ? (
                                    <option selected value="ALL">ALL</option>
                                ) : (
                                    <option value="ALL">ALL</option>
                                )
                            }
                        </select>

                    </div>
                    
                    {terms.map((term) =>
                        <div key={term[0]} className="from-group">
                            <label htmlFor="xp" id={"id"+term.name}>Term Name:</label><br></br>
                            <input id={"idInput"+term.name} type="text" defaultValue={term.name} name="name"/>
                            BEGIN<input id={term.name+"beginTerm"} type="date" value={term.begin}/>
                            END<input id={term.name+"endTerm"} type="date" value={term.end}/>      
                            <input type="submit" className="btn btn-primary" value="Change"/>
                        </div>
                    )}
                </form> 

                <form id="newTerm">
                    <div className="form-group">
                    <label htmlFor="xp" id="termName">Term name</label><br></br>
                    <input id="nameTerm" type="text" onChange={this.handleInputChange}/>
                    BEGIN<input id="beginTerm" type="date"/>
                    END<input id="endTerm" type="date"/>      
                    <input type="submit" className="btn btn-primary" value="New term  "/>
                    </div>
                </form>          
            </div>  
        );
    }
}

export default SettingsPage;
