import React, { useState, useEffect, useRef, useContext } from 'react'
import styles from './style.module.css';
import Button from '../General/Button';
import Spinner from '../General/Spinner';
import { useHistory } from 'react-router-dom';
import BurgerContext from '../../context/burgerContext';
import UserContext from '../../context/UserContext';
const ContactData = props => {
  const [city, setCity] = useState();
  const [street, ssetStreet] = useState();
  const [name, setName] = useState();

  const history = useHistory();
  const contex = useContext(BurgerContext);
  const userCtx = useContext(UserContext);
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
      userId: userCtx.state.userId,
      orts: contex.burger.ingredients,
      dun: contex.burger.totalPrice,
      hayag: {
        name: name,
        city: city,
        street
      }
    }
    contex.dataToFirebase(newOrder, userCtx.state.token);
  };

  useEffect(() => {
    if (contex.burger.finished && !contex.burger.error) {
      history.replace('/orders')
    }
    return () => {
      contex.clearBurger();
    };
  }, [contex.burger.finished]);

  return (
    <div className={styles.ContactData}>
      <div ref={dunRef}>
        <strong style={{ fontSize: '20px' }}>Нийт үнэ: {contex.burger.totalPrice}</strong>
      </div>
      <div > {
        contex.burger.error &&
        `Илгээх явцад алдаа гарлаа : ${contex.burger.error}`}
      </div>
      {contex.burger.saving ? (<Spinner />) : (
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

export default ContactData;
