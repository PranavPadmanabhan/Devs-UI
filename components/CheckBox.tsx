import React from 'react'
import { checkBoxProps } from '../constants/types'
import styles from '../styles/desktop.module.css'

function CheckBox({ checked, percentage, onClick }: checkBoxProps) {
    return (
        <div className="flex flex-col items-center justify-start w-[17%] h-[100%] mx-2 cursor-pointer">
            <span className={`${styles.checkboxText} text-gray-500 text-[4vw] esm:font-bold esm:text-[3.4vw] asm:text-[3vw] msm:text-[2.5vw] sm:text-[0.8vw] md:text-[2.5vw] lg:text-[1.4vw] xl:text-[1.5vw]`}>{percentage}</span>
            <div onClick={onClick} className={`${styles.checkBox} w-[100%] min-w-[35px] max-w-[34px] h-[35%] min-h-[35px] max-h-[35px] flex items-center justify-center rounded-[7px] bg-gray-200 mt-1 xl:min-h-[45px] xl:max-h-[50px] xl:min-w-[45px] xl:max-w-[50px]`}>
                {checked && (<img src="/Assets/icons/check PLANE.png" alt="" className="w-[70%]" />
                )}
            </div>
        </div>
    )
}

export default CheckBox