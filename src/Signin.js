
import React from 'react'
import './App.css';
import { TextField, Button, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckboxIcon from '@material-ui/icons/CheckBox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FormValidator from "./FormValidator";
import axios from 'axios';


class Signin extends React.Component {

    constructor() {
        super();
        this.validator = new FormValidator([{
            field: 'username',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter full name.'
        },

        {
            field: 'password',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter password.'
        },

        {
            field: 'password_confirmation',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter Password confirmation.'
        },

        {
            field: 'adi',
            method: 'isEmpty',
            validWhen: false,
            message: 'isminizi giriniz.'
        },

        {
            field: 'soyadi',
            method: 'isEmpty',
            validWhen: false,
            message: 'soyadinizi giriniz .'
        },

        {
            field: 'email',
            method: 'isEmpty',
            validWhen: false,
            message: 'Enter your email address.'
        },

        {
            field: 'password_confirmation',
            method: this.passwordMatch, // notice that we are passing a custom function here
            validWhen: true,
            message: 'Password and password confirmation do not match.'
        }]);
        this.state = {
            username: '',
            password: '',
            password_confirmation: '',
            adi: '',
            soyadi: '',
            email: '',
            validation: this.validator.valid(),
        }
        this.submitted = false;
    }
    passwordMatch = (confirmation, state) => (state.password === confirmation)
    handleInputChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleFormSubmit = event => {
        event.preventDefault();
        // history.push('/deneme')
      
        const validation = this.validator.validate(this.state);
        this.setState({
            validation
        });
        this.submitted = true;
        if (validation.isValid) {
            //reaches here if form validates successfully...
            const { username, password, adi, soyadi, email } = this.state;

            const body = {
                username,
                password,
                adi,
                soyadi,
                email
     //   window.location.href = '/navbarcomp';
               
            };
          
            axios.post('/register', body)
            .catch(function (error) {
              if (error.response) {
                alert(error.response.data.message);
              
              }
             
            });
          }
          
      }
     
    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation
        return (
            <div>

                <div className="icon">
                    <div className="icon_class">
                        <PersonAddIcon fontSize="large" />
                    </div>
                    <div className="text"> Sign Up </div>
                </div>
                <br />
                <div className="row m-2">
                    <form className="registrationForm">
                        <div className="col-6  p-2">
                            <div className="col-md-4 col-md-offset-4">
                                <div className={validation.username && 'has-error'}>
                                    <input type="string" className="form-control" name="username" variant="outlined" placeholder="Kullanıcı Adı" onChange={this.handleInputChange} fullWidth />
                                    <span className="help-block">{validation.username.message}</span> </div>
                            </div>

                            <br />
                            <div className="col-md-4 col-md-offset-4">
                                <div className={validation.password.isInvalid && 'has-error'}>
                                    <input type="password" className="form-control" placeholder="Şifre" name="password" onChange={this.handleInputChange} />
                                    <span className="help-block">{validation.password.message}</span> </div>
                            </div>
                            <br />

                            <div className="col-md-4 col-md-offset-4">
                                <div className={validation.password_confirmation.isInvalid && 'has-error'}>
                                    <input type="password" className="form-control" placeholder="Tekrar Şifre" name="password_confirmation" onChange={this.handleInputChange} />
                                    <span className="help-block">{validation.password_confirmation.message}</span> </div>
                            </div>

                            <br />


                            <div className="col-md-4 col-md-offset-4">
                                <div className={validation.adi && 'has-error'}>
                                    <input type="string" className="form-control" name="adi" placeholder="Adı" onChange={this.handleInputChange} />
                                    <span className="help-block">{validation.adi.message}</span> </div>
                            </div>

                            <br />


                            <div className="col-md-4 col-md-offset-4">
                                <div className={validation.soyadi && 'has-error'}>
                                    <input type="string" className="form-control" name="soyadi" placeholder="soyadı" onChange={this.handleInputChange} />
                                    <span className="help-block">{validation.soyadi.message}</span> </div>
                            </div>

                            <br />

                            <div className="col-md-4 col-md-offset-4">
                                <div className={validation.email.isInvalid && 'has-error'}>
                                    <input type="email" className="form-control" name="email" placeholder="Email " onChange={this.handleInputChange} />
                                    <span className="help-block">{validation.email.message}</span> </div>

                            </div>

                            <br />


                            <br />


                            <Button onClick={this.handleFormSubmit} className="btn btn-primary" variant="contained" color="primary" fullWidth> Kayıt  </Button> 
                            {/* <Link to="/About" onClick={this.handleFormSubmit} className="btn btn-primary">Sign up</Link> */}
                            {/* <Button variant="contained" color="primary" onClick={() => history.push('/deneme')}>Click button to view products</Button> */}
                            {/* <div className="me auto">

                                <Nav.Link as={Button} to={"/deneme"}>Kayıt</Nav.Link>


                            </div> */}


                        </div>
                    </form>
                </div>
                <div className="row m-2">

                    <FormControlLabel
                        control={
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckboxIcon fontSize="small" />}
                                name="checkedI"
                            />
                        }
                        label="Tüm şart ve koşulları kabul ediyorum."
                    />

                </div>

                <Divider variant="middle" />
                <p className="text-center">
                    <Link to="login" className="text-black-50">
                        <h5>   Already have an Account? </h5>
                    </Link>
                </p>
            </div>
        )
    }
}
export default Signin;