import React from 'react';

const RecruiteeProfileCard = () => {
  // Placeholder data - replace these with real data fetched from your database
  const profileData = {
    name: "John Doe",
    age: "30",
    bio: "Experienced data analyst with a passion for big data and predictive analytics. Seeking opportunities to contribute to innovative research in data science.",
    workPreference: "Solo",
    profession: "Data Analyst",
    biologicalSex: "Male",
    studyPreference: "Data Science",
    interest1: "Machine Learning",
    interest2: "Statistical Models",
    interest3: "AI Development"
  };

  // Dummy functions for button clicks - replace these with real functions
  const handleReject = () => console.log('Rejected');
  const handleRefresh = () => console.log('Refreshed');
  const handleAccept = () => console.log('Accepted');

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{profileData.profession}</div>
            <div className="block mt-1 text-lg leading-tight font-medium text-black">{profileData.name}, {profileData.age}</div>
            <p className="mt-2 text-gray-500">{profileData.bio}</p>
          </div>
          <div className="border-t-2 border-gray-200 md:border-t-0 md:border-l">
            <div className="p-8">
              <div className="text-sm font-semibold text-gray-700">Work Preference</div>
              <div className="text-md text-indigo-500">{profileData.workPreference}</div>
              <div className="mt-4 text-sm font-semibold text-gray-700">Study Preference</div>
              <div className="text-md text-indigo-500">{profileData.studyPreference}</div>
              <div className="mt-4 text-sm font-semibold text-gray-700">Biological Sex</div>
              <div className="text-md text-indigo-500">{profileData.biologicalSex}</div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-gray-200 p-8">
          <div className="text-sm font-semibold text-gray-700">Interests</div>
          <ul className="mt-2 text-gray-500 list-disc list-inside">
            <li>{profileData.interest1}</li>
            <li>{profileData.interest2}</li>
            <li>{profileData.interest3}</li>
          </ul>
        </div>
        {/* Buttons */}
        <div className="flex justify-around items-center p-4 bg-gray-50">
          <button
            onClick={handleReject}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none"
          >
            Reject
          </button>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none"
          >
            Refresh
          </button>
          <button
            onClick={handleAccept}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiteeProfileCard;
