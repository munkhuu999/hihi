import React from 'react';
import styles from './style.module.css';

const Orderss = (props) => {
    return (
        <div className={styles.Orderss}>
            <p>Орц:  Гахайн мах: {props.order1.orts.bacon}, Салад: {props.order1.orts.salad}, Үхрийн мах: {props.order1.orts.meat}, Бяслаг: {props.order1.orts.cheese}</p>
            <p>Хаяг: {props.order1.hayag.name} | {props.order1.hayag.city} |{props.order1.hayag.street} </p>
            <p>Үнийн Дүн: <strong>{props.order1.dun}</strong></p>
            <p> Захиалсан хүний нэр: <strong>{props.order1.hayag.name}</strong></p>
        </div>
    );
}

export default Orderss;
