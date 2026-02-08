import React from 'react';
import UserTypeState from '../../components/users/UserTypeState';

const lazyCustomers = () => {
  return (
    <div>
      <UserTypeState UserType="customer" state={3} />
    </div>
  );
};

export default lazyCustomers;
