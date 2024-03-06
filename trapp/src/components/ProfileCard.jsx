import React from 'react';

function ProfileCard({ name, bio, avatar, features, interests }) {
  
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 m-2">
      <img className="rounded-t-lg mx-auto h-32 w-32" src={avatar} alt="profile image" />
      <h5 className="text-xl font-medium leading-tight mt-4 mb-2 text-center">{name}</h5>
      <p className="text-xs text-gray-500 text-center mt-1">{bio}</p>
      <div className="mt-4">
        <h6 className="text-md font-medium text-center">Features</h6>
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {features.map((feature, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{feature}</span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h6 className="text-md font-medium text-center">Interests</h6>
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {interests.map((interest, index) => (
            <span key={index} className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ">{interest}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;