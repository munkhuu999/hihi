import React from "react";
import HanburgerMenu from "../HanburgerMenu";
import Logo from '../Logo';
import Menu from "../Menu";
import styles from'./style.module.css';
const ToolBar = (props) =>{
    return(
        <header className={styles.Toolbar}> 
            <HanburgerMenu toggleSidBar={props.toggleSidBar}/>
            <Logo/>
            <nev className={styles.HideOnMobile}>
                <Menu/>
            </nev>                  
        </header>
    );
}
export default ToolBar;