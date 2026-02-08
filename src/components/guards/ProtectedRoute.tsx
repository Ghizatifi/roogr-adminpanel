import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkPermissions } from '../../store/slices/permissions';

interface ProtectedRouteProps {
    component: React.ComponentType<any>;
    permissionIndex: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component: Component,
    permissionIndex,
    ...rest
}) => {
    const permissions = useSelector(checkPermissions);
    const value = permissions?.[permissionIndex];
    const hasPermission = value === '1' || value === 1;
    if (hasPermission) {
        return <Component {...rest}/>;
    }
    return <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;