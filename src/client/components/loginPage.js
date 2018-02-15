import React from 'react';
import {events} from '../lib/eventsPubSubs.js';

class LoginPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {                

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

    }

    render() {
        return (
            <div class="login-intro" style="margin-top:30px">
                <div class="widget container">
                    <div class="omb_login">
                        <div class="row omb_row-sm-offset-3 omb_socialButtons">                       
                            <div class="col-xs-12 col-sm-6">
                                <a target="_self" href="api/loginGoogle" class="btn btn-block btn-social btn-google">
                                    <span class="fa fa-google"></span>Sign in using iestacio.com
                                </a>
                            </div>          
                        </div> 
                        <div class="row omb_row-sm-offset-3">
                            <div class="col-xs-12 col-sm-6">
                                <form id="loginForm" class="omb_loginForm" autocomplete="off">
                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                        <input type="text" class="form-control"  name="username" placeholder="email address"/>
                                    </div>
                                    <span class="help-block"></span>

                                    <div class="input-group">
                                        <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                                        <input  type="password" class="form-control" name="password" placeholder="Password"/>
                                    </div>
                                    <span   class="help-block"></span><br/>
                                    <span id="loginAlert" class="text-danger">User or password error. Bad Credentials!</span>                        
                                    <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button><br/>
                                </form>
                            </div>
                        </div>
                        <div class="row omb_row-sm-offset-3">
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
