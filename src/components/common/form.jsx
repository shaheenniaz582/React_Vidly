import React, { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {
    state = { 
        data: {},
        errors: {}
     };

     validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        // console.log(result);
        if (!error) return null;

        const errors = {};
         // mapping an array into an object //
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({ name, value }) => {
        // computed properties inES6
        const obj = { [name]: value }; 
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };
    
    handleSubmit = e => {
        e.preventDefault(); // to prevent default behaviour and avoid complete cycle of requests to server

        const errors = this.validate();
        //console.log(errors);
        this.setState({ errors: errors || {} }); // error object should always be an object, never null
        if (errors) return;
        
        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {  ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    };
}
 
export default Form;