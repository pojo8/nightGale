import React, { Component } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import {
  getFromStorage, 
} from '../../../../containers/DefaultLayout/utils/Storage';



class LocationForm extends Component {
  constructor(props) {
    super(props);

    this.state ={ 
      userId: '',
      address: '',
      city: '',
      postCode: '',
      country: '',
      travelDistance: '',
      locationUpdateError: false,
      uploadSuccess: false,
      visible: true,
    }

    this.onAddressChanged = this.onAddressChanged.bind(this);
    this.onCityChanged = this.onCityChanged.bind(this);
    this.onPostCodeChanged = this.onPostCodeChanged.bind(this);
    this.onCountryChanged = this.onCountryChanged.bind(this);
    this.onTravelDistanceChanged = this.onTravelDistanceChanged.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSubmitLocationForm = this.onSubmitLocationForm.bind(this);
    this.onResetLocationForm = this.onResetLocationForm.bind(this);

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
      uploadSuccess: false });
  }

  componentDidMount(){
    const obj = getFromStorage('app_ng');

    if( obj && obj.token) {
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
      console.log('location work profile json: ', json);
      if(json.success === true) {
        this.setState({
          address: json.workProfile.address,
          city: json.workProfile.city,
          postCode: json.workProfile.postCode,
          country: json.workProfile.country,
          travelDistance: json.workProfile.travelDistance,
        });
        console.log('location info synced')

      } else {
       
        console.log('No existing workprofile found ')
      }
    });
    } else {
      console.error('user id is not found');
    }
  }

  onAddressChanged(event){
    this.setState({
      address:event.target.value,
    });
  }

  onCityChanged(event){
    this.setState({
      city:event.target.value,
    });
  }

  onPostCodeChanged(event){
    this.setState({
      postCode:event.target.value,
    });
  }

  onCountryChanged(event){
    this.setState({
      country:event.target.value,
    });
  }

  onTravelDistanceChanged(event){
    this.setState({
      travelDistance:event.target.value,
    });
  }

  onSubmitLocationForm(){
    const { 
      userId,
      address,
      city,
      postCode,
      country,
      travelDistance,
    } = this.state

    fetch('http://localhost:8080/endpoint/workProfile/location-update', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        address: address,
        city: city,
        postCode: postCode,
        country: country,
        travelDistance: travelDistance,
      }),
    }).then( response => response.json())
    .then(json => {
      // console.log('location json: ', json);
      if(json.success === true) {
        
        this.setState({
          uploadSuccess: true,
          locationUpdateError: false,
        });
        console.log('location update successful')

      } else {
        this.setState({
          uploadSuccess: false,
          locationUpdateError: true,
        });
        console.log('Error found in login process')
      }
    });

  }

  onResetLocationForm(){
  
    this.setState({
          address: '',
          city: '',
          postCode: '',
          country: '',
          travelDistance:''
        });

  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }




  render() {

    const { 
      address,
      city,
      postCode,
      country,
      travelDistance,
    } = this.state

    return (
      <div className="animated fadeIn">
            <Card>
              <CardHeader>
              <i className="icon-location-pin"></i><strong>Current Address</strong>{' '}
              </CardHeader>
              <CardBody>
              { this.state.uploadSuccess ?
                      <Alert color="success"  isOpen={this.state.visible} toggle={this.onDismiss}>
                        Upload was successful
                      </Alert> : null
                    }
                <FormGroup>
                  {/* <Text> Address information</Text> */}
                  <Label htmlFor="address">Address</Label>
                  <Input type="text" id="address" placeholder="Enter your address" 
                  value={address} onChange={this.onAddressChanged}/>
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="city">City</Label>
                      <Input type="text" id="city" placeholder="Enter your city" 
                      value={city} onChange={this.onCityChanged}/>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postCode">Postal Code</Label>
                      <Input type="text" id="postCode" placeholder="Postal Code"
                      value= {postCode} onChange={this.onPostCodeChanged} />
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="country">Country</Label>
                  <Input type="text" id="country" placeholder="Country name" 
                  value ={country} onChange={this.onCountryChanged} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="travel-distance">Travel distance (km)</Label>
                  <Input type="text" id="travel-distance" placeholder="Distance willing to travel" 
                  value={travelDistance} onChange={this.onTravelDistanceChanged}/>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.onSubmitLocationForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button type="reset" size="sm" color="danger" onClick={this.onResetLocationForm}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
       
      </div>
    );
  }
}

export default LocationForm;
