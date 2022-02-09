import React from 'react';
import styles from './style.module.css';
import Logo from '../Logo';
import Menu from '../Menu';
import Shadow from '../General/Shadow';
const SideBar = (props) => {
    let classes =[styles.SideBar, styles.Close];
    if (props.showSidBar){
      classes =[styles.SideBar, styles.Open];
    }
    return (
      <div>
            <Shadow 
               onClicked={props.toggleSidBar}
                show={props.showSidBar}/>
        <div onClick={props.toggleSidBar} className={classes.join(' ')}>
            <div className={styles.Logo}>
               <Logo/>
            </div>
            <Menu/>
        </div>
      </div>
    );
}

export default SideBar;
