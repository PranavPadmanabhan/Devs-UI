import React from 'react'
import { uploadType } from '../constants/types'

function UploadContent({ checked, onClick, title}:uploadType) {
    return (
        <div onClick={onClick} className="w-[100%] h-[75%] flex items-center my-2 cursor-pointer">
            <div className="w-[10%] min-w-[22px] max-w-[25px] h-[25%] min-h-[25px]  sm:max-w-[25px] bg-gray-200 rounded-[100%] flex items-center justify-center  mr-3">
                {checked && (<img src="/Assets/icons/check(2).png" alt="" className="w-[100%]  min-w-[25px] max-w-[30px]  min-h-[25px] max-w-[30px] " />)}
            </div>
            <span className="text-[4vw] sm:text-[1vw] text-gray-600 esm:text-[3.5vw] asm:text-[3.3vw] msm:text-[2.8vw]">{title}</span>

        </div>
    )
}

export default UploadContent