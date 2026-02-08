import React from 'react';
import UserTypeState from '../../components/users/UserTypeState';

const lazyAdvertiser = () => {
  return (
    <div>
      <UserTypeState UserType="advertiser" state={3} />
    </div>
  );
};

export default lazyAdvertiser;
