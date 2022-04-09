import Link from 'next/link'
import React from 'react'
import { Cardprops } from '../constants/types'
import styles from '../styles/desktop.module.css'




function Card({ url, title, description, level, destination }: Cardprops) {

  const colors = ["#58FF74", "#F4FF58", "#FFA658", "#FF5858"]

  return (
    <Link href={`/${destination}`}>
      <div className={`${styles.Card} w-[87%] h-[65vh] flex-none cursor-pointer snap-center rounded-[20px] mx-[15px] my-[10px] shadow-task last:mr-[30px] p-[5%] flex flex-col sm:h-[75vh] sm:max-h-[600px] sm:rounded-[25px] sm:w-[88%] sn:hover-z-1  sm:hover:scale-110 duration-700`}>
        {/*------- challenge image ----- */}
        <img src={url} alt="" className={`${styles.CardImg} rounded-[15px] max-h-[60%] w-[100%] min-h-[40vh] sm:max-h-[65%]`} style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} />
        {/*------- challenge image ----- */}

          {/*------ level of challenge starts here ----------*/}

        <div className="self-start my-[8px] flex items-center justify-between w-[35%] h-[10%] max-h-[30px] pl-[5px] border-[1px] border-gray-300 rounded-[8px]">
          <span className="">Level {level}</span>
          <div className="w-[30px] h-[30px] rounded-[5px] flex items-center justify-center mr-[-2px]" style={{ backgroundColor: colors[level - 1] }}><span className="text-white font-bold">{level}</span></div>
        </div>

          {/*------ level of challenge ends here ----------*/}

        <h1 className="self-center text-[7vw] font-semibold mb-[5px] sm:text-[1.6vw] sm:mb-[1vw]">{title}</h1>
        <p className="self-center text-[4vw] text-center max-w-[95%] font-semibold sm:text-[0.7vw]">{description}</p>
      </div>
    </Link>
  )
}

export default Card