import React from 'react'
import { checkBoxProps } from '../constants/types'

function CheckBox({ checked, percentage, onClick }: checkBoxProps) {
    return (
        <div className="flex flex-col items-center justify-start w-[17%] h-[100%] mx-2 cursor-pointer">
            <span className="text-gray-500 text-[4vw] sm:text-[1vw] esm:font-bold">{percentage}</span>
            <div onClick={onClick} className="w-[100%] min-w-[35px] max-w-[34px] h-[35%] min-h-[35px] max-h-[35px] flex items-center justify-center rounded-[7px] bg-gray-200 mt-1">
                {checked && (<img src="/Assets/icons/check PLANE.png" alt="" className="w-[70%]" />
                )}
            </div>
        </div>
    )
}

export default CheckBox