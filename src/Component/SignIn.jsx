import React, {Component} from 'react';
import '../CSS/SignInCss.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../Firebase/FirebaseConfig';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

export default class Register extends Component{
  constructor(props){
        super(props)
        this.state = {
            emailId: '',
            password: '',
            showPassword: false,
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.loginWithFirebase = this.loginWithFirebase.bind(this);
        this.submitUserLoginForm = this.submitUserLoginForm.bind(this);
    }
  
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
          [name] : value
        })
    }

    submitUserLoginForm(event) {
        event.preventDefault();
        
        if (this.validateForm()) {
            
            this.setState({
                [event.target.name] : event.target.value,
                [event.target.formvalid]:  !event.target.formvalid
            })
            this.buttonAnimation();
            this.loginWithFirebase();
        }        
    }

    validateForm = () => {

        let errors = {};
        var formIsValid = true;
  
        if (!this.state.emailId) {
          formIsValid = false;
          errors["emailId"] = "*Please enter your email-ID.";
        }
  
        if (typeof this.state.emailId !== "undefined") {
          //regular expression for email validation
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(this.state.emailId)) {
            formIsValid = false;
            errors["emailId"] = "*Please enter valid email-ID.";
          }
        }
  
        if (!this.state.password) {
          formIsValid = false;
          errors["password"] = "*Please enter your password.";
        }
  
        this.setState({
          errors: errors
        });
        return formIsValid;
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    loginWithFirebase(){
        let errors = {};
        firebase.auth().signInWithEmailAndPassword(this.state.emailId, this.state.password).then(async (success) => {

            await firebase.database().ref("users/"+success.user.uid+"/PersonalData")
            .once('value',(snapshot)=>{
                let snapshotObj = snapshot.val();
                localStorage.setItem('firstLetter', (snapshotObj.FirstName).charAt(0))
                localStorage.setItem('firstName', snapshotObj.FirstName);
                localStorage.setItem('lastName', snapshotObj.LastName);
                localStorage.setItem('emailId', success.user.email);
                localStorage.setItem('uid', success.user.uid)
                localStorage.setItem('isAuthenticate', true)
            })
            
            this.props.history.push('/dashboard/notes');

        })
        .catch((error) => {
            // Handle Errors here
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Error code : ' + errorCode); 
            console.log('Error Msg : ' + errorMessage);
            if (errorCode === 'auth/user-not-found'){
                let msg = "This email id is not register with Fundoo Account"
                errors["emailId"] = msg;
                this.setState({
                    errors: errors
                });
            }
            else{
                let msg = "You have entered wrong password"
                errors["password"] = msg;
                this.setState({
                    errors: errors
                });
            }
              
        });
    }

    buttonAnimation = () => {
        let i=0;
        if (i === 0) {
            i = 1;
            let element = document.getElementById("load1");
            let element2 = document.getElementById("loader1");
            let fade = document.getElementById("fade");
            element2.style.backgroundColor = 'lightgray';
            let width = 1;
            fade.style.opacity = 0.3;
            let id = setInterval(frame, 10);
            setTimeout(() => {
                element.style.display = 'none';
                fade.style.opacity = 1;
            }, 1000);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width++;
                    element.style.width = width + "%";
                    
                }
            }
        }
    }

    render(){
        return(
           <div>
                <div id="loader1">
                    <div id="load1"></div>
                </div>
                <div className="mainContainer" id="fade">

                    <form> 
                        <div className="titleContainer"> 
                            <div className="title1">
                                <span style={{color: '#4285F4'}}>F</span>
                                <span style={{color: '#DB4437'}}>u</span>
                                <span style={{color: '#F4B400'}}>n</span>
                                <span style={{color: '#4285F4'}}>d</span>
                                <span style={{color: '#0F9D58'}}>o</span>
                                <span style={{color: '#DB4437'}}>o</span>
                            </div>
                            <div className="subtitle1">
                                <span>Sign in</span>
                            </div>
                            <div className="subtitle1">
                                <span>
                                    Use your Fundoo Account 
                                </span>
                            </div>
                        </div>
                        <div>
                            <TextField 
                                id="outlined-basic" 
                                label="Email" 
                                fullWidth
                                variant="outlined" 
                                value={this.state.emailId} 
                                onChange={this.handleChange}
                                name="emailId"
                                error={this.state.errors.emailId}
                                style={{marginTop: 30}} 
                                helperText={this.state.errors.emailId}
                            />
                        </div>
                        <div>
                            <FormControl 
                                variant="outlined" 
                                fullWidth 
                                error={this.state.errors.password}
                                style={{marginTop: 30}} >
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={!this.state.showPassword ? 'text' : 'password'}
                                    autoComplete={false}
                                    value={this.state.password}
                                    name="password"
                                    onChange={this.handleChange}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                                <FormHelperText error>{this.state.errors.password}</FormHelperText>
                            </FormControl>
                        </div>
                        <div>
                            <Button 
                                style={{backgroundColor: 'white', color: '#1a73e8', boxShadow: 'none'}}
                                variant="contained"
                                size="large"
                                onClick={ () => {
                                        this.props.history.push('/forgotpassword')}}>
                                Forgot password?
                            </Button>
                        </div>
                        <div className="btnContain">
                            <div>
                                <Button 
                                    style={{backgroundColor: 'white', color: '#1a73e8', boxShadow: 'none'}}
                                    variant="contained"
                                    size="large"
                                    onClick={ () => {
                                        this.props.history.push('/signup')}}>
                                    Create Account
                                </Button>
                            </div>
                            <div>
                                <Button 
                                    variant="contained"
                                    style={{backgroundColor: '#1a73e8', color: 'white'}}
                                    size="large"
                                    onClick={this.submitUserLoginForm}
                                >
                                Next
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}