import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    component: React.ComponentType<any>;
    hasPermission: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component: Component,
    hasPermission,
    ...rest
}) => {
    if (hasPermission=1) {
        return <Component {...rest}/>;
    } else {
        return <Navigate to="/unauthorized" />;
    }
};

export default ProtectedRoute;