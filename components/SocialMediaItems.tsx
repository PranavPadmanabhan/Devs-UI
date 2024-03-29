import React from 'react'
import { socialMediaProps } from '../constants/types'

function SocialMediaItems({ title, url}:socialMediaProps) {
    return (
        <div className="flex my-[1px] w-[90%] h-auto min-h-[8%] items-center sm:my-[1px] sm:h-[10%]">
            <img src={url} alt="" className="w-[15px] object-cover h-[15px] sm:w-[20px] sm:h-[20px] mr-2" />
            <span className="block sm:hidden text-black text-[16px]">{title == 'Not Available'?title:`${title?.slice(0,14)}..`}</span>
            <span className="hidden sm:block text-black text-[16px]">{title}</span>
        </div>
    )
}

export default SocialMediaItems