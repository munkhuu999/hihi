import React, { useState, useEffect } from 'react'
import styles from './style.module.css';
import Button from '../../components/General/Button';
import { connect } from 'react-redux';
import * as action from '../../redux/action/signupAction';
import Spinner from '../../components/General/Spinner'
import { Redirect } from 'react-router-dom';

const Sign = (props) => {
    const [email, setEmail] = useState('');
    const [passport1, setPassport1] = useState('');
    const [passport2, setPassport2] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {

    }, []);

    const sign = () => {
        if (passport1 === passport2) {
            setError('');
            props.signupUser(email, passport1);
        }
        else {
            setError('Нууц үг таарахгүй байна');
        }

    };
    return (
        <div className={styles.Sign}>
            {props.userId && <Redirect to='/' />}
            <h1>Бүртгүүлэх</h1>
            <div>Та өөрийн мэдээллээ оруулна уу!</div>
            <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Email хаяг аа оруулна уу' />
            <input onChange={(e) => setPassport1(e.target.value)} type="password" placeholder='Нууц үг ээ оруулна уу' />
            <input onChange={(e) => setPassport2(e.target.value)} type="password" placeholder='Нууц үг ээ дахин оруулна уу' />
            <div style={{ color: 'red' }}>{error && error}</div>
            {props.saving && <Spinner />}
            {props.firebaseError && <div>{props.firebaseError}</div>}
            <Button daragdsan={sign} text='Бүртгүүлэх' btnType='Success' />

        </div>
    );

};
const mapStateToProps = state => {
    return {
        saving: state.sign_login_Reducer.saving,
        firebaseError: state.sign_login_Reducer.firebaseError,
        userId: state.sign_login_Reducer.userId

    };
};
const mapDispatchToProps = dispatch => {
    return {
        signupUser: (email, passport) => dispatch(action.signupUser(email, passport))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sign);
