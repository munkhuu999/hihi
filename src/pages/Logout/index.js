import React, { useEffect } from "react";
import { connect } from 'react-redux';
import * as action from '../../redux/action/signupAction';
import { Redirect } from 'react-router-dom';

const Logout = props => {

    useEffect(() => {
        props.logout();
    }, []);


    return <Redirect to='/login' />

};
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(action.logOut())
    };
};

export default connect(null, mapDispatchToProps)(Logout);