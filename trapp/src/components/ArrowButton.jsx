import React from 'react';
// Import the images
import greenTick from '../assets/accept.svg'; // Adjust the path as necessary
import redCross from '../assets/reject.svg'; // Adjust the path as necessary

const ArrowButton = ({ direction, onClick }) => {
  // Styles adjusted for transparency and no border
  const baseStyles = "h-16 w-16 rounded-full flex items-center justify-center shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer";
  const styles = direction === 'left' ? `${baseStyles} mr-4` : `${baseStyles} ml-4`;

  // Use the imported images based on the direction
  const icon = direction === 'left' ? redCross : greenTick;

  return (
    <button className={styles} onClick={onClick} style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}>
      <img src={icon} alt={direction === 'left' ? 'Reject' : 'Accept'} style={{ width: '100%', height: '100%' }} />
    </button>
  );
};

export default ArrowButton;
