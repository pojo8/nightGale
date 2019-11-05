import React, { Component } from 'react';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import {
  Badge,
  Button,
  // ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  // Collapse,
  // DropdownItem,
  // DropdownMenu,
  // DropdownToggle,
  // Fade,
  Form,
  FormGroup,
  FormText,
  // FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

import fields from './data/Specialtyfields';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';

const options = fields.UK;

class ProfessionForm extends Component {
  constructor(props) {
    super(props);
    this.saveChanges = this.saveChanges.bind(this);
    this.onSubmitSpecFields = this.onSubmitSpecFields.bind(this);
    this.onResetSpecFields = this.onResetSpecFields.bind(this);

    // add the bindings for the onchange methods
    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onDbsUpload = this.onDbsUpload.bind(this);
    this.onCvUpload = this.onCvUpload.bind(this);
    this.onFirstNameChanged = this.onFirstNameChanged.bind(this);
    this.onLastNameChanged =  this.onLastNameChanged.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onDobChanged = this.onDobChanged.bind(this);
    this.onWorkHistoryChanged = this.onWorkHistoryChanged.bind(this);

    // onchge for dbs and cv must convert to byte array for mongo storage

    this.state ={
      specialtyFields: [],
      username: '',
      dbs: '',
      cv: '',
      firstName: '',
      lastName: '',
      email: '',
      dob:'',
      workHistory: '',
    }

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }
  onSubmitSpecFields() {
    alert('submit pressed')
  }

  onResetSpecFields() {
    alert('reset pressed')
  }

  saveChanges(specialtyFields) {
    this.setState({ specialtyFields });
  }

  onUsernameChanged(username) {
    this.setState({ username });
  }
  
  // FIXME convert to byte array for mongo storage
  onDbsUpload(dbs) {
    this.setState({ dbs });
  }

  onCvUpload(cv) {
    this.setState({ cv });
  }

  onFirstNameChanged(firstName) {
    this.setState({ firstName });
  }
  
  onLastNameChanged(lastName) {
    this.setState({lastName});
  }

  onEmailChanged(email) {
    this.setState({ email });
  }

  onDobChanged(dob) {
    this.setState({ dob })
  }

  onWorkHistoryChanged(workHistory) {
    this.setState({ workHistory });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {

    const {
      specialtyFields,
      username,
      dbs,
      cv,
      firstName,
      lastName,
      email,
      dob,
      workHistory
    } = this.state;

    return (
      <div className="animated fadeIn">
 
            <Card>
              <CardHeader>
              <i className="icon-briefcase"/><strong>Profession information</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Username</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="Text" 
                      value={username} onChange={this.onUsernameChanged}/>
                      <FormText color="muted">Name that appears during swap process</FormText>
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="firstName" >First name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="firstName" placeholder="Jane " required 
                      value= {firstName} onChange={this.onFirstNameChanged}/>
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Col md="3">

                    <Label htmlFor="lastName" >Last name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="lastName" placeholder="Doe" required 
                      value= {lastName} onChange={this.onLastNameChanged}/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email Input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email"
                      value = {email} onChange={this.onEmailChanged}/>
                      <FormText className="help-block">Please enter your email</FormText>
                    </Col>
                  </FormGroup>
                  
                  <FormGroup>
                  <Label>Date input</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="fa fa-calendar"></i></InputGroupText>
                    </InputGroupAddon>
                    <TextMask
                      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                      Component={InputAdapter}
                      className="form-control"
                      value={dob} 
                      onChange={this.onDobChanged}
                    />
                  </InputGroup>
                  <FormText color="muted">
                    ex. 99/99/9999
                  </FormText>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                      <FormText className="help-block">Please enter a complex password</FormText>
                    </Col>
                  </FormGroup>                  
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Work history</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                             placeholder="Content..."  
                             value={workHistory} onChange={this.onWorkHistoryChanged}/>
                    </Col>
                  </FormGroup>
                           <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Upload CV</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="cv-input" name="cv-input" 
                      value = {cv} onChange={this.onCvUpload} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Upload DBS check</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="dbs-input" name="dbs-input" 
                      value = {dbs} onChange={this.onDbsUpload}/>
                    </Col>
                  </FormGroup>
                  
                  
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.onSubmitProfessionInfo}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger" onClick={this.onResetProfessionInfo}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <i className="icon-list"></i><strong>Specialty Fields</strong>{' '}
                <div className="card-header-actions">
              </div>
            </CardHeader>
            <CardBody>
              <Select
                name="specialtyFields"
                value={specialtyFields}
                options={options}
                onChange={this.saveChanges}
                multi
              />
            </CardBody>
            <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o" 
                onClick={this.onSubmitSpecFields}></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban" 
                onClick={this.onResetSpecFields}></i> Reset</Button>
              </CardFooter>
          </Card>
            
      </div>
    );
  }
}

export default ProfessionForm;
