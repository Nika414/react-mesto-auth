import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";



const ProtectedRoute = ({ children, path }) => {
    const contextValue = useContext(CurrentUserContext);
    return (
        <Route path={path}>
            {() => contextValue.loggedIn ? children : <Redirect to="/react-mesto-auth/sign-up" />}
        </Route>

    )
};

export default ProtectedRoute;