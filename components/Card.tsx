import React from 'react'
import { Cardprops } from '../constants/types'




function Card({ url, title, description, animationEnabled, level }: Cardprops) {

  const colors = ["#58FF74","#F4FF58","#FFA658","#FF5858"]

  return (
    <div className={`w-[92%] h-[68vh] flex-none cursor-pointer snap-center rounded-[20px] mx-[15px] my-[10px] shadow-task last:mr-[30px] p-[5%] flex flex-col sm:h-[75vh] sm:max-h-[600px] sm:rounded-[25px] sm:w-[88%] sn:hover-z-1 sm:hover:${animationEnabled ? 'scale-110' : 'none'} duration-700`}>
      <img src={url} alt="" className="rounded-[15px] max-h-[60%] w-[100%] min-h-[40vh] sm:max-h-[65%]" style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} />
      <div className="self-start my-[10px] flex items-center justify-between w-[35%] h-[10%] max-h-[30px] pl-[5px] border-[1px] border-gray-300 rounded-[8px]">
        <span className="">Level {level}</span>
        <div className="w-[30px] h-[30px] rounded-[5px] flex items-center justify-center" style={{backgroundColor:colors[level - 1]}}><span className="text-white font-bold">{level}</span></div>
      </div>
      <h1 className="self-center text-[7vw] font-semibold mb-[10px] sm:text-[1.6vw] sm:mb-[1vw]">{title}</h1>
      <p className="self-center text-center max-w-[95%] font-semibold sm:text-[1vw]">{description}</p>
    </div>
  )
}

export default Card