import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

import {
  getFromStorage, 
} from '../../../../containers/DefaultLayout/utils/Storage';


class CertificationForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      userId:'',
      gmc:'',
      f1:'',
      medCert:'',
      vacHist:'',
      references:'',
    }

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
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


  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {

    const { 
      userId,
      gmc,
      f1,
      medCert,
      vacHist,
      references
    } = this.state;

    return (
      <div className="animated fadeIn">
 
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>Ceritifactions</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                 
                  
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="cv-input">Upload GMC certificate</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="dbs-input" name="dbs-input" 
                      value = {gmc} onChange={this.onF1CertUpload}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Upload F1 signed off certifacte</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="dbs-input" name="dbs-input" 
                      value = {f1} onChange={this.onF1CertUpload}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Upload Medical certificate</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="dbs-input" name="dbs-input" 
                      value = {medCert} onChange={this.onMedCertUpload}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-multiple-input">Upload Vacination history</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="dbs-input" name="dbs-input" 
                      value = {vacHist} onChange={this.onVaccinationHistUpload}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="references-input">References</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="references-input" name="references-input"
                       value = {references} onChange={this.onreferencetUpload}/>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={this.onSubmitCertificateInfo}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger" onClick={this.onResetCertificateInfo}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <strong>Inline</strong> Form
              </CardHeader>
              <CardBody>
                <Form action="" method="post" inline>
                  <FormGroup className="pr-1">
                    <Label htmlFor="exampleInputName2" className="pr-1">Name</Label>
                    <Input type="text" id="exampleInputName2" placeholder="Jane Doe" required />
                  </FormGroup>
                  <FormGroup className="pr-1">
                    <Label htmlFor="exampleInputEmail2" className="pr-1">Email</Label>
                    <Input type="email" id="exampleInputEmail2" placeholder="jane.doe@example.com" required />
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
          
      </div>
    );
  }
}

export default CertificationForm;
