import React, { Component } from 'react';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import DefaultHeaderDropdown  from './DefaultHeaderDropdown'
import logo from '../../Images/falcon.png';
import calImg from '../../Images/calender.png';

import {
  getFromStorage, 
  clearStorage,
} from './utils/Storage';

const propTypes = {
  children: PropTypes.node,
};



const defaultProps = {};

class DefaultHeader extends Component {

  constructor(){
    super()
    this.state ={
      token:'',
      userId:'',
      logOutSuccess: false,
    };

    this.onLogout = this.onLogout.bind(this);
  }

  navigateToLogin(){
    this.props.history.push('/'); 
   }

  componentDidMount(){
    const obj = getFromStorage('app_ng');
    // console.log(obj);
    // console.log(obj.token);
    if( obj && obj.token) {
      console.log(obj.token);
      const { token } = obj;
      // Verify token 
      fetch('http://localhost:8080/endpoint/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success){
          this.setState({
            token: obj.token,
            userId: obj.userId,
          });
          // console.log('token verfy failed')
        } else {
          console.error('token is not found');
          this.setState({
            token:'',
            userId:'',
            logOutSuccess:true,
          });
        }
      });
    } else {
      console.log('error but in the base');
      this.setState({
        token:'',
        userId: '',
        logOutSuccess:true,
      });
    }
  }

  onLogout(){
    const obj = getFromStorage('app_ng');
    // console.error('Tokoen looking for '+ obj.token)
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('http://localhost:8080/endpoint/account/logout?token='+token)
      .then(res =>  
        res.json())
      .then(json => {
        console.log(json)
        if (json.success ) {
         // this.navigateToLogin();

          this.setState({
            token:'',
            userId: '',
            logOutSuccess:true,
          });
          // console.log('b4:'+localStorage);
          // clears the apps local storage 
          clearStorage('app_ng');
          // navigate back to login if successful
        } else {

          console.error('Removing token was not successful')
        }
      });
    } else {
      console.error('token is empty');
      }
    
  }

  render() {

    // Redirect using state change
    if (this.state.logOutSuccess === true ){
      return <Redirect to='/login' />
    }

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: calImg, width: 50, height: 50, alt: 'CoreUI Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        {/* Toggle bar on the left
         <AppSidebarToggler className="d-md-down-none" display="lg">Name</AppSidebarToggler> /> */}
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/dashboard" className="nav-link" >Dashboard</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/AMcalendarEntry" >AM Entry</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/AMcalendarView" >AM View</Link>
          </NavItem>
          {/* <NavItem className="px-3">
            <Link to="/users">Users</Link>
          </NavItem> */}
          <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <DefaultHeaderDropdown notif/>
          <DefaultHeaderDropdown tasks/>
          <DefaultHeaderDropdown mssgs/>

          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <Button onClick={this.onLogout}><i className="icon-logout"></i></Button>
          </NavItem>
          </Nav>
        {/* The three lines on the right */}
        <AppAsideToggler className="d-md-down-none"/>
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
