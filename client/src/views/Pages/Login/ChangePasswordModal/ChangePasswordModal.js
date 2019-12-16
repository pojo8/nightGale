import React, { Component } from 'react';

import { Alert, Button, Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText,Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


// import {
//   getFromStorage, 
// } from '../../../../containers/DefaultLayout/utils/Storage';


class ChangePasswordModal extends Component {
  
  constructor(props) {
    super(props);

    this.state ={
      userId: this.props.userid,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      isOpen:true,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      validationError: false,
      passwordUpdated: false,
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onUpdatePassword = this.onUpdatePassword.bind(this);
    this.onNewPasswordChanged = this.onNewPasswordChanged.bind(this);
    this.onConfirmPasswordChanged = this.onConfirmPasswordChanged.bind(this);
    //this.onCheckPasswordsMatch = this.onCheckPasswordsMatch.bind(this)
    
  }



  onNewPasswordChanged(event){
    this.setState({
      newPassword:event.target.value,
    });
  } 

  onConfirmPasswordChanged(event){
    this.setState({
      confirmPassword:event.target.value,
    });
  }

  onHourlyRateChanged(event){
    this.setState({
      hourlyRate:event.target.value,
    });
  } 

  onDismiss() {
    this.setState({ 
    visible: false ,
    validationError: false,
    passwordUpdated: false
  });
  }

  // onDismissPwd() {
  //   this.setState({ 
  //   visible: false ,
  //   passwordUpdated: false});
  // }



  onUpdatePassword(){

    const newPasswordStr = this.state.newPassword;
    const confirmPasswordStr = this.state.confirmPassword;

    if(!confirmPasswordStr === newPasswordStr){
      this.setState({validationError: true})
      return;
    }

    const {
      newPassword,
      userId = this.props.userid
      } = this.state;
    
    fetch('http://localhost:8080/endpoint/account/change-password/', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          password: newPassword,
        }),
      }).then( response => response.json())
      .then(json => {
        console.log('user json: ', json);
        if(json.success === true) {
          
          this.setState({
            passwordUpdated: true,
          });

          console.log('password update successful')
          // this.props.history.push('/'); 

        } else {
          this.setState({
            passwordUpdated: true,
          });
          console.log('Error updating password')
        }
      });  
    }

  onResetUserForm(){
    this.setState({
      newPassword:'',
      confirmPassword:'',
    });
  }


  toggleFade() {
    // this.setState((prevState) => { return { fadeIn: !prevState }});
    this.setState({isOpen: false});
  }

  render() {

    const {
      newPassword,
      confirmPassword,
      validationError,
      passwordUpdated,
    } = this.state 
    return (
      <div className="align-items-center">
      <Modal  {...this.props} centered modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}>
        <ModalHeader >Update Password</ModalHeader>
        {validationError ?
                      <Alert color="danger"  isOpen={this.state.visible} toggle={this.onDismiss}>
                       Error: Check the password supplied 
                      </Alert> : null
                    }
        {passwordUpdated ?
                      <Alert color="success"  isOpen={this.state.visible} toggle={this.onDismiss}>
                       Password updated successfully
                      </Alert> : null
                    }
        {passwordUpdated && validationError ?
                      <Alert color="danger"  isOpen={this.state.visible} toggle={this.onDismissPwd}>
                       Error: unable to update password check the logs
                      </Alert> : null
                    }
                    
        <ModalBody className="align-items-center">
        <FormGroup row>
                  <Col md="4">
                    <Label htmlFor="newPassword">New Password</Label>
                  </Col>
                  <Col xs="12" md="7">
                  <InputGroup className="mb-3 ">
                  <InputGroupAddon addonType="prepend">
                        <InputGroupText>         
                        <i className="cui-lock-locked"></i>        
                        </InputGroupText>
                      </InputGroupAddon>
                  <Input type="password" id="newPassword" 
                  value = {newPassword} onChange={this.onNewPasswordChanged}/>
                  </InputGroup>
                  </Col>
        </FormGroup>
        <FormGroup row>
                  <Col md="4">
                    <Label htmlFor="confrimPassword">Confirm Password</Label>
                  </Col>
                  <Col xs="12" md="7">
                  <InputGroup className="mb-3 ">
                  <InputGroupAddon addonType="prepend">
                        <InputGroupText>         
                        <i className="cui-lock-locked"></i>        
                        </InputGroupText>
                      </InputGroupAddon>
                  <Input type="password" id="confrimPassword" 
                  value = {confirmPassword} onChange={this.onConfirmPasswordChanged}/>
                  </InputGroup>
                  </Col>
        </FormGroup>
        </ModalBody>
        <ModalFooter>
        &nbsp; &nbsp; &nbsp;
        <Button color="primary" onClick={this.onUpdatePassword}>Update</Button>
        </ModalFooter>
      </Modal>
    </div>
    );
  }
}

export default ChangePasswordModal;
