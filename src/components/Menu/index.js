import React, { Fragment } from 'react';
import MenuItem from '../MenuItem';
import styles from './style.module.css';
import { connect } from 'react-redux';


const Menu = (props) => {
    return (
        <div className={styles.Menu}>
            <ul>
                {props.userId ? (
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
const mapStateToProps = state => {
    return {
        userId: state.sign_login_Reducer.userId
    };
};
export default connect(mapStateToProps)(Menu);