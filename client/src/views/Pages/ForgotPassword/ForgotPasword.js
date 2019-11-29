import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
  Alert,
  Button, 
  Card, 
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container, 
  Form, 
  Input, 
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Row } from 'reactstrap';

  

class ForgotPassword extends Component {
  
  constructor(props) {
    super(props);
    this.onResetPassword = this.onResetPassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onDismissSuccess = this.onDismissSuccess.bind(this);
  
    this.state = {
      email: '',
      resetSuccess:false,
      resetError: false,
      visible: true,

    }
  }

  onResetPassword() {

    const{
      email,
    } = this.state;

    fetch('http://localhost:8080/endpoint/account/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: email,
      }),
    }).then( response => response.json())
    .then(json => {
      console.log('response json: ', json);
      if(json.success === true) {
        console.log('inside the block')
        this.setState({
          resetSuccess: true,
        });
        // console.log('profession update successful')

      } else {
        this.setState({
          resetSuccess: false,
          resetError: true,
        });
        // console.log('Error found in login process')
      }
    });  }
  
  onChangeEmail (event) {
    this.setState({
      email: event.target.value
    });
  }

  onDismiss() {
    this.setState({ 
      visible: false,
      resetError: false,
    });
  }

  onDismissSuccess() {
    this.setState({ 
      visible: false,
    });
    this.props.history.push('/login');
  }
  
  render() {
    
    const {
      email,
      
    } = this.state

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardHeader>
                <h1>Reset Password</h1>
                </CardHeader>
                { this.state.resetSuccess ?
                      <Alert color="success" isOpen={this.state.visible} toggle={this.onDismissSuccess}>
                        Password was reset successfully. Please check your email
                      </Alert> : null
                    }
                    { this.state.resetError ?
                      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        Email entered was not linked to an existing account. Try again or register a new user
                      </Alert> : null 
                    }
                <CardBody className="p-4">
                  <Form>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" 
                      value={email} onChange={this.onChangeEmail}/>
                    </InputGroup>
                    <Button color="success" onClick={this.onResetPassword} block>Reset Password</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Link to="/login">
                    <Button color="secondary" className="px-4">login page</Button>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          </Row>

        </Container>

      </div>
    );
  }
}

export default ForgotPassword;
