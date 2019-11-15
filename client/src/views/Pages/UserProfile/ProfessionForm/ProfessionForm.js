import React, { Component } from 'react';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import {
  Badge,
  Button,
  // ButtonDropdown,
  Card,
  CardBody,
  CardImage,

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

import {
  getFromStorage, 
} from '../../../../containers/DefaultLayout/utils/Storage';

import {
  Base64Encode,
  Base64Decode, 
} from '../../../../containers/DefaultLayout/utils/B64Methods';

const options = fields.UK;

class ProfessionForm extends Component {
  constructor(props) {
    super(props);
    this.saveChanges = this.saveChanges.bind(this);
    this.onSubmitProfessionInfo = this.onSubmitProfessionInfo.bind(this);
    this.onResetProfessionInfo = this.onResetProfessionInfo.bind(this);

    // add the bindings for the onchange methods
    this.onDbsUpload = this.onDbsUpload.bind(this);
    this.onCvUpload = this.onCvUpload.bind(this);
    this.onFirstNameChanged = this.onFirstNameChanged.bind(this);
    this.onLastNameChanged =  this.onLastNameChanged.bind(this);
    this.onEmailChanged = this.onEmailChanged.bind(this);
    this.onDobChanged = this.onDobChanged.bind(this);
    this.onWorkHistoryChanged = this.onWorkHistoryChanged.bind(this);

    // onchge for dbs and cv must convert to byte array for mongo storage

    this.state ={
      userId: '',
      specialtyFields: [],
      dbsImage: '',
      dbsNumber:'',
      cvImage: '',
      firstName: '',
      lastName: '',
      email: '',
      dob:'',
      workHistory: '',
      professionUpdateError: false,
    }

    // this.toggle = this.toggle.bind(this);
    // this.toggleFade = this.toggleFade.bind(this);
    // this.state = {
    //   collapse: true,
    //   fadeIn: true,
    //   timeout: 300
    // };
  }

  componentDidMount(){
    const obj = getFromStorage('app_ng');

    if( obj && obj.token) {
          console.log(obj.userId);
          this.setState({
            userId: obj.userId,
          });

        } else {
          console.error('user id is not found');
        }
  }

  onSubmitProfessionInfo() {

    const {
      userId,
      specialtyFields,
      dbsImage,
      dbsNumber,
      cvImage,
      firstName,
      lastName,
      email,
      dob,
      workHistory
      } = this.state;

      console.log('State before htransit: '+ this.cvI)

    fetch('http://localhost:8080/endpoint/workProfile/profession-update', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        specialtyFields: specialtyFields,
        dbsImage: dbsImage,
        dbsNumber: dbsNumber,
        cvImage: cvImage,
        dob: dob,
        firstName: firstName,
        lastName: lastName,
        email:email,
        workHistory: workHistory,
      }),
    }).then( response => response.json())
    .then(json => {
      console.log('profession json: ', json);
      if(json.success === true) {
       
        console.log('profession update successful')

      } else {
        this.setState({
          loginSuccess: false,
          professionUpdateError: true,
        });
        console.log('Error found in login process')
      }
    });  }

  onResetProfessionInfo() {
    this.setState({
      specialtyFields: '',
      dbsImage: null,
      dbsNumber: '',
      cvImage: null,
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      workHistory:'',

    });  }

  saveChanges(specialtyFields) {
    this.setState({ specialtyFields });
  }

  
  // FIXME convert to byte array for mongo storage
  
  onDbsSelectedHandler = event => {
    console.log(event.target.files[0])
  }

  onDbsUpload(dbs) {
    this.setState({ dbs });
  }
  onDbsNumberChanged(dbsNumber) {
    this.setState({ dbsNumber });
  }

  onCvSelectedHandler = event => {
    let file = event.target.files[0];
    

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload=(e)=> {
      console.warn('img data', e.target.result)
      this.setState({cvImage: e.target.result})

    }
    //let b64File = Base64Encode(event.target.files[0])
    //console.log(b64File)
   // console.log(event.target.files[0])

  }

  onCvUpload() {
    const {
      userId,
      cvImage,

      } = this.state;

      console.log('State before htransit: '+ this.state.cvImage)

    fetch('http://localhost:8080/endpoint/workProfile/profession-upload-cv', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        cvImage: cvImage,
      }),
    }).then( response => response.json())
    .then(json => {
      console.log('profession json: ', json);
      if(json.success === true) {
       
        console.log('profession upload cv successful')

      } else {
        this.setState({
          loginSuccess: false,
          professionUpdateError: true,
        });
        console.log('Error: uploading cv')
      }
    });  }

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
      userId,
      specialtyFields,
      dbsImage,
      dbsNumber,
      cvImage,
      firstName,
      lastName,
      email,
      dob,
      workHistory,
      professionUpdateError 
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
                  
                  <FormGroup row>
                  <Col md="3">
                    <Label>Date of birth</Label>
                    </Col>
                    <Col xs="12" md="9">

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
                      <Label htmlFor="specialtyFields">Specialty fields</Label>
                    </Col>
                    <Col xs="12" md="9">

                    <Select
                      name="specialtyFields"
                      value={specialtyFields}
                      options={options}
                      onChange={this.saveChanges}
                      multi
                    />
                  </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Cv</Label>
                    </Col>
                    <Col xs="12" md="6">
                      <Input type="file" id="cvImage" name="cvImage" 
                       onChange={this.onCvSelectedHandler}  />
                      </Col>
                      <Col xs="12" md="3">
                      <Button color="success" onClick={this.onCvUpload}><i className="fa fa-upload"></i> Upload Cv</Button>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="3">
                      <Label htmlFor="dbsNumber" >DBS Certificate number</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="dbsNumber" placeholder="" required 
                      value= {dbsNumber} onChange={this.onDbsSelectedHandler}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input"> DBS Certificate</Label>
                    </Col>
                    <Col xs="12" md="6">
                      <Input type="file" id="dbsImage-input" name="dbsImage-input" 
                      value = {dbsImage} onChange={this.onDbsUpload}/>
                    </Col>
                      <Col xs="12" md="3">
                      <Button color="success" onClick={this.onDbsUpload}><i className="fa fa-upload"></i> Upload Dbs</Button>
                    </Col>
                    </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.onSubmitProfessionInfo}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button type="reset" size="sm" color="danger" onClick={this.onResetProfessionInfo}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
           
            
      </div>
    );
  }
}

export default ProfessionForm;
