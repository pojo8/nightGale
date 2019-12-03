import React, { Component } from 'react';
import {
  Alert,
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
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import {
  getFromStorage, 
} from '../../../containers/DefaultLayout/utils/Storage';

class PaymentInformation extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userId: '',
      cardName: '',
      cardAddress: '',
      cardNumber:'',
      cardStartMonth: '',
      cardStartYear: '',
      cardExpiryMonth: '',
      cardExpiryYear: '',
      cardCVC: '',
      uploadSuccess: false,
      cardInfoUploadError: false,
    }

    this.onCardNameChanged = this.onCardNameChanged.bind(this);
    this.onCardAddressChanged = this.onCardAddressChanged.bind(this);
    this.onCardNumberChanged = this.onCardNumberChanged.bind(this);
    this.onCardStartMonthChanged = this.onCardStartMonthChanged.bind(this);
    this.onCardStartYearChanged = this.onCardStartYearChanged.bind(this);
    this.onCardExpiryMonthChanged = this.onCardExpiryMonthChanged.bind(this);
    this.onCardExpiryYearChanged = this.onCardExpiryYearChanged.bind(this);
    this.onCardCvcChanged = this.onCardCvcChanged.bind(this);
    
    this.onSubmitCardForm = this.onSubmitCardForm.bind(this);
    this.onResetCardForm = this.onResetCardForm.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  onCardNameChanged(event) {
    this.setState({ cardName: event.target.value });
  }

  onCardAddressChanged(event) {
    this.setState({ cardAddress: event.target.value });
  }

  onCardNumberChanged(event) {
    this.setState({ cardNumber: event.target.value });
  }

  onCardStartMonthChanged(event) {
    this.setState({ cardStartMonth: event.target.value });
  }

  onCardStartYearChanged(event) {
    this.setState({ cardStartYear: event.target.value });
  }

  onCardExpiryMonthChanged(event) {
    this.setState({ cardExpiryMonth: event.target.value});
  }

  onCardExpiryYearChanged(event) {
    this.setState({ cardExpiryYear: event.target.value });
  }

  onCardCvcChanged(event) {
    this.setState({ cardCVC: event.target.value });
  }



  onSubmitCardForm(){
    console.warn(this.state);
    const {
      userId,
      cardName,
      cardAddress,
      cardNumber,
      cardStartMonth,
      cardStartYear,
      cardExpiryMonth,
      cardExpiryYear,
      cardCVC,
      } = this.state;

    fetch('http://localhost:8080/endpoint/cardInfo/update', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        cardName: cardName,
        cardAddress: cardAddress,
        cardNumber: cardNumber,
        cardStartMonth: cardStartMonth,
        cardStartYear: cardStartYear,
        cardExpiryMonth: cardExpiryMonth,
        cardExpiryYear: cardExpiryYear,
        cardCVC: cardCVC,
      }),
    }).then( response => response.json())
    .then(json => {
      console.log('profession json: ', json);
      if(json.success === true) {
        
        this.setState({
          uploadSuccess: true,
          professionUpdateError: false,
        });
        console.log('profession update successful')

      } else {
        this.setState({
          professionUpdateError: true,
        });
        console.log('Error found in login process')
      }
    });  
  }

  onResetCardForm(){
    this.setState({
      cardName: '',
      cardAddress: '',
      cardNumber: '',
      cardStartMonth: '',
      cardStartYear: '',
      cardExpiryMonth: '',
      cardExpiryYear: '',
      cardCVC: '',
    })
  }

  componentDidMount(){
    const obj = getFromStorage('app_ng');

    if( obj && obj.token) {
          this.setState({
            userId: obj.userId,
          });
          
      fetch('http://localhost:8080/endpoint/get-cardInfo/' +obj.userId, {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json'
        },
    }).then( response => response.json())
    .then(json => {
      // console.warn(json)
      if(json.success === true) {
        this.setState({
          cardName: json.cardInfo.cardName,
          cardAddress: json.cardInfo.cardAddress,
          cardNumber: json.cardInfo.cardNumber,
          cardStartMonth: json.cardInfo.cardStartMonth,
          cardStartYear: json.cardInfo.cardStartYear,
          cardExpiryMonth: json.cardInfo.cardExpiryMonth,
          cardExpiryYear: json.cardInfo.cardExpiryYear,
          cardCVC: json.cardInfo.cardCVC,      
        });
        console.log('card info synced')

      } else {
       
        console.log('No existing card Info found ')
      }
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
      cardName,
      cardAddress,
      cardNumber,
      cardStartMonth,
      cardStartYear,
      cardExpiryMonth,
      cardExpiryYear,
      cardCVC,

    } = this.state;
    return (
      <div className="animated fadeIn">
            <Card>
              <CardHeader>
              <i className="cui-credit-card"></i><strong>Credit Card Information</strong>
{' '}
              </CardHeader>
              <CardBody>
              { this.state.Success ?
                      <Alert color="success"  isOpen={this.state.visible} toggle={this.onDismiss}>
                        Updating user Card info was successful
                      </Alert> : null
                    }
              <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="cardName"> Name</Label>
                  </Col>
                  <Col xs="12" md="7">
                  <InputGroup className="mb-3">

                  <InputGroupAddon addonType="prepend">
                        <InputGroupText>         
                        <i className="cui-user"></i>        
                        </InputGroupText>
                      </InputGroupAddon>
                  <Input type="text" id="cardName" 
                    value={cardName} onChange={this.onCardNameChanged}
                  />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="address"> Address</Label>
                  </Col>
                  <Col xs="12" md="7">
                  <InputGroup className="mb-3">

                  <InputGroupAddon addonType="prepend">
                        <InputGroupText>         
                        <i className="fa fa-home"></i>        
                        </InputGroupText>
                      </InputGroupAddon>
                  <Input type="text" id="address" 
                    value={cardAddress} onChange={this.onCardAddressChanged}
                  />
                  </InputGroup>
                </Col>
              </FormGroup>
                <FormGroup row>
                <Col md="3">
                  <Label>Card Number</Label>
                </Col>
                  <Col xs="12" md="7">

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="fa fa-credit-card"></i></InputGroupText>
                    </InputGroupAddon>
                    <TextMask
                      mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                      Component={InputAdapter}
                      className="form-control"
                      value={cardNumber}
                      onChange={this.onCardNumberChanged}
                    />
                  </InputGroup>
                  <FormText color="muted">
                    ex. 9999 9999 9999 9999
                  </FormText>
                  </Col>
                </FormGroup>
              <FormGroup row>
                  <Col md="2">
                    <Label><strong>Valid from:</strong></Label>
                  </Col>
                  <Col md="1">
                    <Label htmlFor="startMonth">Month</Label>
                  </Col>
                  <Col xs="3">
                  <InputGroup className="mb-3">

                  <InputGroupAddon addonType="prepend">
                      <InputGroupText> 
                      <i className="fa fa-calendar"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                      <Input type="select" name="startMonth" id="startMonth"
                      value={cardStartMonth} onChange={this.onCardStartMonthChanged}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </Input>
                      </InputGroup>
                  </Col>
                  <Col md="1">
                    <Label htmlFor="startYear">Year</Label>
                  </Col>
                  <Col xs="3">
                  <InputGroup className="mb-3">

                  <InputGroupAddon addonType="prepend">
                      <InputGroupText> 
                      <i className="fa fa-calendar"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                      <Input type="select" name="startYear" id="startYear"
                      value={cardStartYear} onChange={this.onCardStartYearChanged}>
                      <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2014</option>
                        <option>2015</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                        <option>2032</option>
                        <option>2033</option>
                        <option>2034</option>
                        <option>2035</option>
                        <option>2036</option>
                        <option>2037</option>
                        <option>2038</option>
                      </Input>
                      </InputGroup>
                    </Col>
                  
              </FormGroup>
 
                <FormGroup row>
                  <Col md="2">
                    <Label htmlFor="address"><strong>Expires on:</strong></Label>
                  </Col>
                  <Col md="1">
                    <Label htmlFor="expiryMonth">Month</Label>
                  </Col>
                  <Col xs="3">
                  <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                      <InputGroupText> 
                      <i className="fa fa-calendar"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                      <Input type="select" name="expiryMonth" id="expiryMonth"
                      value={cardExpiryMonth} onChange={this.onCardExpiryMonthChanged}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </Input>
                      </InputGroup>
                  </Col>
                  <Col md="1">
                    <Label htmlFor="expiryYear">Year</Label>
                  </Col>
                  <Col xs="3">
                  <InputGroup className="mb-3">

                    <InputGroupAddon addonType="prepend">
                      <InputGroupText> 
                      <i className="fa fa-calendar"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                      <Input type="select" name="expiryYear" id="expiryYear"
                      value={cardExpiryYear} onChange={this.onCardExpiryYearChanged}>
                      <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2014</option>
                        <option>2015</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                        <option>2032</option>
                        <option>2033</option>
                        <option>2034</option>
                        <option>2035</option>
                        <option>2036</option>
                        <option>2037</option>
                        <option>2038</option>
                      </Input>
                      </InputGroup>
                    </Col>
                  
              </FormGroup>
                <FormGroup row>
                  <Col md="2">

                      <Label htmlFor="cvv">CVV/CVC</Label>
                      </Col>
                      <Col md="1">
                  </Col>
                      <Col xs="3">
                      <InputGroup className="mb-3">

                      <InputGroupAddon addonType="prepend">
                        <InputGroupText> 
                        <i className="fa fa-asterisk"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="cvv" placeholder="123" required 
                      value={cardCVC} onChange={this.onCardCvcChanged}/>
                      </InputGroup>
                      </Col>
                    </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.onSubmitCardForm}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                &nbsp; &nbsp; &nbsp;

                <Button type="reset" size="sm" color="danger" onClick={this.onResetCardForm}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
              </Card>

      </div>
    );
  }
}

export default PaymentInformation;
