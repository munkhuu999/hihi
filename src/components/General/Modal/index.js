import React from "react";
import Shadow from '../Shadow';
import styles from './style.module.css';


const Modal = (props) =>(
    <div>
        <Shadow show={props.show} onClicked = {props.CloseConfirmOrder}/>
    <div
    //    onClick = {props.CloseConfirmOrder}
       style={{transform: props.show ? 'translate(0)' : 'translate(-100vh)', opacity: props.show ? '1' : '0'}}
       className={styles.Modal}>
       {props.children}
      
    </div>
    </div>
)

export default Modal;