import React, { Component } from 'react';
import style from './style.module.css';
import axios from '../../axios';
import { connect } from 'react-redux';
import * as actions from '../../redux/action/orderActions';
import Spinner from '../../components/General/Spinner';
import Orderss from '../../components/Orderss';

class OrderPage extends Component {

   componentDidMount = () => {
      this.props.loadorder(this.props.userId)
   };
   render() {
      return (
         <div>
            {this.props.loading ? (<Spinner />) : (this.props.order.map(el => <Orderss key={el[0]} order1={el[1]} />))}
         </div>
      );

   }
}
const mapStateToPtops = state => {
   return {
      order: state.orderReducer.order,
      loading: state.orderReducer.loading,
      userId: state.sign_login_Reducer.userId
   }
};
const mapDispatchToProps = dispatch => {
   return {
      loadorder: (userId) => dispatch(actions.loadOrders(userId)),
   };
};
export default connect(mapStateToPtops, mapDispatchToProps)(OrderPage);
