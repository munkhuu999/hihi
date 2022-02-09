import React from "react";
import styles from './style.module.css';

const Shadow =(props) =>{
   return props.show ? (<div onClick={props.onClicked} className={styles.Shadow}> </div>) : null;
};
export default Shadow;