import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RoutesPropData extends RouteProps {
    
}

const PrivateRoutes: React.FC<RoutesPropData> = ({ ...rest }) => {
    const { userLogged } = useAuth();
    if (!userLogged()) {
        return <Redirect to="/" />
    }

    return (
        <Route {...rest} />
     )
}

export default PrivateRoutes;