import React from 'react'

type props = {
    url:string,
    title:string,
    description:string
}

function Card({url,title,description}:props) {
  return (
    <div className='w-[92%] h-[95%] flex-none  snap-center rounded-[20px] mx-[15px] shadow-task last:mr-[30px] p-[5%] flex flex-col'>
        <img src={url} alt="" className="rounded-[15px] max-h-[60%] w-[100%]" />
        <h1 className="self-center text-[7vw] font-semibold my-[10px]">{title}</h1>
        <p className="self-center text-center max-w-[95%] font-semibold">{description}</p>
    </div>
  )
}

export default Card