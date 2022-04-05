import React from 'react'

function MiniFooter() {
    return (
        <footer className='w-[100%] h-auto min-h-[50vh] snap-center bg-red-300 py-[5%] flex flex-col items-center bg-footer-mesh bg-no-repeat bg-cover bg-center sm:hidden'>
            <div className="w-screen max-w-[200px] h-[25%] flex flex-col items-center justify-start my-[15px] sm:mt-[5vh]">
                <p className="text-left">ofifiuahfuafihafu</p>
                <p className="text-left">ofifiuajkbafbjkbafkhfuafihafu</p>
                <p className="text-left">ofifiuajajfffjkbkfhfuafihafu</p>
                <div className="flex w-[70%] items-center justify-evenly mt-[20px] sm:hidden ">
                    <img src="/Assets/lightmode/instagram.png" alt="instagram" className="w-[15%] min-w-[30px]" />
                    <img src="/Assets/lightmode/twitter.png" alt="twitter" className="w-[15%] min-w-[30px]" />
                </div>
            </div>
            <div className="w-screen flex flex-col items-center h-[25%] justify-center mt-[5%]">
                <span className="text-[5vw] font-semibold sm:text-[1.5vw] sm:my-[10px]">Explore</span>
                <div className="w-[60%] mt-[5px] flex items-center justify-between ">
                    <span className="">Home</span>
                    <span className="">Designs</span>
                    <span className="">Challenges</span>
                </div>
            </div>
            <div className="w-screen flex flex-col items-center h-[25%] justify-center ">
                <span className="text-[5vw] font-semibold ">Contact Us</span>
                <div className="flex w-[40%] items-center justify-between mt-[5px] ">
                    <span className="">Email Us</span>
                    <span className="">Discord</span>
                </div>

            </div>
        </footer>
    )
}

export default MiniFooter