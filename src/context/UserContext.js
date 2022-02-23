import React, { useState } from "react";
import axios from "../axios";

const intialState = {
    saving: false,
    loginIn: false,
    firebaseError: '',
    token: '',
    userId: '',
    expiresData: ''
};

const UserContext = React.createContext();
export const UserStore = props => {
    const [state, setState] = useState(intialState);

    const autoRevewLoginAfterMilsec = (msec) => {
        axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyBmEBJdrvIQEMBVGZZCy_9wnmn2uVT1ufU',
            {
                grant_type: 'refresh_token',
                refresh_token: localStorage.getItem("refreshToken")
            })
            .then(result => {
                const token = result.data.id_token;
                const userId = result.data.user_id;
                const expiresIn = result.data.expires_in;
                const expiresData = new Date(new Date().getTime() + expiresIn * 1000);
                const refreshToken = result.data.refresh_token;
                autoLoginSuccess(token, userId, expiresData, refreshToken)
            })
            .catch(err => setState({ ...state, loginIn: false, firebaseError: err, expiresData: null }));

        setTimeout(() => {
            autoRevewLoginAfterMilsec(3600000);
        }, msec);

    };

    const autoLoginSuccess = (token, userId, expiresData, refreshToken) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("expiresData", expiresData);
        localStorage.setItem("refreshToken", refreshToken);
        setState({ ...state, loginIn: false, firebaseError: null, token, userId, expiresData });
    };

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expiresData');
        localStorage.removeItem('refreshToken');
        setState(intialState);
    };
    const signupUser = (email, password) => {
        setState({ ...state, saving: true });
        const data = {
            email,
            password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmEBJdrvIQEMBVGZZCy_9wnmn2uVT1ufU', data)
            .then(result => {
                const token = result.data.idToken;
                const userId = result.data.localId;
                const expiresIn = result.data.expiresIn;
                const expiresData = new Date(new Date().getTime() + expiresIn * 1000);
                const refreshToken = result.data.refreshToken;
                autoLoginSuccess(token, userId, expiresData, refreshToken);
                setState({
                    ...state,
                    token: token,
                    userId: userId,
                    saving: false,
                    firebaseError: null
                });
            })
            .catch(err => setState({
                ...state,
                saving: false,
                token: null,
                userId: null,
                firebaseError: err.message
            }));
    };
    const loginUser = (email, password) => {
        setState({ ...state, loginIn: true });
        const data = {
            email,
            password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBmEBJdrvIQEMBVGZZCy_9wnmn2uVT1ufU', data)
            .then(result => {
                const token = result.data.idToken;
                const userId = result.data.localId;
                const expiresIn = result.data.expiresIn;
                const expiresData = new Date(new Date().getTime() + expiresIn * 1000);
                const refreshToken = result.data.refreshToken;
                autoLoginSuccess(token, userId, expiresData, refreshToken);
                autoRevewLoginAfterMilsec(9000);

            })
            .catch(err => setState({ ...state, loginIn: false, firebaseError: err, expiresData: null }));
    };
    return (
        <UserContext.Provider value={{ state, signupUser, loginUser, logOut, autoLoginSuccess, autoRevewLoginAfterMilsec }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;