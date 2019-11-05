import React, { Component } from 'react';
import { Button, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import DefaultHeaderDropdown  from './DefaultHeaderDropdown'
import logo from '../../Images/falcon.png';
import calImg from '../../Images/calender.png';

import {
  getFromStorage,
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
    };

    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount(){
    const obj = getFromStorage('the_main_app');
    if( obj && obj.token) {
      const { token } = obj;
      // Verify token 
      fetch('http://localhost:8080/endpoint/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success){
          this.setState({
            token,
          });
        } else {
          console.error('token is not found');
        }
      });
    } else {
      console.log('error but in the base');
    }
  }

  onLogout(){
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('http://localhost:8080/endpoint/account/logout?token='+token)
      .then(res => res.json)
      .then(json => {
        if (json.success) {
          this.setState({
            token:'',
          });
          // navigate back to login if successful
          this.navigateToLogin();

        } else {
          console.error('Removing token was not successful')
        }
      });
    } else {
      console.error('token is not found');
      }
    
  }

  navigateToLogin(){
    this.props.history.push('/login'); 
   }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: calImg, width: 50, height: 50, alt: 'CoreUI Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/" className="nav-link" >Dashboard</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/Login">Login</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/userprofile">User Profile</Link>
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
          <DefaultHeaderDropdown onLogout={this.props.onLogout} accnt/>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
