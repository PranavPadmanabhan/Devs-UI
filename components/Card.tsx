import React from 'react'
import { Cardprops } from '../constants/types'




function Card({url,title,description,animationEnabled}:Cardprops) {
  return (
    <div className={`w-[92%] h-[68vh] flex-none cursor-pointer snap-center rounded-[20px] mx-[15px] my-[10px] shadow-task last:mr-[30px] p-[5%] flex flex-col sm:h-[75vh] sm:max-h-[600px] sm:rounded-[25px] sm:w-[88%] sn:hover-z-1 sm:hover:${animationEnabled?'scale-110':'none'} duration-700`}>
        <img src={url} alt="" className="rounded-[15px] max-h-[60%] w-[100%] sm:max-h-[65%]"  style={{boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}}/>
        <h1 className="self-center text-[7vw] font-semibold my-[10px] sm:text-[1.6vw] sm:my-[1vw]">{title}</h1>
        <p className="self-center text-center max-w-[95%] font-semibold sm:text-[1vw]">{description}</p>
    </div>
  )
}

export default Card