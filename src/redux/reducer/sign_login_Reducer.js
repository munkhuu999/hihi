const intialState = {
    saving: false,
    loginIn: false,
    firebaseError: '',
    token: '',
    userId: ''

};

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case 'SIGNUP_USER_START': return {
            ...state,
            saving: true
        };
        case 'SIGNUP_USER_SUCCESS': return {
            ...state,
            saving: false,
            firebaseError: '',
            token: action.firebaseResultData.idToken,
            userId: action.firebaseResultData.localId

        };
        case 'SIGNUP_USER_ERROR': return {
            ...state,
            saving: false,
            firebaseError: action.firebaseError.response.data.error.message
        };
        case 'LOGIN_USER_START': return {
            ...state,
            loginIn: true
        };
        case 'LOGIN_USER_SUCCESS': return {
            ...state,
            loginIn: false,
            firebaseError: '',
            token: action.token,
            userId: action.userId

        };
        case 'LOGIN_USER_ERROR': return {
            ...state,
            loginIn: false,
            firebaseError: action.firebaseError.response.data.error.message
        };
        case 'LOG_OUT': return {
            ...state,
            firebaseError: null,
            token: null,
            userId: null
        };
        default: return state;

    }
};
export default reducer;