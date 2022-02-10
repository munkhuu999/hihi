import axios from "axios";
import { loginUserSuccess } from './loginAction';
export const signupUser = (email, password) => {
    return function (dispatch) {
        dispatch(signupUserStart());
        const data = {
            email,
            password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmEBJdrvIQEMBVGZZCy_9wnmn2uVT1ufU', data)
            .then(result => dispatch(signupUserSuccess(result.data)))
            .catch(err => dispatch(signupUserError(err)));
    };
};
export const signupUserStart = () => {
    return {
        type: 'SIGNUP_USER_START'
    };
};
export const signupUserSuccess = (firebaseResultData) => {
    return {
        type: 'SIGNUP_USER_SUCCESS',
        firebaseResultData
    };
};
export const signupUserError = (firebaseError) => {
    return {
        type: 'SIGNUP_USER_ERROR',
        firebaseError
    };
};
export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiresData');
    localStorage.removeItem('refreshToken');
    return {
        type: 'LOG_OUT'
    };
};
export const logOutAfterMillisec = ms => {
    return function (dispatch) {

        axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyBmEBJdrvIQEMBVGZZCy_9wnmn2uVT1ufU',
            {
                grant_type: 'refresh_token',
                refresh_token: localStorage.getItem("refreshToken")
            })
            .then(result => {
                const token = result.data.id_token;
                const userId = result.data.user_id;
                const refreshToken = result.data.refresh_token;
                localStorage.setItem('refreshToken', refreshToken);
                dispatch(loginUserSuccess(token, userId))
            })
            .catch(err => dispatch(signupUserError(err)));

        // setTimeout(() => {
        //     dispatch(logOut());    
        // }, ms);
    };
};