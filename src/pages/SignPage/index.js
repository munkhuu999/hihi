import React, { useState, useEffect, useContext } from 'react'
import styles from './style.module.css';
import Button from '../../components/General/Button';
import Spinner from '../../components/General/Spinner'
import { Redirect } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const Sign = (props) => {
    const [email, setEmail] = useState('');
    const [passport1, setPassport1] = useState('');
    const [passport2, setPassport2] = useState('');
    const [error, setError] = useState('');

    const userCtx = useContext(UserContext);


    useEffect(() => { }, []);

    const sign = () => {
        if (passport1 === passport2) {
            setError('');
            userCtx.signupUser(email, passport1);
        }
        else {
            setError('Нууц үг таарахгүй байна');
        }

    };
    return (
        <div className={styles.Sign}>
            {userCtx.state.userId && <Redirect to='/' />}
            <h1>Бүртгүүлэх</h1>
            <div>Та өөрийн мэдээллээ оруулна уу!</div>
            <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Email хаяг аа оруулна уу' />
            <input onChange={(e) => setPassport1(e.target.value)} type="password" placeholder='Нууц үг ээ оруулна уу' />
            <input onChange={(e) => setPassport2(e.target.value)} type="password" placeholder='Нууц үг ээ дахин оруулна уу' />
            <div style={{ color: 'red' }}>{error && error}</div>
            {userCtx.state.saving && <Spinner />}
            {userCtx.state.firebaseError && <div>{userCtx.state.firebaseError}</div>}
            <Button daragdsan={sign} text='Бүртгүүлэх' btnType='Success' />

        </div>
    );

};

export default Sign;
