import React from 'react'
import { toolsProps } from '../constants/types'

function DesignTools({ checked, onClick, url }: toolsProps) {
    return (
        <div onClick={onClick} className="w-[20%] h-[100%] flex items-start justify-center sm:w-[10%] cursor-pointer">
            <div className="w-[10%] min-h-[12px] min-w-[12px] max-h-[15px] max-w-[15px] h-[10%] bg-gray-200 rounded-[2px] flex items-center justify-center mr-1">
                {checked && (<img src="/Assets/icons/check PLANE.png" alt="" className="w-[70%]" />
                )}
            </div>
            <img src={url} alt="" className="w-[60%]" />
        </div>
    )
}

export default DesignTools