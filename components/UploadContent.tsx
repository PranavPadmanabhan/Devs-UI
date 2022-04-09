import React from 'react'
import { uploadType } from '../constants/types'

function UploadContent({ checked, onClick, title}:uploadType) {
    return (
        <div  className="w-[100%] h-[75%] flex items-center my-2">
            <div onClick={onClick} className="w-[10%] min-w-[22px] max-w-[25px] h-[25%] min-h-[25px] sm:max-w-[25px] bg-gray-200 rounded-[100%] flex items-center justify-center cursor-pointer  mr-3 xl:w-[15%] xl:min-w-[30px] xl:max-w-[35px] xl:h-[35%] xl:min-h-[35px] xl:sm:max-w-[37px]">
                {checked && (<img src="/Assets/icons/check(2).png" alt="" className="w-[100%]  min-w-[25px] max-w-[30px]  min-h-[25px] max-w-[30px] xl:w-[15%] xl:min-w-[33px] xl:max-w-[35px] xl:h-[35%] xl:min-h-[33px] xl:sm:max-w-[35px]" />)}
            </div>
            <span onClick={onClick} className="cursor-pointer text-[4vw] sm:text-[1vw] text-gray-600 esm:text-[3.5vw] asm:text-[3.3vw] msm:text-[2.8vw] md:text-[2vw] lg:text-[1.3vw] xl:text-[1.4vw]">{title}</span>

        </div>
    )
}

export default UploadContent