import React, { Component } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Media,
  Progress,
} from 'reactstrap';

import {
  getFromStorage, 
} from '../../../../containers/DefaultLayout/utils/Storage';

class CertificationForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      gmcNumber:'',
      userId:'',
      gmcImage:'',
      f1CertImage:'',
      medicalCertImage:'',
      vaccinationHistImage:'',
      // FIXME Create the correct format for references
      references:'',
      certificationUpdateError: false,
      uploadSuccess: null,
      visible: true,
    }

    this.onF1CertUpload = this.onF1CertUpload.bind(this);
    this.onGmcUpload = this.onGmcUpload.bind(this);
    this.onMedCertUpload = this.onMedCertUpload.bind(this);
    this.onGmcNumberChanged = this.onGmcNumberChanged.bind(this);
    // this.onReferenceUpload = this.onReferenceUpload.bind(this);
    this.onResetCertificateInfo = this.onResetCertificateInfo.bind(this);
    this.onSubmitCertificateInfo = this.onSubmitCertificateInfo.bind(this);
    this.onDismiss = this.onDismiss.bind(this);


    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  onDismiss() {
    this.setState({ 
      visible: false,
      uploadSuccess: false 
    });
  }

  componentDidMount(){
    const obj = getFromStorage('app_ng');

    if( obj && obj.token) {
          console.log(obj.userId);
          this.setState({
            userId: obj.userId,
          });
          fetch('http://localhost:8080/endpoint/get-workProfile/' +obj.userId, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json'
            },
        }).then( response => response.json())
        .then(json => {
          console.log('certifaction work profile json: ', json);
          if(json.success === true) {
            console.warn(json.workProfile);
            console.warn('addy ' + json.workProfile.address )
            
            // Need to find a means of representing the image data

            // need to convert it back to image
            this.setState({
                gmcNumber: json.workProfile.gmcNumber,
                gmcImage: json.workProfile.gmcImage,
                f1CertImage: json.workProfile.f1CertImage,
                medicalCertImage: json.workProfile.medicalCertImage,
                vaccinationHistImage: json.workProfile.vaccinationHistImage,
                references: json.workProfile.references,
            });
            console.log('certification info synced')
    
          } else {
           
            console.log('No existing workprofile found ')
          }
        });
        } else {
          console.error('user id is not found');
        }
      }

  onGmcSelectedHandler = event => {
    let file = event.target.files[0];
    
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload=(e)=> {
      console.warn('img data', e.target.result)
      this.setState({gmcImage: e.target.result})

    }  
  }

  onF1SelectedHandler = event => {
    let file = event.target.files[0];
    
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload=(e)=> {
      console.warn('img data', e.target.result)
      this.setState({f1CertImage: e.target.result})

    }  
  }

  onMedCertSelectedHandler = event => {
    let file = event.target.files[0];
    
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload=(e)=> {
      console.warn('img data', e.target.result)
      this.setState({medicalCertImage: e.target.result})

    }  
  }

  onVacinationHistSelectedHandler = event => {
    let file = event.target.files[0];
    
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload=(e)=> {
      console.warn('img data', e.target.result)
      this.setState({vaccinationHistImage: e.target.result})

    }  
  }

  onReferenceSelectedHandler = event => {
    let file = event.target.files[0];
    
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload=(e)=> {
      console.warn('img data', e.target.result)
      this.setState({references: e.target.result})

    }  
  }

  onF1CertUpload() {
    const {
      userId,
      f1CertImage,
      } = this.state;

      console.log('State before htransit: '+ this.state.f1)

    fetch('http://localhost:8080/endpoint/workProfile/certification-update', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        f1CertImage: f1CertImage,
      }),
    }).then( response => response.json())
    .then(json => {
      console.log('certification json: ', json);
      if(json.success === true) {
        this.setState({
          uploadSuccess: true,
          certificationUpdateError: false,
        });
        console.log('certification upload f1 successful')

      } else {
        this.setState({
          // loginSuccess: false,
          certificationUpdateError: true,
        });
        console.log('Error: uploading f1 certificate')
      }
    }); 
  }

  onGmcNumberChanged(event){
    this.setState({
      gmcNumber: event.target.value
    })
  }

  onGmcUpload() {
    const {
      userId,
      gmcImage,

      } = this.state;

      console.log('State before htransit: '+ this.state.gmcImage)

    fetch('http://localhost:8080/endpoint/workProfile/certification-update', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        gmcImage: gmcImage,
      }),
    }).then( response => response.json())
    .then(json => {
      console.log('certification json: ', json);
      if(json.success === true) {
        this.setState({
          uploadSuccess: true,
          certificationUpdateError: false,
        });
        console.log('certification upload gmc successful')

      } else {
        this.setState({
          // loginSuccess: false,
          certificationUpdateError: true,
        });
        console.log('Error: uploading gmc certificate')
      }
    }); 
  }

  onMedCertUpload() {
    const {
      userId,
      medicalCertImage,

      } = this.state;

      console.log('State before htransit: '+ this.state.medicalCertImage)

    fetch('http://localhost:8080/endpoint/workProfile/certification-update', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        medicalCertImage: medicalCertImage,
      }),
    }).then( response => response.json())
    .then(json => {
      console.log('certification json: ', json);
      if(json.success === true) {
        this.setState({
          uploadSuccess: true,
          certificationUpdateError: false,
        });
        console.log('certification upload gmc successful')

      } else {
        this.setState({
          // loginSuccess: false,
          certificationUpdateError: true,
        });
        console.log('Error: uploading gmc certificate')
      }
    }); 
  }


  onResetCertificateInfo() {
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

      });
    }

    onSubmitCertificateInfo() {

      const {
        userId,
        gmcNumber,
        f1CertImage,
        gmcImage,
        vaccinationHistImage,
        medicalCertImage,
        references        
        } = this.state;
  
  
      fetch('http://localhost:8080/endpoint/workProfile/certification-update', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          gmcNumber: gmcNumber,         
          f1CertImage: f1CertImage,
          gmcImage: gmcImage,
          vaccinationHistImage: vaccinationHistImage,
          medicalCertImage: medicalCertImage,
          references: references 
        }),
      }).then( response => response.json())
      .then(json => {
        console.log('certification json: ', json);
        if(json.success === true) {
          
          this.setState({
            uploadSuccess: true,
            certificationUpdateError: false,
          });
          console.log('certification update successful')
  
        } else {
          this.setState({
            certificationUpdateError: true,
          });
          console.log('Error found in login process')
        }
      });  }



  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {

    const { 
      gmcNumber,
        } = this.state;

    return (
      <div className="animated fadeIn"> 
            <Card>
              <CardHeader>
              <i className="fa fa-graduation-cap"></i><strong>Ceritifactions</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                { this.state.uploadSuccess ?
                      <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                        File upload was successful
                      </Alert> : null
                    }
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="gmcNumber" >GMC number</Label>
                    </Col>
                    <Col xs="12" md="6">
                      <Input type="text" id="gmcNumber" placeholder=""
                      value= {gmcNumber} onChange={this.onGmcNumberChanged}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="cv-input">Upload GMC certificate</Label>
                    </Col>
                    <Col xs="12" md="4">
                      <CustomInput type="file" id="dbs-input" name="dbs-input" 
                      onChange={this.onGmcSelectedHandler}/>
                    </Col>
                    <Col xs="12" md="2">
                          <Media>
                           <Media object class="mr-3" src={this.state.gmcImage} />
                          </Media>
                      </Col>
                    <Col xs="12" md="3">
                      <Button color="success" onClick={this.onGmcUpload}><i className="fa fa-upload"></i> GMC certificate</Button>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Upload F1 signed off certifacte</Label>
                    </Col>
                    <Col xs="12" md="4">
                      <CustomInput type="file" id="dbs-input" name="dbs-input" 
                       onChange={this.onF1SelectedHandler}/>
                    </Col>
                    <Col xs="12" md="2">
                          <Media>
                            <Media object class="mr-3" src={this.state.f1CertImage} />
                          </Media>
                      </Col>
                    <Col xs="12" md="3">
                      <Button color="success" onClick={this.onF1CertUpload}><i className="fa fa-upload"></i> F1 Certificate</Button>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Upload Medical certificate</Label>
                    </Col>
                    <Col xs="12" md="4">
                      <CustomInput type="file" id="dbs-input" name="dbs-input" 
                      onChange={this.onMedCertSelectedHandler}/>
                    </Col>
                    <Col xs="12" md="2">
                          <Media class="media">
                           <Media object class="mr-3" src={this.state.medicalCertImage}/>
                          </Media>
                      </Col>
                    <Col xs="12" md="3">
                      <Button color="success" onClick={this.onMedCertUpload}><i className="fa fa-upload"></i> Medical certificate</Button>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-multiple-input">Upload Vacination history</Label>
                    </Col>
                    <Col xs="12" md="4">
                      <CustomInput type="file" id="dbs-input" name="dbs-input" 
                      onChange={this.onVacinationHistSelectedHandler}/>
                    </Col>
                    <Col xs="12" md="2">
                          <Media class="media">
                           <Media object class="mr-3" src={this.state.vaccinationHistImage}/>
                          </Media>
                      </Col>
                    <Col xs="12" md="3">
                      <Button color="success" onClick={this.onVacinationHistUpload}><i className="fa fa-upload"></i> Vacination History</Button>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="references-input">References</Label>
                    </Col>
                    <Col xs="12" md="4">
                      <CustomInput type="file" id="references-input" name="references-input"
                       onChange={this.onReferenceSelectedHandler}/>
                    </Col>
                    <Col xs="12" md="2">
                          <Media class="media">
                           <Media object class="mr-3" src={this.state.references} />
                          </Media>
                      </Col>
                    <Col xs="12" md="3">
                      <Button color="success" onClick={this.onReferenceUpload}><i className="fa fa-upload"></i> References</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.onSubmitCertificateInfo}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button type="reset" size="sm" color="danger" onClick={this.onResetCertificateInfo}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
            
            {/* // the validation webscraper  */}
            <Card>
              <CardHeader>
              <i className="fa fa-id-card"></i><strong>Validate account</strong>
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col >
                    <Label htmlFor="company">Validates the account using the supplied GMC number and the user name</Label>
                  </Col>
                </FormGroup>
                <Progress multi>
                <Label htmlFor="company">Validates the account using the supplied GMC number and the user name</Label>
                  <Progress bar color="success" value={30} />
         
                </Progress>


              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
      </div>
    );
  }
}

export default CertificationForm;
