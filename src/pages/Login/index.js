import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom'
import styles from './style.module.css';
import Button from '../../components/General/Button';
import Spinner from '../../components/General/Spinner';
import UserContext from '../../context/UserContext';

const Login = props => {
    const [email, setEmail] = useState('');
    const [passport, setPassport] = useState('');
    const userCtx = useContext(UserContext);

    const changeEmail = e => {
        setEmail(e.target.value);
    };
    const changePasssport = e => {
        setPassport(e.target.value);
    };
    const login = () => {
        // alert('looooggin' + this.state.email);
        userCtx.loginUser(email, passport);
    };
    return (
        <div className={styles.Login}>
            {userCtx.state.userId && <Redirect to='/orders' />}
            <div>Нэвтрэх</div>
            <input onChange={changeEmail} type='text' placeholder='Email хаяг аа оруулна уу' />
            <input onChange={changePasssport} type="password" placeholder='Нууц үг ээ оруулна уу' />
            {userCtx.state.loginIn && <Spinner />}
            {userCtx.state.firebaseError && <div style={{ color: 'red' }}>{userCtx.state.firebaseError}</div>}
            <Button daragdsan={login} text='Илгээх' btnType='Success' />
        </div>
    );
};
export default Login;

