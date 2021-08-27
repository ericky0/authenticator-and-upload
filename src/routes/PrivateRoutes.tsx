import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RoutesPropData extends RouteProps {
}

const PrivateRoutes: React.FC<RoutesPropData> = ({...rest }) => {
    const context = useAuth();
    if (!context.userLogged) {
        return <Redirect to="/" />
    }
    console.log(context.admin);
    
    if(context.admin){
        console.log(context.admin);
        return <Redirect to="/admin-dashboard" />
    }
    
    return (
        <Route {...rest} />
     )
}

export default PrivateRoutes;