import React, { Component } from 'react';
import { TinderLikeCard } from 'react-stack-cards';
import profilePic from '../assets/profile-pic.jpg'; // Adjust the path as necessary

class ProfileCard extends React.Component {
  render() {
    const { name, bio, avatar, features, interests } = this.props;
    return (
      <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md light:bg-gray-800 light:border-gray-700 p-4 m-2">
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
              <span key={index} className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800">{interest}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

class Tinder extends Component {
  constructor(props) {
    super(props);
    this.Tinder = React.createRef(); // Using React.createRef() for a more modern approach
  }

  swipe = () => {
    if (this.Tinder.current) {
      this.Tinder.current.swipe(); // Adjusted to reference current for the ref
    }
  }

  render() {
    const profile = {
      name: 'John Smith',
      bio: 'Dedicated to creating products that resonate with users and meet business goals.',
      avatar: profilePic,
      features: ['Great teamwork', 'Problem solver', 'Quick learner'],
      interests: ['Coding', 'Hiking', 'Traveling', 'Photography'],
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <TinderLikeCard
          images={[]}
          color={"#f95c5c"}
          width="350"
          height="450"
          direction="swipeCornerDownRight"
          ref={this.Tinder}
        >
          <ProfileCard {...profile} />
        </TinderLikeCard>
        <button onClick={this.swipe} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Swipe</button>
      </div>
    );
  }
}

export default Tinder;
