// ProfileImages.tsx
import React from 'react';
import CoverOne from '/BG.png';
import userSix from '/Defualt.png';

interface ProfileImagesProps {
  user: {
    image?: string;
    cover?: string;
  };
}

const ProfileImages: React.FC<ProfileImagesProps> = ({ user }) => {
  return (
    <>
      {/* Cover Image */}
      <div className="relative z-20 h-35 md:h-65">
        <img
          src={
            user?.cover === 'https://roogr.sa/api/image/'
              ? CoverOne
              : user?.cover || CoverOne
          }
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          alt="profile cover"
        />
      </div>

      {/* Profile Image */}
      <div className="px-4 text-center">
        <div className="relative z-30 mx-auto -mt-22 h-32 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur">
          <img
            src={
              user?.image === 'https://roogr.sa/api/image/'
                ? userSix
                : user?.image || userSix
            }
            className="rounded-full h-30 w-30 text-center"
            alt="profile"
          />
        </div>
      </div>
    </>
  );
};

export default ProfileImages;
