import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { Button, Card, CardHeader, CardBody, CardFooter, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText,Label,  Row } from 'reactstrap';
import {
  getFromStorage, 
} from '../../../containers/DefaultLayout/utils/Storage';
import ChangePasswordModal from './ChangePasswordModal/ChangePasswordModal';
import { throws } from 'assert';


class UserAccount extends Component {
  
  constructor() {
    super()
    this.state ={
      userId: '',
      firstName:'',
      lastName:'',
      email:'',
      password: '',
      hourlyRate: '',
      updateSuccess: '',
      showModal: false,
    };

    this.onFirstNameChanged = this.onFirstNameChanged.bind(this);
    this.onLastNameChanged = this.onLastNameChanged.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onHourlyRateChanged = this.onHourlyRateChanged.bind(this);
    this.onSubmitUserForm = this.onSubmitUserForm.bind(this);
    this.onResetUserForm = this.onResetUserForm.bind(this);

    this.onDismiss = this.onDismiss.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };

  }

  onFirstNameChanged(event){
    this.setState({
      firstName:event.target.value,
    });
  }

  onLastNameChanged(event){
    this.setState({
      lastName:event.target.value,
    });
  } 

  onEmailChanged(event){
    this.setState({
      email:event.target.value,
    });
  }

  onHourlyRateChanged(event){
    this.setState({
      hourlyRate:event.target.value,
    });
  } 

  onChangePassword(){
    this.setState({
      showModal: true,
    });
  } 
  hideModal =() =>{
    this.setState({showModal:false});
  }


  navigateToHome(){
    this.props.history.push('/login');  }

    onDismiss() {
      this.setState({ visible: false });
    }

  componentDidMount(){
    const obj = getFromStorage('app_ng');

    if( obj && obj.token) {
          this.setState({
            userId: obj.userId,
          });
          
      fetch('http://localhost:8080/endpoint/account/get-user/' +obj.userId, {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json'
        },
    }).then( response => response.json())
    .then(json => {
      if(json.success === true) {

        this.setState({
          firstName: json.userProfile.firstName,
          lastName: json.userProfile.lastName,
          email: json.userProfile.email,
          hourlyRate: json.userProfile.hourlyRate,
          password: json.userProfile.password,
  
        });
        console.log('user info synced')

      } else {
       
        console.log('No existing user found ')
      }
    });
    } else {
      console.error('user id is not found');
    }
  }

  onSubmitUserForm(){

    // Grab state
    const {
      userId,
      firstName,
      lastName,
      email,
      hourlyRate,
    } = this.state
    // Post request to backend

    fetch('http://localhost:8080/endpoint/account/user-update', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        hourlyRate: hourlyRate,

      }),
    }).then( response => response.json())
    .then(json => {
      console.log(json)  
      if (json.success === true) {
          this.setState({
            updateSuccess: true,
          })
        // this.navigateToHome();
      }
      else if (json.success === false) {
        this.setState({
          updateError: json.message,
          updateSuccess: false,
      });
      }
    });
  }
  onResetUserForm(){
    this.setState({
      firstName: '',
      lastName:'',
      email:'',
      hourlyRate:'', 
    })
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
    
  

  render() {

    const {
      userId,
      firstName,
      lastName,
      email,
      password,
      hourlyRate
    } = this.state 

    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.hideModal}>&times;</button>;

    return (
      <div className="animated fadeIn">
            <Card>
              <CardHeader>
              <i className="icon-user"></i><strong>User Account</strong>{' '}
              </CardHeader>
              <CardBody>
              { this.state.updateSuccess ?
                      <Alert color="success"  isOpen={this.state.visible} toggle={this.onDismiss}>
                        Upload was successful
                      </Alert> : null
                    }
              <ChangePasswordModal userid={userId} external={externalCloseBtn} isOpen={this.state.showModal} />
              <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="address">First Name</Label>
                  </Col>
                  <Col xs="12" md="7">
                  <InputGroup className="mb-3">

                  <InputGroupAddon addonType="prepend">
                        <InputGroupText>         
                        <i className="cui-user"></i>        
                        </InputGroupText>
                      </InputGroupAddon>
                  <Input type="text" id="address"  
                  value = {firstName} onChange={this.onFirstNameChanged}/>
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="address">Last Name</Label>
                  </Col>
                  <Col xs="12" md="7">
                  <InputGroup className="mb-3">

                  <InputGroupAddon addonType="prepend">
                        <InputGroupText>         
                        <i className="cui-user"></i>        
                        </InputGroupText>
                      </InputGroupAddon>
                  <Input type="text" id="address"  
                  value = {lastName} onChange={this.onLastNameChanged}/>
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="address">Email</Label>
                  </Col>
                  <Col xs="12" md="7">
                  <InputGroup className="mb-3">

                  <InputGroupAddon addonType="prepend">
                        <InputGroupText>         
                          @
                        </InputGroupText>
                      </InputGroupAddon>
                  <Input type="text" id="address" placeholder="Enter your address" 
                  value={email} onChange={this.onEmailChanged}/>
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="address">Password</Label>
                  </Col>
                  <Col xs="12" md="4">
                  <InputGroup className="mb-3">

                  <InputGroupAddon addonType="prepend">
                        <InputGroupText>         
                        <i className="cui-lock-locked"></i>        
                        </InputGroupText>
                      </InputGroupAddon>
                  <Input type="password" id="address" placeholder="Enter your address" 
                  value = {password} disabled/>
                  </InputGroup>
                  </Col>
                  <Col xs="12" md="3">
                  <Button onClick={()=> this.setState({showModal: true})} color="success">Update password</Button>
                  </Col>
              </FormGroup>
                <FormGroup row>
                <Col md="3">
                  <Label htmlFor="country">Hourly rate</Label>
                </Col>
                <Col xs="12" md="7">
                <InputGroup className="mb-3">

                <InputGroupAddon addonType="prepend">
                        <InputGroupText> 
                        <i className="cui-speedometer"></i>        
                        </InputGroupText>
                      </InputGroupAddon>
                  <Input type="text" id="hourlyRate" 
                   value={hourlyRate} onChange={this.onHourlyRateChanged} />
                   </InputGroup>
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.onSubmitUserForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                &nbsp; &nbsp; &nbsp;

                <Button type="reset" size="sm" color="danger" onClick={this.onResetUserForm}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
       
      </div>
    );
  }
}

export default UserAccount;
