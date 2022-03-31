import React from 'react'
import { providedItemProps } from '../constants/types'


function ItemsProvided({title}:providedItemProps) {
    return (
        <div className="pl-[5%] w-screen flex items-center ml-[5px my-[10px] sm:w-[100%]">
            <img src="/Assets/icons/check(2).png" alt="" className="w-[10%] max-w-[25px] mr-[10px]" />
            <span className="text-black font-light text-[3.8vw] sm:text-[1vw]">{title}</span>
        </div>
    )
}

export default ItemsProvided