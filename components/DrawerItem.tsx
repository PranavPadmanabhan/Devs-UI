import Link from 'next/link'
import React from 'react'
import { drawerProps } from '../constants/types'
import styles from '../styles/desktop.module.css'

function DrawerItem({ url, title, redAccent, destination, upcoming }: drawerProps) {
    return (
        <Link href={`/${destination}`}>
            <div className={`${styles.DrawerItem} w-[100%] h-[13%] my-[4px] cursor-pointer flex items-center justify-between box-border px-[15px] sm:h-[20%]`}>
                <img src={url} alt="" className={`w-[15%] hover:animate-bounce`} />
                <span className={`${styles.DrawerItemText} group text-[7vw] text-black sm:text-[1.7vw] sm:hover:text-[1.9vw] duration-700 hover:transition-transform `} style={{ color: redAccent ? "#e95353" : "black",textDecorationLine:upcoming?"line-through":"none"}}>{title}</span>
            </div>
        </Link>
    )
}

export default DrawerItem