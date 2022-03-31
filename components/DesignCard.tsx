import React from 'react'

function DesignCard() {
  return (
    <div className='cursor-pointer self-center w-[85%] h-[60vh] flex-none  snap-center rounded-[20px] shadow-task p-[5%] flex flex-col sm:h-[65vh] sm:max-h-[600px] sm:rounded-[25px] sm:w-[85%] my-[10px]  sm:hover:scale-125 duration-700'>
        <img src="/Assets/images/image1.JPG" alt="" className="rounded-[15px] h-[75%] w-[100%] sm:h-[65%] "  style={{boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}/>
        <h1 className="self-center text-[7vw] font-semibold my-[10px] sm:text-[1.6vw] sm:my-[1.5vw]">Dream Job Finder</h1>
        <div className="flex w-[100%] items-center justify-between my-[5px]">
            <div className="flex w-[40%] items-center justify-between">
                <img src="/Assets/lightmode/flash.png" alt="" className="cursor-pointer w-[20%] min-w-[25px]" />
                <img src="/Assets/lightmode/messenger.png" alt="" className="cursor-pointer w-[20%] min-w-[25px]" />
                <img src="/Assets/lightmode/share.png" alt="" className="cursor-pointer w-[20%] min-w-[25px]" />
            </div>
            <img src="/Assets/icons/avatar.png" alt="" className="cursor-pointer w-[10%] min-w-[40px]" />
        </div>
    </div>
  )
}

export default DesignCard