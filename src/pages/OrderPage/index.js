import React, { useEffect, useContext } from 'react';
import style from './style.module.css';
import Spinner from '../../components/General/Spinner';
import Orderss from '../../components/Orderss';
import Contex from '../../context/OrderContex';
import UserContext from '../../context/UserContext';

const OrderPage = props => {
   const OrderContext = useContext(Contex);
   const userCtx = useContext(UserContext);

   useEffect(() => {
      OrderContext.loadOders(userCtx.state.userId, userCtx.state.token)
   }, []);
   // componentDidMount = () => {
   //    this.props.loadorder(this.props.userId)
   // };
   return (
      <div>
         {OrderContext.state.loading ? (<Spinner />) : (OrderContext.state.orders.map(el => <Orderss key={el[0]} order1={el[1]} />))}
      </div>
   );
};
export default OrderPage;
