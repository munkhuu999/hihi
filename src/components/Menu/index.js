import React, { Fragment, useContext } from 'react';
import MenuItem from '../MenuItem';
import styles from './style.module.css';

import UserContext from '../../context/UserContext';


const Menu = (props) => {
    const userCtc = useContext(UserContext);
    return (
        <div className={styles.Menu}>
            <ul>
                {userCtc.state.userId ? (
                    <Fragment>
                        <MenuItem exact link='/' active >Шинэ захиалга</MenuItem>
                        <MenuItem link='/orders' >Захиалганууд</MenuItem>
                        <MenuItem link='/logout'>Гарах</MenuItem>
                    </Fragment>) :
                    (
                        <Fragment>
                            <MenuItem link='/login' >Нэвтрэх</MenuItem>
                            <MenuItem link='/sign' >Бүртгүүлэх</MenuItem>
                        </Fragment>
                    )}

            </ul>
        </div>
    );
}

export default Menu;