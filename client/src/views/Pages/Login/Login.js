import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {FiLock} from 'react-icons/fi'

import { setInStorage } from '../../../containers/DefaultLayout/utils/Storage';
import { runInThisContext } from 'vm';
class Login extends Component {
  constructor() {
    super()
    this.state ={
      loginError: false,
      loginSuccess: false,
      loginEmail:'',
      loginPassword:'',
      forcePasswordReset: false,
    };

    this.onTextBoxChangeEmail = this.onTextBoxChangeEmail.bind(this);
    this.onTextBoxChangePassword = this.onTextBoxChangePassword.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.navigateToDashBoard = this.navigateToDashBoard.bind(this);
    this.launchResetPasswordModal = this.launchResetPasswordModal.bind(this);
  }

  // on change events for the input boxes
  onTextBoxChangeEmail(event){
    this.setState({
      loginEmail:event.target.value,
    });
  }

  onTextBoxChangePassword(event){
    this.setState({
      loginPassword:event.target.value,
    });
  }
  
  onLogin(){
    // Grab state
    const {
      loginEmail,
      loginPassword,
    } = this.state
    
    // Post request to backend
    fetch('http://localhost:8080/endpoint/account/login', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword
      }),
    }).then( response => response.json())
    .then(json => {
      console.log('login json: ', json);
      if(json.success === true && json.forcePasswordReset != true) {
        // stores the toekn generated with the local storage FIXME in future
        // This will be stored in the default header item that will appear on all the pages
        setInStorage('app_ng', {token: json.token,userId: json.uid});

        this.setState({
          loginSuccess: true,
          loginError: json.message,
          loginPassword: '',
          loginEmail: '',
          token: json.token,
        });

      } else if(json.success === true && json.forcePasswordReset){
        this.setState({
          loginSuccess: true,
          forcePasswordReset: true,
        });
        console.log('user needs to reset password')
      }else {
        this.setState({
          loginSuccess: false,
          loginError: true,
        });
        console.log('Error found in login process')
      }
    });
  }


  navigateToDashBoard(){
     this.props.history.push('/'); 
  }

  // maybe iport this from the new email address
  launchResetPasswordModal(){

  }
  
  render() {

    const {
      loginEmail,
      loginPassword
    } = this.state


    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            @
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                        type="text" 
                        placeholder="Email" 
                        autoComplete="email" 
                        value={loginEmail}
                        onChange={this.onTextBoxChangeEmail}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <FiLock/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                        type="password" 
                        placeholder="Password" 
                        autoComplete="current-password" 
                        value={loginPassword}
                        onChange={this.onTextBoxChangePassword}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          {/* Add on event click to check password*/}
                          <Button color="primary" onClick={this.onLogin} className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link to="/forgotPassword">
                            <Button color="link" className="px-0">Forgot password?</Button>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Create an account if you do not have one</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
          {
            // this will launch a modal for forgot passowrd
                      this.state.loginSuccess && this.state.forcePasswordReset ?
                      this.launchResetPasswordModal(loginEmail) : this.state.loginError === false
          }
          {
                      this.state.loginSuccess && !this.state.forcePasswordReset ?
                      this.navigateToDashBoard() : this.state.loginError === false
          }
                      { this.state.loginError ?
                      <Alert color="danger">
                        User with email : {this.state.loginEmail} Unsuccessful login attempt
                      </Alert> : null
                    }
        </Container>
      </div>
    );
  }
}

export default Login;
