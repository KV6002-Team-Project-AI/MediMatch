import React from 'react';
import ProfileCard from './ProfileCard';

const CardStack = () => {
  const cardCount = 3;
  const offsetY = 15; // Vertical offset in pixels
  const offsetX = -5;  // Positive value for moving to the right

  return (
    <div className="relative mb-20 h-[500px]">
      {Array.from({ length: cardCount }, (_, index) => (
        <div 
          key={index}
          className="absolute inset-0" 
          style={{
            transform: `translate(${offsetX * index}px, ${offsetY * index}px)`, // Apply both X and Y offsets
          }}
        >
          <ProfileCard />
        </div>
      ))}
    </div>
  );
};

export default CardStack;
