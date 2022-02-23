import React, { Fragment, useState, useEffect, Suspense, useContext } from 'react';
import ToolBar from '../../components/ToolBar';
import { Checkout } from '../Checkout';
import Login from '../Login';
import Logout from '../Logout';
import styles from './style.module.css';
import SideBar from '../../components/SideBar';
import { Route, Switch } from 'react-router-dom';
import ShippningPage from '../ShippingPage';
import { Redirect } from 'react-router-dom';
import BurgerContext from '../../context/burgerContext';
import { BurgerStore } from '../../context/burgerContext';
import { OrderStore } from '../../context/OrderContex';
import UserContext from '../../context/UserContext';

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
  const userCtx = useContext(UserContext);

  const toggleSidBar = () => {
    setShowSidBar(!showSidBar);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expiresData = new Date(localStorage.getItem("expiresData"));
    const refreshToken = localStorage.getItem("refreshToken");

    if (token) {
      if (expiresData > new Date()) {
        userCtx.autoLoginSuccess(token, userId, expiresData, refreshToken);
        userCtx.autoRevewLoginAfterMilsec(expiresData.getTime() - new Date().getTime());
      }
      else {
        userCtx.logOut();
      }
    }
  }, []);
  return (
    <div className={styles.appStyle}>
      <ToolBar toggleSidBar={toggleSidBar} />
      <SideBar
        showSidBar={showSidBar}
        toggleSidBar={toggleSidBar} />
      <BurgerStore>
        <Suspense fallback={<div>та түр хүлээнэ үүү түр хүлээээээээээ !!!!!!</div>}>
          <main className={styles.Content} >
            {userCtx.state.userId ? (
              <Switch>
                <Route path="/logout" component={Logout} />
                <Route path="/orders">
                  <OrderStore>
                    <OrderPage />
                  </OrderStore>
                </Route>
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
      </BurgerStore>
    </div >

  );
};
export default App;
