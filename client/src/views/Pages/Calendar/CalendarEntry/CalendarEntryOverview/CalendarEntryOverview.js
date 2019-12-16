import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from 'reactstrap';

import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {
  getFromStorage, 
} from '../../../../../containers/DefaultLayout/utils/Storage';
import fields from '../../../WorkProfile/ProfessionForm/data/Specialtyfields';

const options = fields.UK;

function findLabel( fieldArray){
    
  let labels = []

  fieldArray.forEach(field => {
      options.forEach(element => {
          if(element.value === field){
              labels.push(element.label);
          }
      });
  });
  return labels
}

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

class CalendarEntryOverview extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      userId: '',
      specialtyFields: [],
      AM: false,
      AE: false,
      CS: false,
      CM: false,
      CR: false,
      CO: false,
      CC: false,
      DM: false,
      EM: false,
      GA: false,
      GP: false,
      GS: false,
      ID: false,
      OG: false,
      OC: false,
      OP: false,
      OM: false,
      OT: false,
      PC: false,
      NE: false,
      NU: false,
      PA: false,
      PE: false,
      PN: false,
      PG: false,
      PI: false,
      PZ: false,
      PH: false,
      PD: false,
      PU: false,
      PO: false,
      PR: false,
      PM: false,
      PS: false,
      PY: false,
      PL: false,
      CH: false,
      PB: false,
      SE: false,
      TO: false,
      UR: false,
      VS: false,
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  // componentDidMount(){

    UNSAFE_componentWillMount(){
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
          console.error(json.workProfile.specialtyFields[0].value)
          if(json.success === true) {

            // Pre-processing so that only the values are in the state field
            let fieldArray = [];
    
            json.workProfile.specialtyFields.forEach(function(field){
              fieldArray.push(field.value)
            });

            this.setState({
                specialtyFields: fieldArray,
            });

            this.showCalender(this.state.specialtyFields)

          } else {
           
            console.log('No existing workprofile found ')
          }
        });
        } else {
          console.error('user id is not found');
        }
      }
  
  // Not proud of this but it is wokring ffs
  showCalender( fieldArray){
    
        if(fieldArray.includes('AM')){
          this.setState({
            AM: true,
          });
        }
        if(fieldArray.includes('AE')){
          this.setState({
            AE: true,
          });
        }if(fieldArray.includes('CS')){
          this.setState({
            CS: true,
          });
        }
        if(fieldArray.includes('CM')){
          this.setState({
            CM: true,
          });
        }if(fieldArray.includes('CR')){
          this.setState({
            CR: true,
          });
        }if(fieldArray.includes('CO')){
          this.setState({
            CO: true,
          });
        }if(fieldArray.includes('CH')){
          this.setState({
            CH: true,
          });
        }if(fieldArray.includes('DM')){
          this.setState({
            DM: true,
          });
        }if(fieldArray.includes('EM')){
          this.setState({
            EM: true,
          });
        }if(fieldArray.includes('GA')){
          this.setState({
            GA: true,
          });
        }if(fieldArray.includes('GP')){
          this.setState({
            GP: true,
          });
        }if(fieldArray.includes('GS')){
          this.setState({
            GS: true,
          });
        }if(fieldArray.includes('ID')){
          this.setState({
            ID: true,
          });
        }if(fieldArray.includes('OG')){
          this.setState({
            OG: true,
          });
        }if(fieldArray.includes('OC')){
          this.setState({
            OC: true,
          });
        }if(fieldArray.includes('OP')){
          this.setState({
            OP: true,
          });
        }if(fieldArray.includes('OM')){
          this.setState({
            OM: true,
          });
        }if(fieldArray.includes('OT')){
          this.setState({
            OT: true,
          });
        }if(fieldArray.includes('PC')){
          this.setState({
            PC: true,
          });
        }if(fieldArray.includes('NE')){
          this.setState({
            NE: true,
          });
        }if(fieldArray.includes('NU')){
          this.setState({
            NU: true,
          });
        }if(fieldArray.includes('PA')){
          this.setState({
            PA: true,
          });
        }if(fieldArray.includes('PP')){
          this.setState({
            PP: true,
          });
        }if(fieldArray.includes('PE')){
          this.setState({
            PE: true,
          });
        }if(fieldArray.includes('PN')){
          this.setState({
            PN: true,
          });
        }if(fieldArray.includes('PG')){
          this.setState({
            PG: true,
          });
        }if(fieldArray.includes('PI')){
          this.setState({
            PI: true,
          });
        }if(fieldArray.includes('PZ')){
          this.setState({
            PZ: true,
          });
        }if(fieldArray.includes('PH')){
          this.setState({
            PH: true,
          });
        }if(fieldArray.includes('PD')){
          this.setState({
            PD: true,
          });
        }if(fieldArray.includes('PU')){
          this.setState({
            PU: true,
          });
        }if(fieldArray.includes('PO')){
          this.setState({
            PO: true,
          });
        }if(fieldArray.includes('PR')){
          this.setState({
            PR: true,
          });
        }if(fieldArray.includes('PM')){
          this.setState({
            PM: true,
          });
        }if(fieldArray.includes('PS')){
          this.setState({
            PS: true,
          });
        }if(fieldArray.includes('PY')){
          this.setState({
            PY: true,
          });
        }if(fieldArray.includes('PL')){
          this.setState({
            PL: true,
          });
        }if(fieldArray.includes('CH')){
          this.setState({
            CH: true,
          });
        }if(fieldArray.includes('PB')){
          this.setState({
            PB: true,
          });
        }if(fieldArray.includes('SE')){
          this.setState({
            SE: true,
          });
        }if(fieldArray.includes('TO')){
          this.setState({
            TO: true,
          });
        }if(fieldArray.includes('UR')){
          this.setState({
            UR: true,
          });
        }if(fieldArray.includes('VS')){
          this.setState({
            VS: true,
          });
        }
      }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>

          {this.state.AM ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.AMcard} toggle={() => { this.setState({ AMcard: !this.state.AMcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      {/* format to add clickable dropdown item */}
                      <DropdownItem tag ={Link} to="/AMcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Academic Medicine</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          {this.state.AE ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.AEcard} toggle={() => { this.setState({ AEcard: !this.state.AEcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/AEcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>

                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Anaesthesia</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}

          {this.state.CS ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.CScard} toggle={() => { this.setState({ CScard: !this.state.CScard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/CScalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Cardiothoracic surgery</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}

          {this.state.CM ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.CMcard} toggle={() => { this.setState({ CMcard: !this.state.CMcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/CMcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Anaesthesia</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}

          {this.state.CR ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.CRcard} toggle={() => { this.setState({ CRcard: !this.state.CRcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/CRcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Clinical radiology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}

          {this.state.CO ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.COcard} toggle={() => { this.setState({ COcard: !this.state.COcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/COcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Clinical oncology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}

          {this.state.CM ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.CMcard} toggle={() => { this.setState({ CMcard: !this.state.CMcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/CMcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Anaesthesia</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}

          {this.state.CC ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.CCcard} toggle={() => { this.setState({ CCcard: !this.state.CCcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/CCcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Community child health</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}

          {this.state.DM ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.DMcard} toggle={() => { this.setState({ DMcard: !this.state.DMcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/DMcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Dermatology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}

          {this.state.EM ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.EMcard} toggle={() => { this.setState({ EMcard: !this.state.EMcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/EMcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Emergency medicine</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.GA ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.GAcard} toggle={() => { this.setState({ GAcard: !this.state.GAcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/GAcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Gastrology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.GP ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.GPcard} toggle={() => { this.setState({ GPcard: !this.state.GPcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/GPcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">General</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.GS ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.GScard} toggle={() => { this.setState({ GScard: !this.state.GScard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/GScalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">General surgery</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.ID ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.IDcard} toggle={() => { this.setState({ IDcard: !this.state.IDcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/IDcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Infectious diseases</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.OG ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.OGcard} toggle={() => { this.setState({ OGcard: !this.state.OGcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/OGcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Obstetrics and gynaecology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.OC ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.OCcard} toggle={() => { this.setState({ OCcard: !this.state.OCcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/OCcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Occupational medicine</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.OP ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.OPcard} toggle={() => { this.setState({ OPcard: !this.state.OPcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/OPcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Opthalmology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.OM ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.OMcard} toggle={() => { this.setState({ OMcard: !this.state.OMcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/OMcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Oral and maxillofacial</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.OT ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.OTcard} toggle={() => { this.setState({ OTcard: !this.state.CMcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/OTcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Otolaryngology (ENT)</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PC ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PCcard} toggle={() => { this.setState({ PCard: !this.state.PCcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PCcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatrics and child helath</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.NE ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.CMcard} toggle={() => { this.setState({ NEcard: !this.state.NEcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/NEcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Neonatal medicine</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.NU ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.NUcard} toggle={() => { this.setState({ NUcard: !this.state.NUcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/NUcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Neurosurgery</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PA ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.CMcard} toggle={() => { this.setState({ PAcard: !this.state.PAcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PAcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric accident and emergency mendicine</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PP ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PPcard} toggle={() => { this.setState({ PPcard: !this.state.PPcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PPcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric clinical pharmacology and therapeutics</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PE ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PEcard} toggle={() => { this.setState({ PEcard: !this.state.PEcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PEcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric emergency medicine</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PN ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PNcard} toggle={() => { this.setState({ PNcard: !this.state.PNcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PNcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric endocrinology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}

          {this.state.PG ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PGcard} toggle={() => { this.setState({ PGcard: !this.state.PGcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PGcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric gastroenterology, hepatology and nutrition</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PI ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PIcard} toggle={() => { this.setState({ PIcard: !this.state.PIcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PIcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric infectious diseases and immunology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PZ ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PZcard} toggle={() => { this.setState({ PZcard: !this.state.PZcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PZcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric intensive care medicine</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}

          {this.state.PH ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PHcard} toggle={() => { this.setState({ PHcard: !this.state.PHcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PHcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric nephrology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PD ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.CMcard} toggle={() => { this.setState({ PDcard: !this.state.PDcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PDcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric neurodisability</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PU ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PUcard} toggle={() => { this.setState({ PUcard: !this.state.PUcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PUcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric neurology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PO ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.POcard} toggle={() => { this.setState({ CMcard: !this.state.POcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/POcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric oncology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PR ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PRcard} toggle={() => { this.setState({ PRcard: !this.state.PRcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PRcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric respiratory medicine</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PM ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PMcard} toggle={() => { this.setState({ CMcard: !this.state.PMcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PMcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric rheumatology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PS ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.CMcard} toggle={() => { this.setState({ PScard: !this.state.PScard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PScalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Paediatric surgery</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PA ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.CMcard} toggle={() => { this.setState({ PAcard: !this.state.PAcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PAcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Pathology</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.PL ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PLcard} toggle={() => { this.setState({ PLcard: !this.state.CMcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PLcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Plastic surgery</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.CH ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.CHcard} toggle={() => { this.setState({ CHcard: !this.state.CHcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/CHcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Psychiatry</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          
          {this.state.PB ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.PBcard} toggle={() => { this.setState({ PBcard: !this.state.PBcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/PBcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Public health medicine</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.SE ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.SEcard} toggle={() => { this.setState({ SEcard: !this.state.SEcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/SEcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Sport and exercise medicine</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.TO ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.TOcard} toggle={() => { this.setState({ TOcard: !this.state.TOcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/TOcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Trauma and orthopaedic surgery</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
          
          {this.state.UR ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.URcard} toggle={() => { this.setState({ URcard: !this.state.URcard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem Link to="/URcalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">urology surgery</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}

          {this.state.VS ?
            <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.VScard} toggle={() => { this.setState({ VScard: !this.state.VScard }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag ={Link} to="/VScalenderView">View Calender</DropdownItem>
                      <DropdownItem>Generate invoice</DropdownItem>
                      <DropdownItem>Search for shifts</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">Vascular surgery</div>
                <div>Hours logged:</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col> : null}
        </Row>
      </div>
    );
  }
}

export default CalendarEntryOverview;
