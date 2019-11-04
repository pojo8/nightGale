import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Loadable from 'react-loadable';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
// const Dashboard = Loadable({
//   loader: () => import('./comp-items/containers/DefaultLayout'),
//   loading
// });

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const ForgotPassword = Loadable({
  loader: () => import('./views/Pages/ForgotPassword/ForgotPasword'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard/Dashboard'),
  loading
});

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          {/* The name must match the name defined in the routes*/}
          {/* <Route exact path="/" name="Login" component={Login} /> */}
          <Route exact path="/login" name="Login" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/forgotPassword" name="Forgot Password Page" component={ForgotPassword} />
          <Route path="/" name="Home" component= {DefaultLayout} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          {/* <Route exact path="/" name="Dashboard" component={Dashboard} /> */}
        </Switch>
      </HashRouter>
    );
  }
}
export default App;
