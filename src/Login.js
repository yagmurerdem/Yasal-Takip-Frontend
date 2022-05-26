import React, { Component, useState } from 'react'
import   './App.css';
import { TextField, Button, Divider } from '@material-ui/core';
import {Link} from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckboxIcon from '@material-ui/icons/CheckBox';
import PersonIcon from '@material-ui/icons/Person';
import axios from 'axios';
import FormValidator from "./FormValidator";
import { Redirect } from 'react-router-dom';
import { Route , withRouter} from 'react-router-dom';
class Login extends Component {

    constructor() {
        super();
        
        this.validator = new FormValidator([{
            field: 'username',
            method: 'isEmpty',
            validWhen: false,
            message: 'Kullanici adinizi Giriniz.'
        },

        {
            field: 'password',
            method: 'isEmpty',
            validWhen: false,
            message: 'Parolanızı Giriniz.'
        }

         
        ]);
        this.state = {
            username: '',
            password: '',
            isLoging: false,
            validation: this.validator.valid(),
        }
        this.submitted = false;
    }
  
    handleSubmit = e=> {
        e.preventDefault();
        // history.push('/deneme')
      
        const validation = this.validator.validate(this.state);
        this.setState({
            validation
        });
        this.submitted = true;
        if (validation.isValid) {
            //reaches here if form validates successfully...
            const { username, password } = this.state;

            const body = {
                username:this.state.username,
                password:this.state.password

            }
           //window.location.href = '/navbarcomp'; 
            axios.post('/login', body)
            .then(response => {
                if(response.status===200){
                    this.setState({isLoging:true})
                }
            })
            .catch(function (error) {
              if (error.response) {
                alert(error.response.data.message);
              
              }
           
            });
          }
          

    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
      }
    
  

    handleInputChange = event => {
    
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
 
   

render(){
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation
    if(this.state.isLoging){
        return <Redirect to = {{pathname:"/navbarcomp"}} />;
    }
    return (
        <div>
            <div className="icon">
                <div className="icon_class">
                    <PersonIcon fontSize="large" />
                </div>

                <div className="text"> Log in  </div>
            </div>


            <div className="row m-2">
            <div className={validation.username && 'has-error'}>
                <input type="text" className="p-2" name="username" variant="outlined" placeholder="KullaniciAdi" onChange={this.handleInputChange} />
                <span className="help-block">{validation.username.message}</span> </div>
                <div className={validation.password && 'has-error'}>
                <input type="password" className="p-2" name="password" variant="outlined" placeholder="Parola" onChange={this.handleInputChange} />
                <span className="help-block">{validation.password.message}</span> </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckboxIcon fontSize="small" />}
                            name="checkedI"
                        />
                    }
                    label="Remember me"
                />
                <Button onClick={this.handleSubmit}  variant="contained" color="primary" >  Log in  </Button>
            </div>
            <Divider variant="middle" />
            <p className="text-center">
                <Link to="signup" className="text-black-50">
                    <h5> Create Account </h5>
                </Link>
            </p>
        </div>
    )
}
}
export default Login