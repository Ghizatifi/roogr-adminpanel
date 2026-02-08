import React, { useEffect, useState } from 'react';
import AccordionHeader2 from '../../Accordion/AccordionHeader2';
import MainTable from '../../lastnews/MainTable';
import Bio from '../bio';
import { MdOutlineStarOutline } from 'react-icons/md';
import ReactDOMServer from 'react-dom/server';
import { useNavigate } from 'react-router-dom';
import useHandleAction from '../../../hooks/useHandleAction';
import StarRating from '../StarRating';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import useUserRates from '../../../hooks/users/useRates';
import { User } from '../../../types/user';
import { useTranslation } from 'react-i18next';
import useBanUser from '../../../hooks/users/useBanUser';
import useFollowers from '../../../hooks/users/useUserFollowers';
import useDeleteFollowers from '../../../hooks/users/DelFollowers';
import useDeleteRates from '../../../hooks/users/DelRates';

const EditIconSrc = '/Edit.svg';
const CheckboxIconSrc = '/checkbox.svg';
const NotBannedIconSrc = '/unblock.svg';
const BannedIconSrc = '/block.svg';

interface ProfileAccordionProps {
  user: User;
}
const UserInfo: React.FC<ProfileAccordionProps> = ({ user }) => {
  const { t } = useTranslation();
  const [selectedRatesIds, setSelectedRateIds] = useState<number[]>([]);
  const [selectedFollowerIds, setSelectedFollowerIds] = useState<number[]>([]);

  const { handleAction, loading: actionLoading } = useHandleAction();
  const { banUser, isSuccess: BanisSuccess } = useBanUser();
  const navigate = useNavigate();

  const { followers, refreshFollowers } = useFollowers(user.id);
  const { data: rates, refreshRates } = useUserRates(user.id);
  const { deleteFollowers, isSuccess: followersDeleted } = useDeleteFollowers();
  const { deleteRates, isSuccess: ratesDeleted } = useDeleteRates();

  useEffect(() => {
    if (followersDeleted || BanisSuccess) {
      refreshFollowers();
    }
  }, [followersDeleted, refreshFollowers, BanisSuccess]);
  useEffect(() => {
    if (ratesDeleted) {
      refreshRates();
    }
  }, [ratesDeleted, refreshRates]);
  const handleClickName = (CustomerId: number) => {
    navigate(`/profile/${CustomerId}`);
  };

  const handleFollowerSelection = (followerId: number) => {
    setSelectedFollowerIds((prev) =>
      prev.includes(followerId)
        ? prev.filter((id) => id !== followerId)
        : [...prev, followerId],
    );
  };

  const handleRateSelection = (rateId: number) => {
    setSelectedRateIds((prev) =>
      prev.includes(rateId)
        ? prev.filter((id) => id !== rateId)
        : [...prev, rateId],
    );
  };

  const confirmDeletionFollowers = () => {
    deleteFollowers(user.id, selectedFollowerIds);
    setSelectedFollowerIds([]);
  };

  const confirmDeletionRates = () => {
    deleteRates(user.id, selectedRatesIds);
    setSelectedRateIds([]);
  };
  const logsFollowers = followers.map((follower, index) => {
    const createdAtDate = new Date(follower.regDate);
    const datePart = createdAtDate.toLocaleDateString();

    return {
      id: follower.id ?? `follower-${index}`,
      type: 2,
      columns: [
        {
          key: `index-${index}`,
          content: index + 1,
          className: 'flex justify-center',
        },
        {
          key: `name-${index}`,
          content: (
            <span
              className="cursor-pointer"
              onClick={() => handleClickName(follower.id)}
            >
              {follower.name.split(' ').slice(0, 2).join(' ').slice(0, 12)}
            </span>
          ),
          className: 'text-TextBlue dark:text-TextGreen',
        },
        {
          key: `alias-${index}`,
          content:
            follower.alias.split(' ').slice(0, 2).join(' ') || 'notfound',
          className: '',
        },
        {
          key: `reg_date-${index}`,
          content: datePart,
          className: 'date-class',
        },
        {
          key: `isBanned-${index}`,
          content: (
            <img
              src={follower.isBanned ? BannedIconSrc : NotBannedIconSrc}
              alt={follower.isBanned ? 'Banned' : 'Not Banned'}
              className="w-6 h-6 text-center cursor-pointer"
              onClick={() =>
                !actionLoading &&
                follower.id &&
                handleAction(
                  follower.id,
                  follower.isBanned === 1,
                  'ban',
                  banUser,
                  {
                    confirmButtonClass: 'bg-BlockIconBg',
                    cancelButtonClass: '',
                  },
                  refreshFollowers,
                )
              }
            />
          ),
          className: 'flex justify-center',
        },
        {
          key: `removefollowers-${index}`,
          content: (
            <img
              src={CheckboxIconSrc}
              alt="Select for removal"
              className={`w-5 h-5 text-center cursor-pointer 
              ${
                selectedFollowerIds.includes(follower.id)
                  ? 'bg-red-600 rounded-full p-1'
                  : ''
              }`}
              onClick={() => {
                handleFollowerSelection(follower.id), refreshFollowers();
              }}
            />
          ),
          className: 'flex justify-center',
        },
      ],
    };
  });

  const logsRates = rates?.map((rate, index) => {
    const createdAtDate = new Date(rate.date_added);
    const datePart = createdAtDate.toLocaleDateString();

    return {
      id: rate.customer_id ?? `rate-${index}`,
      type: 2,
      columns: [
        {
          key: `index-${index}`,
          content: index + 1,
          className: 'flex justify-center',
        },
        {
          key: `name-${index}`,
          content: (
            <span
              className="cursor-pointer"
              onClick={() => handleClickName(rate.customer_id)}
            >
              {rate.name}
            </span>
          ),
          className: 'text-TextBlue dark:text-TextGreen',
        },
        { key: `rating-${index}`, content: rate.rating, className: '' },
        {
          key: `date_added-${index}`,
          content: datePart,
          className: 'date-class',
        },
        {
          key: `edit-${index}`,
          content: (
            <div className="bg-EditIconBg rounded-md">
              <img
                src={EditIconSrc}
                className="w-6 h-6 text-center p-1 cursor-pointer"
                onClick={() =>
                  Swal.fire({
                    html: `
                    <div class="flex justify-between gap-2">
                      <span class="dark:text-TextGreen text-TextBlue text-lg">${
                        rate.name
                      }</span>
                      <span>comment</span>
                    </div>
                    <div class="custom-modal-content bg-primaryBG-light dark:bg-primaryBG-dark p-4 rounded-lg">
                      <div class="">
                        <div class="flex justify-start gap-2">
                          ${ReactDOMServer.renderToString(
                            <StarRating rating={parseFloat(rate.rating)} />,
                          )}
                          <span class="rating-value text-sm text-gray-400">${parseFloat(
                            rate.rating,
                          ).toFixed(1)}</span>
                        </div>
                      </div>
                      <div class="comment-section mt-4 text-gray-700">${
                        rate.comment || 'not found yet'
                      }</div>
                    </div>
                  `,
                    showConfirmButton: false,
                    confirmButtonText: 'Close',
                    customClass: {
                      popup:
                        'custom-popup bg-secondaryBG-light dark:bg-secondaryBG-dark border rounded-md',
                      confirmButton:
                        'custom-confirm-button bg-blue-500 text-white py-2 px-4 rounded-md',
                    },
                  })
                }
              />
            </div>
          ),
          className: 'flex justify-center',
        },
        {
          key: `removerates-${index}`,
          content: (
            <img
              src={CheckboxIconSrc}
              alt="Select for removal"
              className={`w-5 h-5 text-center cursor-pointer 
              ${
                selectedRatesIds.includes(rate.rating_id)
                  ? 'bg-red-600 rounded-full p-1'
                  : ''
              }`}
              onClick={() => handleRateSelection(rate.rating_id)}
            />
          ),
          className: 'flex justify-center',
        },
      ],
    };
  });

  return (
    <div>
      <AccordionHeader2
        titles={[
          t('profile.UserInfo.follower'),
          t('profile.UserInfo.rates'),
          t('profile.UserInfo.bio'),
        ]}
        children={[
          <React.Fragment key="followers-section">
            <MainTable
              logs={logsFollowers}
              header2={true}
              key="followers-table"
            />
          </React.Fragment>,
          <React.Fragment key="rates-section">
            <MainTable
              logs={logsRates || []}
              header2={true}
              key="rates-table"
            />
          </React.Fragment>,
          <Bio Bio={user.bio} key="bio" />,
        ]}
        footerItems={[
          <div className="flex gap-5" key="footer-followers">
            <span key="followers-count">({followers?.length})</span>
            <img src="/users.svg" alt="Users" />
            <img
              src="/redRemove.svg"
              alt="Remove"
              onClick={confirmDeletionFollowers}
            />
          </div>,
          <div className="flex gap-5" key="footer-rates">
            <span key="rates-count">({rates?.length || 0})</span>
            <MdOutlineStarOutline className="text-black dark:text-white text-xl" />
            <img
              src="/redRemove.svg"
              alt="Remove"
              onClick={confirmDeletionRates}
            />
          </div>,
        ]}
      />
    </div>
  );
};

export default UserInfo;
