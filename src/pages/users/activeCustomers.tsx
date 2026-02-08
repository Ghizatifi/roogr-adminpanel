import React from 'react';
import UserTypeState from '../../components/users/UserTypeState';

const activeCustomers = () => {
  return (
    <div>
      <UserTypeState UserType="customer" state={1} />
    </div>
  );
};

export default activeCustomers;
