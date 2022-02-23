import React, { useState } from "react";
import axios from "../axios";

const intialState = {
    orders: [],
    loading: false,
    error: null
};
const Contex = React.createContext();
export const OrderStore = props => {
    const [state, setState] = useState(intialState);

    const loadOders = (userId, token) => {
        setState({ ...state, loading: true });
        // const token = getState().sign_login_Reducer.token;
        // axios.get(`orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`)
        axios.get(`orders.json?&auth=${token}&orderBy="userId"&equalTo="${userId}"`)
            .then(result => {
                let arr = Object.entries(result.data).reverse();
                setState({ ...state, orders: arr });
            }).catch(err => setState({ ...state, error: err }));
    };
    const clearOrdersState = () => {
        setState(intialState);
    }

    return (
        <Contex.Provider value={{ state, loadOders, clearOrdersState }}>
            {props.children}
        </Contex.Provider>
    );
};
export default Contex;