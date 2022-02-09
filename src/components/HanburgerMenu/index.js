import React from "react";
import styles from './style.module.css';

const HanburgerMenu = (props) =>
<div onClick={props.toggleSidBar} className={styles.HanburgerMenu}>
    <div></div>
    <div></div>
    <div></div>
</div>;

export default HanburgerMenu;
