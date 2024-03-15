import addLogo from '../assets/add.svg'

function Research() {

    return (
        <>
            <div className="mx-3 my-20">
                <div className="grid grid-col pb-4">
                    <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                        <div className='w-full px-1'>
                            <div className='flex p-2 gap-2 justify-between'> 
                                <div className='flex items-center'>
                                    <input type="text" placeholder="Search..." className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className='flex items-center'>
                                    <img src={addLogo} alt="add" className='h-7 transition duration-300 ease-in-out hover:bg-gray-100 transform hover:-translate-y-0.5 '/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                        <div className='w-full px-1 md:px-2'>
                            <div className='flex p-2 gap-2 justify-between'>
                                <div className='flex-col'>
                                    <h2 className="text-xl font-bold">STUDY NAME</h2>
                                    <h3 className='italic font-mono'>Recruiter name</h3>
                                </div>
                                <div className="text-right">
                                    <h2>Study Category</h2>
                                </div>
                            </div>
                            <div className='flex px-2 pb-4 justify-between'>
                                <div className='flex-col'>
                                    <p className='text-justify'>
                                        Bro wassup? What we doing out here?
                                        What is this experiment we doin? We testing the 
                                        donuts innit? Wassup with their mind cuh? What going
                                        on up there in their minds? Testing dumbos. 
                                    </p>
                                </div>
                            </div>
                            <div className='flex mx-2 mb-2 text-white gap-2 text-center'>
                                <div className='w-full bg-blue-500 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 transform hover:-translate-y-0.5'>
                                    Edit
                                </div>
                                <div className='w-full bg-red-500  p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-red-800 transform hover:-translate-y-0.5'>
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                        <div className='w-full px-1 md:px-2'>
                            <div className='flex p-2 gap-2 justify-between'>
                                <div className='flex-col'>
                                    <h2 className="text-xl font-bold">STUDY NAME</h2>
                                    <h3 className='italic font-mono'>Recruiter name</h3>
                                </div>
                                <div className="text-right">
                                    <h2>Study Category</h2>
                                </div>
                            </div>
                            <div className='flex px-2 pb-4 justify-between'>
                                <div className='flex-col'>
                                    <p className='text-justify'>
                                        Bro wassup? What we doing out here?
                                        What is this experiment we doin? We testing the 
                                        donuts innit? Wassup with their mind cuh? What going
                                        on up there in their minds? Testing dumbos. 
                                    </p>
                                </div>
                            </div>
                            <div className='flex mx-2 mb-2 text-white gap-2 text-center'>
                                <div className='w-full bg-blue-500 p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 transform hover:-translate-y-0.5'>
                                    Edit
                                </div>
                                <div className='w-full bg-red-500  p-2 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out hover:bg-red-800 transform hover:-translate-y-0.5'>
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
 
export default Research
 