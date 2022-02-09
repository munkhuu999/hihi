import React, { Component, Fragment } from 'react';
import ToolBar from '../../components/ToolBar';
import BurgerBuilder from '../BurgerPage';
import { Checkout } from '../Checkout';
import Login from '../Login';
import Logout from '../Logout';
import styles from './style.module.css';
import SideBar from '../../components/SideBar';
import OrderPage from '../OrderPage';
import { Route, Switch } from 'react-router-dom';
import ShippningPage from '../ShippingPage';
import Sign from '../SignPage';
import { connect } from 'react-redux';
import * as action from '../../redux/action/loginAction';
import * as signAction from '../../redux/action/signupAction';
import { Redirect } from 'react-router-dom';

class App extends Component {

  state = {
    showSidBar: false
  };
  toggleSidBar = () => {
    this.setState(prevState => {
      return { showSidBar: !prevState.showSidBar }
    });
  }
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expiresData = new Date(localStorage.getItem("expiresData"));
    const refreshToken = localStorage.getItem("refreshToken");
    console.log('rrrrrrrr ' + expiresData);
    if (token) {
      if (expiresData > new Date()) {
        this.props.autoLogin(token, userId);
        this.props.logOutAfterMillisec(expiresData.getTime() - new Date().getTime());
      }
      else {
        this.props.logOut();
      }

    }
  }
  render() {
    return (
      <div className={styles.appStyle}>
        <ToolBar toggleSidBar={this.toggleSidBar} />
        <SideBar
          showSidBar={this.state.showSidBar}
          toggleSidBar={this.toggleSidBar} />
        <main className={styles.Content} >
          {this.props.userId ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/orders" component={OrderPage} />
              <Route path="/shipping" component={ShippningPage} />
              <Route path="/" component={BurgerBuilder} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/sign" component={Sign} />
              <Route path="/login" component={Login} />
              <Redirect to='login' />
            </Switch>)}

          {/* <Routes>    
               <Route path="orders" element={<OrderPage/>} /> 
               <Route path="/" element={<BurgerBuilder/>} />               
           </Routes>        */}
        </main>


      </div>

    );
  }

}
const mapStateToProps = state => {
  return {
    userId: state.sign_login_Reducer.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (token, userId) => dispatch(action.loginUserSuccess(token, userId)),
    logOut: () => dispatch(signAction.logOut()),
    logOutAfterMillisec: (ms) => dispatch(signAction.logOutAfterMillisec(ms))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
