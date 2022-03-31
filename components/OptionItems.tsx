import React from 'react'
import { optionProps } from '../constants/types'

function OptionItems({ selected, onClick, title, borderEnabled }:optionProps) {
    return (
        <div onClick={onClick} className={`w-[100%] h-[25%] bg-white cursor-pointer flex items-center justify-between px-[15px] border-b-[2px] border-${borderEnabled?'gray-300':'white'}`}>
            <span className="text-[22px]">{title}</span>
            {selected && (<img src="/Assets/icons/check PLANE.png" alt="" className="w-[10%]" />)}
        </div>
    )
}

export default OptionItems