import React from 'react'
import { drawerProps } from '../constants/types'

function DrawerItem({url,title,redAccent}:drawerProps) {
    return (
        <div className="w-[100%] h-[13%] my-[4px] flex items-center justify-between box-border px-[15px] sm:h-[20%]">
            <img src={url} alt="" className="w-[15%]" />
            <span className="text-[7vw] sm:text-[2vw]" style={{color:redAccent?"#e95353":"black"}}>{title}</span>
        </div>
    )
}

export default DrawerItem