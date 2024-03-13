import React, { Component } from 'react';
import { TinderLikeCard } from 'react-stack-cards';
import profilePic from '../assets/profile-pic.jpg'; // Adjust the path as necessary
import accept from "../assets/accept.svg"
import reject from "../assets/reject.svg"


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
              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded light:bg-blue-200 light:text-blue-800">{feature}</span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h6 className="text-md font-medium text-center">Interests</h6>
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {interests.map((interest, index) => (
              <span key={index} className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded light:bg-green-200 light:text-green-800">{interest}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

class Tinder extends Component {
  constructor(props){
    super(props)
    this.state = {
      directionTinder: "swipeCornerDownRight",
    }
    this.Tinder = null
  }

  onTinderSwipe() {
    this.Tinder.swipe()
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
      <>
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
          <div>
            <TinderLikeCard
              images={[]}
              color={"#f95c5c"}
              width="350"
              height="450"
              direction={this.state.directionTinder}
              duration={400}
              ref={(node) => this.Tinder = node}
              className="tinder"
            >

              <ProfileCard {...profile} />
            </TinderLikeCard>
          </div>
          <div className='flex  flex-row gap-2'>
            <img src={reject} onClick={this.swipe} className="mt-20 font-bold py-2 px-4 rounded" />
            <img src={accept} onClick={this.swipe} className="mt-20 font-bold py-2 px-4 rounded" />
          </div>
        </div>

        
      </>

      

    );
  }
}

export default Tinder;
