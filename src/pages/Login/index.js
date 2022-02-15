import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/action/loginAction';
import { Redirect } from 'react-router-dom'
import styles from './style.module.css';
import Button from '../../components/General/Button';
import Spinner from '../../components/General/Spinner';

const Login = props => {
    const [email, setEmail] = useState('');
    const [passport, setPassport] = useState('');

    const changeEmail = e => {
        setEmail(e.target.value);
    };
    const changePasssport = e => {
        setPassport(e.target.value);
    };
    const login = () => {
        // alert('looooggin' + this.state.email);
        props.login(email, passport);
    };
    return (
        <div className={styles.Login}>
            {props.userId && <Redirect to='/orders' />}
            <div>Нэвтрэх</div>
            <input onChange={changeEmail} type='text' placeholder='Email хаяг аа оруулна уу' />
            <input onChange={changePasssport} type="password" placeholder='Нууц үг ээ оруулна уу' />
            {props.loginIn && <Spinner />}
            {props.firebaseError && <div style={{ color: 'red' }}>{props.firebaseError}</div>}
            <Button daragdsan={login} text='Илгээх' btnType='Success' />
        </div>
    );

};

const mapStateToProps = state => {
    return {
        loginIn: state.sign_login_Reducer.loginIn,
        firebaseError: state.sign_login_Reducer.firebaseError,
        userId: state.sign_login_Reducer.userId
    };
};
const mapDispatchToProps = dispatch => {
    return {
        login: (email, passport) => dispatch(action.loginUser(email, passport))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

