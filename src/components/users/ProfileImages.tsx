import React from 'react';
import CoverOne from '/BG.png';
import userSix from '/Defualt.png';

interface ProfileImagesProps {
  user: {
    image?: string;
    cover?: string;
  };
  /** Compact: small avatar only, no big cover. Default true for admin profile. */
  compact?: boolean;
}

const ProfileImages: React.FC<ProfileImagesProps> = ({ user, compact = true }) => {
  const imgSrc =
    user?.image === 'https://roogr.sa/api/image/'
      ? userSix
      : user?.image || userSix;
  const coverSrc =
    user?.cover === 'https://roogr.sa/api/image/'
      ? CoverOne
      : user?.cover || CoverOne;

  if (compact) {
    return (
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray/20 shadow dark:border-strokedark dark:bg-meta-4/30">
        <img
          src={imgSrc}
          className="h-full w-full object-cover"
          alt=""
          aria-hidden
        />
      </div>
    );
  }

  return (
    <>
      <div className="relative z-20 h-20 overflow-hidden rounded-t-xl">
        <img
          src={coverSrc}
          className="h-full w-full object-cover object-center"
          alt=""
          aria-hidden
        />
      </div>
      <div className="px-4">
        <div className="relative z-30 -mt-10 mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-white bg-white shadow dark:border-strokedark dark:bg-boxdark">
          <img src={imgSrc} className="h-full w-full object-cover" alt="" aria-hidden />
        </div>
      </div>
    </>
  );
};

export default ProfileImages;
