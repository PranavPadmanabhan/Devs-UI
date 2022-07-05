import React from 'react'
import { buttonProps } from '../constants/types'


function ChallengeButtons({title }:buttonProps) {
    
    return (
        <div className="w-[31%] h-[65%] min-w-[100px] sm:min-w-[130px] min-h-[40px] mx-3 bg-[#333c73] rounded-[25px] flex items-center justify-center sm:w-[25%]">
            <span className="text-[2.5vw] text-white text-center font-semibold sm:text-[0.9vw]">{title}</span>
        </div>
    )
}

export default ChallengeButtons