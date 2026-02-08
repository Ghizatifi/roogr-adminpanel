import React from 'react';
import UserTypeState from '../../components/users/UserTypeState';

const unactiveCustomers = () => {
  return (
    <div>
      <UserTypeState UserType="customer" state={2} />
    </div>
  );
};

export default unactiveCustomers;
