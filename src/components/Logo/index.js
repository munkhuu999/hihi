import React from "react";
import styles from './styles.module.css';
import logoImage from '../../assets/image/burger-logo.png'


const Logo = () =>(
<div className={styles.Logo}>
    <img src={logoImage} />
</div>)
export default Logo;
