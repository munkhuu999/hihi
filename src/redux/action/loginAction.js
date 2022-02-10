import axios from "axios";
import * as actions from '../action/signupAction';
export const loginUser = (email, password) => {
    return function (dispatch) {
        dispatch(loginUserStart());
        const data = {
            email,
            password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBmEBJdrvIQEMBVGZZCy_9wnmn2uVT1ufU', data)
            .then(result => {
                console.log('rrrrrrrrrrrr  ', result);
                const token = result.data.idToken;
                const userId = result.data.localId;
                const expiresIn = result.data.expiresIn;
                const expiresData = new Date(new Date().getTime() + expiresIn * 1000);
                const refreshToken = result.data.refreshToken;
                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
                localStorage.setItem("expiresData", expiresData);
                localStorage.setItem("refreshToken", refreshToken);
                dispatch(loginUserSuccess(token, userId));
                dispatch(actions.logOutAfterMillisec(9000));

            })
            .catch(err => dispatch(loginUserError(err)));
    };
};
export const loginUserStart = () => {
    return {
        type: 'LOGIN_USER_START'
    };
};
export const loginUserSuccess = (token, userId) => {
    return {
        type: 'LOGIN_USER_SUCCESS',
        token,
        userId
    };
};
export const loginUserError = (firebaseError) => {
    return {
        type: 'LOGIN_USER_ERROR',
        firebaseError
    };
};