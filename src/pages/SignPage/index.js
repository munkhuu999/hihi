import React, { Component } from 'react'
import styles from './style.module.css';
import Button from '../../components/General/Button';
import { connect } from 'react-redux';
import * as action from '../../redux/action/signupAction';
import Spinner from '../../components/General/Spinner'
import { Redirect } from 'react-router-dom';

class Sign extends Component {
    state = {
        email: '',
        passport1: '',
        passport2: '',
        error: ''
    };
    changeEmail = e => {
        this.setState({ email: e.target.value });
    };
    changePassport1 = e => {
        this.setState({ passport1: e.target.value });
    };
    changePassport2 = e => {
        this.setState({ passport2: e.target.value });
    };

    sign = () => {
        if (this.state.passport1 === this.state.passport2) {
            this.setState({ error: '' });
            this.props.signupUser(this.state.email, this.state.passport1);
        }
        else {
            this.setState({ error: 'Нууц үг таарахгүй байна' });
        }

    };
    render() {
        return (
            <div className={styles.Sign}>
                {this.props.userId && <Redirect to='/' />}
                <h1>Бүртгүүлэх</h1>
                <div>Та өөрийн мэдээллээ оруулна уу!</div>
                <input onChange={this.changeEmail} type='text' placeholder='Email хаяг аа оруулна уу' />
                <input onChange={this.changePassport1} type="password" placeholder='Нууц үг ээ оруулна уу' />
                <input onChange={this.changePassport2} type="password" placeholder='Нууц үг ээ дахин оруулна уу' />
                <div style={{ color: 'red' }}>{this.state.error && this.state.error}</div>
                {this.props.saving && <Spinner />}
                {this.props.firebaseError && <div>{this.props.firebaseError}</div>}
                <Button daragdsan={this.sign} text='Бүртгүүлэх' btnType='Success' />

            </div>
        );
    };
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
