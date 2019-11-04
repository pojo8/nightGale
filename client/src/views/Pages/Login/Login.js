import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {FiLock} from 'react-icons/fi'

class Login extends Component {
  constructor() {
    super()
    this.state ={
      loginError: false,
      loginSuccess: false,
      loginEmail:'',
      loginPassword:''
    };

    this.onTextBoxChangeEmail = this.onTextBoxChangeEmail.bind(this);
    this.onTextBoxChangePassword = this.onTextBoxChangePassword.bind(this);
    this.onLogin = this.onLogin.bind(this);
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
      this.setState({
        loginSuccess: true,
      })
      if(json.success) {
        this.setState({
          loginError: json.message,
        })
      }
    });
  }
  
  render() {

    const {
      loginError,
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
                      this.state.loginSuccess ?
                      <Alert color="success">
                        User with email : {this.state.loginEmail} successful login
                      </Alert> : null
                    }
          {
                      this.state.loginError ?
                      <Alert color="success">
                        {loginError}
                      </Alert> : null
                    }
        </Container>
      </div>
    );
  }
}

export default Login;
