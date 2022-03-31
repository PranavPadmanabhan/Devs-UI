import React from 'react'
import { buttonProps } from '../constants/types'


function ChallengeButtons({title}:buttonProps) {
    return (
        <div className="w-[31%] h-[65%] min-h-[40px] bg-[#333c73] rounded-[25px] flex items-center justify-center sm:w-[25%]">
            <span className="text-[2.8vw] text-white text-center font-semibold sm:text-[1vw]">{title}</span>
        </div>
    )
}

export default ChallengeButtons