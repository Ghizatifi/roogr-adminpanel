import React from 'react';
import {
  MdOutlineStarPurple500,
  MdOutlineStarOutline,
  MdStarHalf,
} from 'react-icons/md';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const maxRating = 5;

  // Function to determine if a fractional part should render as a full, half, or empty star
  const getStarType = (fraction: number) => {
    if (fraction >= 0.75) {
      return 'full';
    } else if (fraction >= 0.25) {
      return 'half';
    } else {
      return 'empty';
    }
  };

  const fullStars = Math.floor(rating); // Number of full stars
  const fractionalPart = rating % 1; // Fractional part of the rating (e.g., 0.3 or 0.7)
  const starType = getStarType(fractionalPart); // Determine if it's a full, half, or empty star
  const emptyStars =
    maxRating -
    fullStars -
    (starType === 'full' || starType === 'half' ? 1 : 0); // Remaining empty stars

  return (
    <>
      {/* Render full stars */}
      {Array.from({ length: fullStars }, (_, index) => (
        <span key={`full-${index}`}>
          <MdOutlineStarPurple500 className="text-gray-400" />
        </span>
      ))}

      {/* Render fractional star if applicable */}
      {starType === 'half' && (
        <span>
          <MdStarHalf className="text-gray-400" />
        </span>
      )}
      {starType === 'full' && (
        <span>
          <MdOutlineStarPurple500 className="text-gray-400" />
        </span>
      )}

      {/* Render empty stars */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <span key={`empty-${index}`} className="text-gray-400">
          <MdOutlineStarOutline />
        </span>
      ))}
    </>
  );
};

export default StarRating;
