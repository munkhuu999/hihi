const intialState = {
    order: [],
    loading: false,
    error: null,
    newOrder: {
        saving: false,
        finished: false,
        error: null
    }
}
const reducer = (state = intialState, action) => {
    // if (action.type === 'LOAD_ORDERS_START') {
    //     return {
    //         ...state,
    //         loading: true
    //     };
    // } else if (action.type === 'LOAD_ORDERS_SUCCESS') {
    //     return {
    //         ...state,
    //         loading: false,
    //         order: action.orderLoad
    //     };
    // } else if (action.type === 'LOAD_ORDERS_ERROR') {
    //     return {
    //         ...state,
    //         loading: false,
    //         error: action.err
    //     };
    // }
    // return state;
    switch (action.type) {
        case 'LOAD_ORDERS_START':
            return {
                ...state,
                loading: true,
                newOrder: {
                    ...state.newOrder,
                    finished: false,
                    error: null
                }
            };
        case 'LOAD_ORDERS_SUCCESS':
            return {
                ...state,
                loading: false,
                order: action.orderLoad
            };
        case 'LOAD_ORDERS_ERROR':
            return {
                ...state,
                loading: false,
                error: action.err
            };
        case 'SAVE_ORDER_START':
            return {
                ...state,
                newOrder: {
                    ...state.newOrder,
                    saving: true,
                    finished: false,
                    error: null
                }
            };
        case 'SAVE_ORDER_SUCCESS':
            return {
                ...state,
                newOrder: {
                    ...state.newOrder,
                    saving: false,
                    finished: true,
                    error: null

                }
            };
        case 'SAVE_ORDER_ERROR':
            return {
                ...state,
                newOrder: {
                    ...state.newOrder,
                    saving: false,
                    finished: true,
                    error: action.errr
                }
            };
        default: return state;

    };
};
export default reducer;