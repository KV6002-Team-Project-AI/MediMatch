


function Browse() {

    const researchFields = [
        'Medical and Health', 
        'Social', 
        'Natural', 
        'Engineering and Technology',
        'Business and Management',
        'Humanities and Arts',
        'Agricultural and Environmental',
        'Interdisciplinary'
    ]

    return (
        <>
            <div className="mx-3 my-20">
            <div className="grid grid-col pb-4">
                <div className="flex justify-center items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl">
                    <div className='px-1 w-full'>
                        <div className='sm:flex p-2 gap-2 justify-between md:flex-row'> 
                            <div className='flex items-center pb-2 sm:pb-0'>
                                <input type="text" placeholder="Search..." className="px-4 py-2 border w-full  border-gray-300 rounded-lg focus:outline-none focus:border-blue-300" />
                            </div>
                            <div className='flex items-start'>
                                <select className="font-semibold py-2 px-2 rounded-lg w-full">
                                    <option value="addResearch">Select Field</option>
                                    {researchFields.map((field, index) => (
                                        <option key={index} value={field}>{field}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                <div className="flex flex-col items-center bg-white transition duration-500 ease-in-out shadow-md hover:bg-gray-100 rounded-2xl hover:shadow-2xl p-6">
                    <h1 className="text-3xl font-semibold text-center">Browse</h1>
                </div>
            </div>
        </>
    )
}
 
export default Browse
 