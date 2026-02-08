import React from 'react';
import UserTypeState from '../../components/users/UserTypeState';

const unactiveAdvertiser = () => {
  return (
    <div>
      <UserTypeState UserType="advertiser" state={2} />
    </div>
  );
};

export default unactiveAdvertiser;
