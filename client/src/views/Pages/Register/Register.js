import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {FiUser,FiLock} from 'react-icons/fi'


class Register extends Component {
  
  constructor() {
    super()
    this.state ={
      registerError: false,
      userRegistered: false,
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      confirmPassword:'',
      accountType:'',
    };

    this.onTextBoxChangeFirstName = this.onTextBoxChangeFirstName.bind(this);
    this.onTextBoxChangeLastName = this.onTextBoxChangeLastName.bind(this);
    this.onTextBoxChangeEmail = this.onTextBoxChangeEmail.bind(this);
    this.onTextBoxChangePassword = this.onTextBoxChangePassword.bind(this);
    this.onTextBoxChangeConfirmPassword = this.onTextBoxChangeConfirmPassword.bind(this);
    this.onTextBoxChangeAccountType = this.onTextBoxChangeAccountType.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.navigateToHome =this.navigateToHome.bind(this);

  }

  onTextBoxChangeFirstName(event){
    this.setState({
      firstName:event.target.value,
    });
  }

  onTextBoxChangeLastName(event){
    this.setState({
      lastName:event.target.value,
    });
  } 

  onTextBoxChangeEmail(event){
    this.setState({
      email:event.target.value,
    });
    // will remove the user blocking before
    this.setState({
      registerError: false,
  });
  }

  onTextBoxChangePassword(event){
    this.setState({
      password:event.target.value,
    });
  } 

    onTextBoxChangeConfirmPassword(event){
    this.setState({
      confirmPassword:event.target.value,
    });
  } 

  onTextBoxChangeAccountType(event){
    var options = event.target.options;
    var value = 'contractor'
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value = options[i].value;
      }
    }
    this.setState({
      accountType: value 
    });
  }

  navigateToHome(){
    this.props.history.push('/');  }

  // checkPasswordsMatch() {
    
  // }

  onRegister(){

    //checkPasswordsMatch();
    // Grab state
    const {
      firstName,
      lastName,
      email,
      password,
      accountType,
    } = this.state
    // Post request to backend

    console.log(this.state);

    fetch('http://localhost:8080/endpoint/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        accountType: accountType

      }),
    }).then( response => response.json())
    .then(json => {
      console.log(json)  
      if (json.success === true) {
          // this.setState({
          //   userRegistered: true,
          // })
          this.navigateToHome();
      }
      else if (json.success === false) {
        this.setState({
          registerError: json.message,
      });
      }
    });
  }
    
  

  render() {

    const {
      registerError,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    } = this.state 
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form > 
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    {
                      this.state.registerError ?
                      <Alert color="danger">
                        {registerError}
                      </Alert> : null
                    }
                    {
                      this.state.userRegistered ?
                      <Alert color="danger">
                        {registerError}
                      </Alert> : null
                    }
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>         
                          <FiUser/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                      type="text" 
                      placeholder="First name" 
                      autoComplete="firstName"
                      value={firstName}
                      onChange={this.onTextBoxChangeFirstName}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FiUser/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                      type="text" 
                      placeholder="LastName" 
                      autoComplete="lastName"
                      value={lastName}
                      onChange={this.onTextBoxChangeLastName}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input 
                      type="text" 
                      placeholder="Email" 
                      autoComplete="email"
                      value={email} 
                      onChange={this.onTextBoxChangeEmail}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <FiLock/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                      type="password" 
                      placeholder="Password" 
                      autoComplete="new-password" 
                      value={password}
                      onChange={this.onTextBoxChangePassword}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <FiLock/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                      type="password" 
                      placeholder="confirm password" 
                      autoComplete="new-password" 
                      value={confirmPassword}
                      onChange={this.onTextBoxChangeConfirmPassword}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Account type</InputGroupText>
                      </InputGroupAddon>
                      <Input 
                      type="select" 
                      name="Account Type" 
                      id="accountType"
                      value={accountType}
                      onChange={this.onTextBoxChangeAccountType}>
                        <option >select an account type</option>
                        <option value="contractor">Contractor</option>
                        <option value="nurse">Nurse</option>
                        <option value="hospitalAdmin">Hospital Admin</option>
                        <option value="hospital">Hospital</option>
                      </Input>
                    </InputGroup>   
                    <Button color="success" onClick={this.onRegister} block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" onClick={this.navigateToHome} block><span>Back to login</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
