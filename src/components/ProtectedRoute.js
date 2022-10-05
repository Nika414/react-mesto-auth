import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";



const ProtectedRoute = ({ children, path }) => {
    const contextValue = useContext(CurrentUserContext);
    return (
        <Route exact path={path}>
            {() => contextValue.loggedIn ? children : <Redirect to="/sign-up" />}
        </Route>

    )
};

export default ProtectedRoute;