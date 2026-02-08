// export default UserForm;
import React, { useState } from 'react';
import ReusableInput from '../products/ReusableInput';
import ReusableSelect from '../products/ReusableSelectProps';
import { useTranslation } from 'react-i18next';
import { User } from '../../types/user';
import useEditUser from '../../hooks/users/Edit';
import { toast } from 'react-toastify';

const SaveIconSrc = '/save.svg';

interface ProfileAccordionProps {
  user: User;
  loading: boolean;
  error: string | null;
}

const UserForm: React.FC<ProfileAccordionProps> = ({
  user,
  loading,
  error,
}) => {
  const { editUser, loading: editLoading, error: editError } = useEditUser();
  const { t } = useTranslation();

  // Local state for tracking changes to the user data
  const [editedUser, setEditedUser] = useState<User>(user);

  // const handleInputChange = (
  //   field: keyof User,
  //   value: string | number | boolean,
  // ) => {
  //   setEditedUser((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };
  // const handleInputChange = (
  //   field: keyof User,
  //   value: any,
  //   nestedField?: keyof User['isActivated'],
  // ) => {
  //   setEditedUser((prevUser) => ({
  //     ...prevUser,
  //     [field]: nestedField
  //       ? { ...prevUser[field], [nestedField]: value }
  //       : value,
  //   }));
  // };
  const handleInputChange = (
    field: keyof User,
    value: any,
    nestedField?: keyof User['isActivated'],
  ) => {
    setEditedUser((prevUser) => {
      if (
        nestedField &&
        typeof prevUser[field] === 'object' &&
        prevUser[field] !== null
      ) {
        // Safe to spread only if `field` refers to an object
        return {
          ...prevUser,
          [field]: {
            ...(prevUser[field] as Record<string, any>),
            [nestedField]: value,
          },
        };
      } else {
        // If not nested, handle as a direct assignment
        return {
          ...prevUser,
          [field]: value,
        };
      }
    });
  };

  const handleEditClick = async () => {
    try {
      await editUser(editedUser.id, editedUser);
      // alert('User updated successfully!');
      toast.success(t('User updated successfully!'));
    } catch (err) {
      // alert('Error updating user. Please try again.');
      toast.error(t('Error updating user. Please try again.'));
    }
  };

  // if (loading || editLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error || editError) {
  //   return <p>{error || editError}</p>;
  // }

  return (
    <div className="my-3 flex justify-center flex-col gap-10 bg-secondaryBG-light dark:bg-secondaryBG-dark p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10">
        <ReusableInput
          label={t('profile.userDetials.id')}
          type="text"
          value={editedUser.id}
          onChange={(e) => handleInputChange('id', e.target.value)}
          extraClass="bg-Input-gray w-40"
        />
        <ReusableSelect
          label={t('profile.userDetials.type')}
          value={editedUser.type}
          options={[
            {
              value: 'advertiser',
              label: t('profile.userDetials.advertiser'),
            },
            { value: 'customer', label: t('profile.userDetials.customer') },
          ]}
          onChange={(e) => handleInputChange('type', e.target.value)}
          extraClass="bg-Input-blue text-Input-TextBlue w-40"
        />
        <ReusableInput
          label={t('profile.userDetials.name')}
          type="text"
          value={editedUser.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          extraClass="bg-Input-blue w-40"
        />
        <ReusableInput
          label={t('profile.userDetials.alias')}
          type="text"
          value={editedUser.alias}
          onChange={(e) => handleInputChange('alias', e.target.value)}
          extraClass="bg-Input-blue w-40"
        />
        <ReusableInput
          label={t('profile.userDetials.phone')}
          type="tel"
          value={editedUser.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          extraClass="bg-Input-blue w-40"
        />
        {/* <ReusableSelect
          label="Phone Activation"
          value={editedUser.isActivated.account ? '1' : '0'}
          options={[
            { value: '1', label: 'Activated' },
            { value: '0', label: 'Deactivated' },
          ]}
          onChange={(e) =>
            handleInputChange('isActivated.account', e.target.value === '1')
          }
          extraClass="bg-Input-green text-Input-TextGreen w-40"
        /> */}
        <ReusableSelect
          label={t('profile.userDetials.mobileconfirm')}
          value={editedUser.isActivated.account ? '1' : '0'}
          options={[
            { value: '1', label: t('profile.userDetials.Activated') },
            { value: '0', label: t('profile.userDetials.Deactivated') },
          ]}
          onChange={(e) =>
            handleInputChange('isActivated', e.target.value === '1', 'account')
          }
          extraClass="bg-Input-green text-Input-TextGreen w-40"
        />

        <ReusableInput
          label={t('profile.userDetials.regDate')}
          type="text"
          value={editedUser.regDate}
          onChange={(e) => handleInputChange('regDate', e.target.value)}
          extraClass="bg-Input-gray w-40"
        />
        <ReusableInput
          label={t('profile.userDetials.country')}
          type="text"
          value={editedUser.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          extraClass="bg-Input-gray w-40"
        />
        <ReusableInput
          label={t('profile.userDetials.email')}
          type="email"
          value={editedUser.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          extraClass="bg-Input-blue w-40"
        />
        {/* <ReusableSelect
          label="Email Activation"
          value={editedUser.isActivated.email ? '1' : '0'}
          options={[
            { value: '1', label: 'Activated' },
            { value: '0', label: 'Deactivated' },
          ]}
          onChange={(e) =>
            handleInputChange('isActivated.email', e.target.value === '1')
          }
          extraClass="bg-Input-red text-Input-TextRed w-40"
        /> */}
        <ReusableSelect
          label={t('profile.userDetials.emailleconfirm')}
          value={editedUser.isActivated.email ? '1' : '0'}
          options={[
            { value: '1', label: t('profile.userDetials.Activated') },
            { value: '0', label: t('profile.userDetials.Deactivated') },
          ]}
          onChange={(e) =>
            handleInputChange('isActivated', e.target.value === '1', 'email')
          }
          extraClass="bg-Input-red text-Input-TextRed w-40"
        />
      </div>
      {/* <div className="bg-SaveIconBg rounded-md w-35 flex justify-center self-center">
        <img
          src={SaveIconSrc}
          className="w-8 h-8 text-center p-1 cursor-pointer"
          onClick={handleEditClick}
          alt="Save Icon"
        />
      </div> */}
    </div>
  );
};

export default UserForm;
