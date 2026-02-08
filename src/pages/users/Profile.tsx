import React, { useEffect } from 'react';
import ProfileAccordion from '../../components/users/ProfileAccordion';
import { useParams } from 'react-router-dom';
import useHandleAction from '../../hooks/useHandleAction';
import StarRating from '../../components/users/StarRating';
import ProfileImages from '../../components/users/ProfileImages';
import useUser from '../../hooks/users/useGetUser';
import useBanUser from '../../hooks/users/useBanUser';
import useRemoveUser from '../../hooks/users/useRemoveUser';
import NotfoundUser from '../notfound/notfoundUser';

const NotBannedIconSrc = '/whiteblock.png';
const RemoveIconSrc = '/remove.svg';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const { user, loading, error, refreshProfile } = useUser(userId);
  const { banUser, isSuccess: banSuccess } = useBanUser();
  const { removeUser, success: removeSuccess } = useRemoveUser();
  const { handleAction, loading: actionLoading } = useHandleAction();

  useEffect(() => {
    if (banSuccess || removeSuccess) {
      refreshProfile();
    }
  }, [banSuccess, removeSuccess]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user.success === false) {
  // if (error || !user || user.success === false) {
    return <NotfoundUser />;
  }

  return (
    <div className="overflow-hidden">
      {/* Image Section */}
      <ProfileImages user={user} />

      {/* Rating Section */}
      <div className="mx-auto text-center my-4">
        <div className="flex justify-end gap-x-3 text-xl">
          <span className="text-gray-500">
            {user?.rating ? parseFloat(user.rating).toFixed(1) : '0.0'}
          </span>
          <StarRating rating={user?.rating || 0} />
        </div>
      </div>

      {/* Action Icons */}
      <div className="mx-auto flex justify-end gap-x-8">
        {/* Ban/Unban User */}
        <div
          className={
            user?.isBanned
              ? `bg-BlockIconBg rounded-md`
              : `bg-gray-400 rounded-md`
          }
        >
          <img
            src={NotBannedIconSrc}
            className="w-6 h-6 text-center p-1 cursor-pointer"
            onClick={() =>
              !actionLoading &&
              user?.id &&
              handleAction(user.id, user.isBanned === 1, 'ban', banUser, {
                confirmButtonClass: 'bg-BlockIconBg',
                cancelButtonClass: '',
              })
            }
            alt="Ban/Unban"
          />
        </div>

        {/* Remove User */}
        <div className="bg-RemoveIconBg rounded-md">
          <img
            src={RemoveIconSrc}
            className="w-6 h-6 text-center p-1 cursor-pointer"
            onClick={() =>
              !actionLoading &&
              user?.id &&
              handleAction(user.id, false, 'remove', removeUser, {
                confirmButtonClass: 'bg-RemoveIconBg',
                cancelButtonClass: '',
              })
            }
            alt="Remove"
          />
        </div>
      </div>

      {/* Accordion Section */}
      <ProfileAccordion user={user} loading={loading} error={error} />
    </div>
  );
};

export default Profile;
