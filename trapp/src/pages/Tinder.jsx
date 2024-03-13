


function Tinder() {

  return (
      <>
          <div className="mx-3 my-20">
              <div className="flex flex-col items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl p-6">
                  
              </div>
          </div>
      </>
  )
}

<<<<<<< HEAD
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
=======
export default Tinder
>>>>>>> d8a76f6d84861ae5afa4b08de0829ac90349c35f
