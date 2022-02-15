import React, { useState, useEffect, useRef } from 'react'
import styles from './style.module.css';
import Button from '../General/Button';
import axios from '../../axios'
import Spinner from '../General/Spinner';
import * as action from '../../redux/action/orderActions';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const ContactData = props => {
  const [city, setCity] = useState();
  const [street, ssetStreet] = useState();
  const [name, setName] = useState();

  const dunRef = useRef();

  const changName = (e) => {
    if (dunRef.current.style.color === 'red') {
      dunRef.current.style.color = 'blue';
    }
    else {
      dunRef.current.style.color = 'red';
    }
    setName(e.target.value);
  };
  const changCity = (e) => {
    setCity(e.target.value);
  };
  const changStreet = (e) => {
    ssetStreet(e.target.value);
  };
  const saveData = () => {
    const newOrder = {
      userId: props.userId,
      orts: props.ingredients,
      dun: props.price,
      hayag: {
        name: name,
        city: city,
        street
      }
    }
    props.dataToFirebase(newOrder);
  };

  useEffect(() => {
    if (props.newOrderStatus.finished && !props.newOrderStatus.error) {
      props.history.replace('/orders')
    }
  });

  return (
    <div className={styles.ContactData}>
      <div ref={dunRef}>
        <strong style={{ fontSize: '20px' }}>Нийт үнэ: {props.price}</strong>
      </div>
      <div > {
        props.newOrderStatus.error &&
        `Илгээх явцад алдаа гарлаа : ${props.newOrderStatus.error}`}
      </div>
      {props.newOrderStatus.saving ? (<Spinner />) : (
        <div>
          <input onChange={changName} type='text' name='' placeholder='Таны нэр' />
          <input onChange={changCity} type='text' name='city' placeholder='Таны захиалах хот' />
          <input onChange={changStreet} type='text' name='street' placeholder='Таны гудамж' />
          <Button daragdsan={saveData} text='Илгээх' btnType='Success' />
        </div>
      )}
    </div>
  );

};

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
