import React from 'react'
import styles from './style.module.css';
import Button from '../General/Button';
import axios from '../../axios'
import Spinner from '../General/Spinner';
import * as action from '../../redux/action/orderActions';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ContactData extends React.Component {
  state = {
    city: null,
    street: null,
    name: null,
  };
  changName = (e) => {
    this.setState({ name: e.target.value })
  };
  changCity = (e) => {
    this.setState({ city: e.target.value })
  };
  changStreet = (e) => {
    this.setState({ street: e.target.value })
  };
  saveData = () => {
    const newOrder = {
      userId: this.props.userId,
      orts: this.props.ingredients,
      dun: this.props.price,
      hayag: {
        name: this.state.name,
        city: this.state.city,
        street: this.state.street
      }
    }
    this.props.dataToFirebase(newOrder);
  };

  componentDidUpdate = () => {
    if (this.props.newOrderStatus.finished && !this.props.newOrderStatus.error) {
      this.props.history.replace('/orders')
    }
  };
  render() {
    return (
      <div className={styles.ContactData}>
        <div > {
          this.props.newOrderStatus.error &&
          `Илгээх явцад алдаа гарлаа : ${this.props.newOrderStatus.error}`}
        </div>
        {this.props.newOrderStatus.saving ? (<Spinner />) : (
          <div>
            <input onChange={this.changName} type='text' name='' placeholder='Таны нэр' />
            <input onChange={this.changCity} type='text' name='city' placeholder='Таны захиалах хот' />
            <input onChange={this.changStreet} type='text' name='street' placeholder='Таны гудамж' />
            <Button daragdsan={this.saveData} text='Илгээх' btnType='Success' />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.sign_login_Reducer.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dataToFirebase: dataToSend => dispatch(action.saveOrder(dataToSend))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));
