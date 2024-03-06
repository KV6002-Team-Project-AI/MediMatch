import profilePic from '../assets/profile-pic.jpg'
import infoLogo from '../assets/info.png'

function Matches() {

    const features = ["Brown Hair", "25 Years old", "1.76 metres"]
    return (
        <div className="mx-3 my-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                    <div>
                        <div className='flex p-2'>
                            <img src={profilePic} alt="Person" className="w-20 h-20 rounded-full mr-3"/>
                            <div className='flex-col'>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold mb-2">Adam Legend</h2>
                                    <img src={infoLogo} alt="info" className="w-5 h-5 hover:bg-gray-200 mb-2 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-0.5"/>
                                </div>
                                <div className="flex gap-2 ">
                                    {features.map((feature, index) => (
                                        <div key={index} className="bg-blue-100 text-blue-800 p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                            {feature}
                                        </div>
                                    ))}                          
                                </div>
                            </div>
                        </div>
                        <div className='flex mx-2 mb-2 text-white gap-2 text-center'>
                            <div className='w-full bg-red-600  p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-red-800 transform hover:-translate-y-0.5'>
                                Reject
                            </div>
                            <div className='w-full bg-green-600 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-green-800 transform hover:-translate-y-0.5'>
                                Accept
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Matches
