import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {
    state = {
        account: {  username: '', password: '' },
        errors: {}
    };

    validate = () => {

        const errors = {};
        const { account } = this.state;
        if (account.username.trim() === '')
            errors.username = 'Username is required';
        if (account.password.trim() === '')
            errors.password = 'Password is required';
        
        return Object.keys(errors).length === 0 ? null : errors; // this function will return an array of all the keys in this object
    };
    handleSubmit = e => {
        e.preventDefault(); // to prevent default behaviour and avoid complete cycle of requests to server

        const errors = this.validate();
        console.log(errors);
        this.setState({ errors });
        if (errors) return;
        // call the server 
        console.log('Submitted');
    };
    handleChange = ({ currentTarget: input }) => {
        const account = { ...this.state.account};
        account[input.name] = input.value;
        this.setState({ account });
    }
    
    render() { 
        const { account } = this.state;
        return ( 
            <div>
                <h1>Login </h1>
                <form onSubmit={this.handleSubmit}>
                    <Input 
                        name="username" 
                        value={account.username} 
                        label="Username" 
                        onChange={this.handleChange} 
                    />
                    <Input 
                        name="password"
                        value={account.password}
                        label="Password"
                        onChange={this.handleChange}
                    />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
            
         );
    }
}
 
export default LoginForm;