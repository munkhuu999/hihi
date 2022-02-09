import axios from '../../axios';
export const loadOrders = (userId) => {
    return function (dispatch, getState) {
        dispatch(loadOrdersStart());
        const token = getState().sign_login_Reducer.token;
        axios.get(`orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`)
            .then(result => {
                let arr = Object.entries(result.data).reverse();
                dispatch(loadOrdersSuccess(arr));
            }).catch(err => dispatch(loadOrdersError(err)))

    };
};
export const loadOrdersStart = () => {
    return {
        type: "LOAD_ORDERS_START"
    };
};
export const loadOrdersSuccess = (orderLoad) => {
    return {
        type: "LOAD_ORDERS_SUCCESS",
        orderLoad: orderLoad
    };
};
export const loadOrdersError = (err) => {
    return {
        type: "LOAD_ORDERS_ERROR",
        err
    };
};
export const saveOrder = (newOrder) => {
    return function (dispatch, getState) {
        dispatch(saveOrderStart());
        const token = getState().sign_login_Reducer.token;

        axios.post(`/orders.json?&auth=${token}`, newOrder)
            .then(result => dispatch(saveSuccess()))
            .catch(err => dispatch(saveError(err)))
    };
};
export const saveOrderStart = () => {
    return {
        type: "SAVE_ORDER_START"
    };
};
export const saveSuccess = () => {
    return {
        type: "SAVE_ORDER_SUCCESS"
    };
};
export const saveError = (errr) => {
    return {
        type: "SAVE_ORDER_ERROR",
        errr
    };
};