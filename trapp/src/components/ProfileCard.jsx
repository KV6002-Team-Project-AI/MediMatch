import React from 'react'
import profilePic from '../assets/profile-pic.jpg'
import infoLogo from '../assets/info.png'
import summarise from '../assets/summary.png'

const ProfileCard = () => {
    const features = ["Brown Hair", "25 Years old", "1.76 metres"];
    const interests = ['Football', 'Swimming', 'Reading'];
  
    return (
      <div className='my-3 mx-10'>
        <div className="flex flex-col justify-center p-2 items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl relative">
          <img src={summarise} alt="summarise" className=" w-7 h-7 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-0.5 absolute top-2 left-2" />
          <img src={infoLogo} alt="info" className="w-7 h-7 hover:bg-gray-200 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-0.5 absolute top-2 right-2"/>
          <img src={profilePic} alt="Person" className="w-20 h-20 rounded-full"/>
          <p className="font-medium text-lg text-gray-800">John Doe</p>
          <p className='text-center font-normal mt-3'>Welcome to my natural habitat, where I can speak no more than this.</p>
  
          <hr className="border-gray-400 w-full mt-0" />
  
          <div className="font-semibold justify-center mt-3 mb-3 underline underline-offset-2">Features: </div>
          <div className="flex gap-2">
            {features.map((feature, index) => (
              <div key={index} className="bg-blue-100 w-full text-blue-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                {feature}
              </div>
            ))}
          </div>
  
          <hr className="border-gray-400 w-full mt-3" />
  
          <div className="font-semibold justify-center mt-3 mb-3 underline underline-offset-2">Interests: </div>
          <div className="flex gap-2">
            {interests.map((interests, index) => (
              <div key={index} className="bg-green-100 w-full text-green-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                {interests}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  

  export default ProfileCard;