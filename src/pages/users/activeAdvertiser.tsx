import React from 'react';
import UserTypeState from '../../components/users/UserTypeState';

const activeAdvertiser = () => {
  return (
    <div>
      <UserTypeState UserType="advertiser" state={1} />
    </div>
  );
};

export default activeAdvertiser;
