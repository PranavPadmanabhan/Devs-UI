import React from 'react'
import { socialMediaProps } from '../constants/types'

function SocialMediaItems({ title, url}:socialMediaProps) {
    return (
        <div className="flex my-[1px] w-[90%] h-[8%] items-center sm:h-[10%]">
            <img src={url} alt="" className="w-[15px] h-[15px] sm:w-[5%] mr-2" />
            <span className="text-black text-[16px]">{title}</span>
        </div>
    )
}

export default SocialMediaItems