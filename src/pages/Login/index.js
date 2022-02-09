import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../redux/action/loginAction';
import { Redirect } from 'react-router-dom'
import styles from './style.module.css';
import Button from '../../components/General/Button';
import Spinner from '../../components/General/Spinner';

class Login extends Component {
    state = {
        email: '',
        passport: ''
    };
    changeEmail = e => {
        this.setState({ email: e.target.value });
    };
    changePasssport = e => {
        this.setState({ passport: e.target.value });
    };
    login = () => {
        // alert('looooggin' + this.state.email);
        this.props.login(this.state.email, this.state.passport);
    };
    render() {
        return (
            <div className={styles.Login}>
                {this.props.userId && <Redirect to='/orders' />}
                <div>Нэвтрэх</div>
                <input onChange={this.changeEmail} type='text' placeholder='Email хаяг аа оруулна уу' />
                <input onChange={this.changePasssport} type="password" placeholder='Нууц үг ээ оруулна уу' />
                {this.props.loginIn && <Spinner />}
                {this.props.firebaseError && <div style={{ color: 'red' }}>{this.props.firebaseError}</div>}
                <Button daragdsan={this.login} text='Илгээх' btnType='Success' />
            </div>
        );
    };
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

