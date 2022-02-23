import React, { useEffect, useContext } from "react";
import { Redirect } from 'react-router-dom';
import UserContext from "../../context/UserContext";

const Logout = props => {
    const userCtx = useContext(UserContext);

    useEffect(() => {
        userCtx.logOut();
    }, []);
    return <Redirect to='/login' />
};
export default Logout;