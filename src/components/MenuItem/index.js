import React from 'react';
import styles from './style.module.css';
import { Link, NavLink } from 'react-router-dom';

const MenuItem = (props) => {
    return (
        <li className={styles.MenuItem}>
            <NavLink exact={props.exact} activeClassName={styles.active} to={props.link} > {props.children} </NavLink>
            {/* <Link to={props.link} > {props.children} </Link> */}
            {/* <a 
             className={props.active ? (styles.active) : null}
             href={props.link}>            
         </a> */}
        </li>
    );
}

export default MenuItem;
