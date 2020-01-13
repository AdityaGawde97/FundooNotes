import React, {Component} from 'react';
import '../CSS/SignUpCss.css'
import Glogo from '../images/account.svg'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../Firebase/FirebaseConfig';
import Container from '@material-ui/core/Container'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';


export default class Register extends Component{
  constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            emailId: '',
            password: '',
            confirmPassword: '',
            showPassword: 'false',
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.writeUserData = this.writeUserData.bind(this);
        this.submitUserRegistrationForm = this.submitUserRegistrationForm.bind(this);
    }

    handleChange(event){
        
        this.setState({
          [event.target.name] : event.target.value
        })
    }

    submitUserRegistrationForm(event) {
        
        event.preventDefault();
        if (this.validateForm()) {
            this.setState({
                [event.target.name] : event.target.value,
                [event.target.formvalid]:  !event.target.formvalid
            })
            this.buttonAnimation();
            this.writeUserData();
        }
    }

    validateForm=()=> {

        let errors = {};
        var formIsValid = true;

        if (!this.state.firstName) {
            formIsValid = false;
            errors["firstName"] = "*Please enter your First Name.";
        }

        if (!this.state.lastName) {
            formIsValid = false;
            errors["lastName"] = "*Please enter your Last Name.";
        }
  
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
  
        if (typeof this.state.password !== "undefined") {
          if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            errors["password"] = "*Please enter secure and strong password.";
          }
        }

        if (!this.state.confirmPassword) {
            formIsValid = false;
            errors["confirmPassword"] = "*Please confirm your password.";
        }
    
        if (typeof this.state.confirmPassword !== "undefined") {
            if (this.state.confirmPassword !== this.state.password) {
                formIsValid = false;
                errors["confirmPassword"] = "*Password does not match.";
            }
        }
  
        this.setState({
          errors: errors
        });
        return formIsValid;
    }


    handleClickShowPassword = () => {
        this.setState({ 
            showPassword: !this.state.showPassword
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    writeUserData() {
        let errors={}
        firebase.auth().createUserWithEmailAndPassword(this.state.emailId, this.state.password).then((success)=>{
            console.log(JSON.stringify(success));
            
            console.log("uid : " + success.user.uid);
            console.log("email : " + success.user.email);
            
            firebase.database().ref('/users/' + success.user.uid + '/PersonalData').set({
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                EmailId: this.state.emailId,
            })
            this.props.history.push('/');
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Error code : ' + errorCode);
            console.log('Error Msg : ' + errorMessage);
            let msg = "This email id is already register with Fundoo Account"
            errors["emailId"] = msg;
            this.setState({
                errors: errors
            });
            // ...
        });
    }

    buttonAnimation = () => {
        let i=0;
        if (i === 0) {
            i = 1;
            let element = document.getElementById("load");
            let element2 = document.getElementById("loader");
            let fade = document.getElementById("fade");
            element2.style.backgroundColor = 'lightgray';
            let width = 1;
            fade.style.opacity = 0.3;
            let id = setInterval(frame, 10);
            setTimeout(() => {
                element.style.display = 'none';
                fade.style.opacity = 1;
            }, 1000)
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
            <Container maxWidth="lg">
                <div id="loader">
                    <div id="load"></div>
                </div>
                <div className="main-container" id="fade">

                    <div className="col-container"> 

                        <form>
                            <div className="title">
                                <span style={{color: '#4285F4'}}>F</span>
                                <span style={{color: '#DB4437'}}>u</span>
                                <span style={{color: '#F4B400'}}>n</span>
                                <span style={{color: '#4285F4'}}>d</span>
                                <span style={{color: '#0F9D58'}}>o</span>
                                <span style={{color: '#DB4437'}}>o</span>
                            </div>
                            <div className="subtitle">
                                <span>Create your Fundoo Account</span>
                            </div>
                            <div className="row-container">

                                <div>
                                    <TextField 
                                        id="outlined-basic"
                                        label="First name" 
                                        variant="outlined" 
                                        margin="dense"
                                        value={this.state.firstName} 
                                        onChange={this.handleChange}
                                        name="firstName"
                                        error={this.state.errors.firstName}
                                        helperText={this.state.errors.firstName}
                                        className="item1"
                                    />
                                </div>

                                <div>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Last name" 
                                        variant="outlined" 
                                        value={this.state.lastName} 
                                        onChange={this.handleChange}
                                        name="lastName"
                                        margin="dense"
                                        error={this.state.errors.lastName}
                                        helperText={this.state.errors.lastName}
                                        className="item2"
                                    />
                                </div>

                            </div>

                            <div>
                                <TextField 
                                    id="outlined-basic"
                                    label="Email" 
                                    variant="outlined" 
                                    value={this.state.username} 
                                    onChange={this.handleChange}
                                    name="emailId"
                                    margin="dense"
                                    error={this.state.errors.emailId}
                                    helperText={this.state.errors.emailId ? 
                                        this.state.errors.emailId
                                        : "You can use letters, numbers & periods"}
                                    className="item3"
                                />
                            </div>

                            <div className="row-container">

                                <div>
                                    <TextField 
                                        id="outlined-basic"
                                        label="Password" 
                                        type={!this.state.showPassword ? 'text' : 'password'}
                                        size="small"
                                        variant="outlined" 
                                        value={this.state.password} 
                                        onChange={this.handleChange}
                                        name="password"
                                        margin="dense"
                                        error={this.state.errors.password}
                                        helperText={this.state.errors.password}
                                        className="item4"
                                    />
                                </div>

                                <div>
                                    <TextField 
                                        id="outlined-basic"
                                        label="Confirm" 
                                        type={!this.state.showPassword ? 'text' : 'password'}
                                        variant="outlined" 
                                        value={this.state.confirmPassword} 
                                        onChange={this.handleChange}
                                        name="confirmPassword"
                                        margin="dense"
                                        error={this.state.errors.confirmPassword}
                                        helperText={this.state.errors.confirmPassword}
                                        className="item5"
                                    />
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}>
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </div>
                            </div>
                            <div className="passSpan">
                                <span>
                                    Use 8 or more characters with a mix of letters, numbers & symbols
                                </span>
                            </div>

                            <div className="row-container">
                                
                                <div className="item">
                                    <Button
                                        style={
                                            {
                                                backgroundColor: 'white', 
                                                color: '#1a73e8', 
                                                boxShadow: 'none', 
                                                textTransform: 'capitalize',
                                                fontSize:'18px'
                                            }
                                        }
                                        variant="contained" 
                                        size="large"
                                        onClick={ () => {
                                            this.props.history.push('/')}}
                                            >
                                    Sign in instead
                                    </Button>
                                </div>

                                <div className="item">
                                    <Button 
                                        variant="contained" 
                                        style={{backgroundColor: '#1a73e8', color: 'white'}}
                                        size="large"
                                        type="submit"
                                        onClick={this.submitUserRegistrationForm}>
                                    Next
                                    </Button>
                                </div>

                            </div>
                    </form>
                </div>
                <div className="glogo col-container">
                    <img src={Glogo} alt="fundoo logo" />
                    <div>
                        <p style={{textAlign: 'center'}}>
                        One account. All of Google working for you.
                        </p>
                    </div>
                </div> 
            </div>
        </Container>
      );
  }
}