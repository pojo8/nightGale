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



class LocationForm extends Component {
  constructor(props) {
    super(props);

    this.state ={ 
      userId: '',
      street: '',
      city: '',
      postCode: '',
      country: '',
      travelDistance: '',
    }

    this.onStreetChanged = this.onStreetChanged.bind(this);
    this.onCityChanged = this.onCityChanged.bind(this);
    this.onPostCodechanged = this.onPostCodeChanged.bind(this);
    this.onCountryChanged = this.onCountryChanged.bind(this);
    this.onTravelDistanceChanged = this.onTravelDistanceChanged.bind(this);

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

  onStreetChanged(event){
    this.setState({
      street:event.target.value,
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
      street,
      city,
      postCode,
      country,
      travelDistance,
    } = this.state

    alert(this.state);

  }

  onResetLocationForm(){
    const { 
      userId,
      street,
      city,
      postCode,
      country,
      travelDistance,
    } = this.state

    alert(this.state);

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
      street,
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
                <FormGroup>
                  {/* <Text> Address information</Text> */}
                  <Label htmlFor="street">Address</Label>
                  <Input type="text" id="street" placeholder="Enter your address" 
                  value={street} onChange={this.onStreetChanged}/>
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
                      <Label htmlFor="postal-code">Postal Code</Label>
                      <Input type="text" id="postal-code" placeholder="Postal Code"
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
                <Button type="reset" size="sm" color="danger" onClick={this.onResetLocationForm}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
       
      </div>
    );
  }
}

export default LocationForm;
