import React, { Fragment, useState, useEffect, Suspense, useContext } from 'react';
import ToolBar from '../../components/ToolBar';
import { Checkout } from '../Checkout';
import Login from '../Login';
import Logout from '../Logout';
import styles from './style.module.css';
import SideBar from '../../components/SideBar';

import { Route, Switch } from 'react-router-dom';
import ShippningPage from '../ShippingPage';

import { connect } from 'react-redux';
import * as action from '../../redux/action/loginAction';
import * as signAction from '../../redux/action/signupAction';
import { Redirect } from 'react-router-dom';
import burgerContext from '../../context/burgerContext';

// import OrderPage from '../OrderPage';
// import Sign from '../SignPage';
// import BurgerBuilder from '../BurgerPage';

const BurgerBuilder = React.lazy(() => {
  return import('../BurgerPage');
});
const Sign = React.lazy(() => {
  return import('../SignPage');
});
const OrderPage = React.lazy(() => {
  return import('../OrderPage');
});

const App = props => {
  const [showSidBar, setShowSidBar] = useState(false);

  const appbar = useContext(burgerContext);

  const toggleSidBar = () => {
    setShowSidBar(!showSidBar);
    // this.setState(prevState => {
    //   return { showSidBar: !prevState.showSidBar }
    // });
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expiresData = new Date(localStorage.getItem("expiresData"));
    const refreshToken = localStorage.getItem("refreshToken");
    // console.log('rrrrrrrr ' + expiresData);
    if (token) {
      if (expiresData > new Date()) {
        props.autoLogin(token, userId);
        props.logOutAfterMillisec(expiresData.getTime() - new Date().getTime());
      }
      else {
        props.logOut();
      }
    }
  });
  return (
    <div className={styles.appStyle}>
      <ToolBar toggleSidBar={toggleSidBar} />
      <SideBar
        showSidBar={showSidBar}
        toggleSidBar={toggleSidBar} />
      <Suspense fallback={<div>та түр хүлээнэ үүү түр хүлээээээээээ !!!!!!</div>}>
        <main className={styles.Content} >
          {appbar}
          {props.userId ? (
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
      </Suspense>

    </div >

  );
};
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
