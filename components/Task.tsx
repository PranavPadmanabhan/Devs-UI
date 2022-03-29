import { type } from 'os'
import React from 'react'

type props = {
    url:string,
    title:string,
    description:string
}

function Task({url,description,title}:props) {
    return (
        <section className='w-[100%] h-[90%]  snap-start flex-none mr-[20px] box-border shadow-task rounded-[25px] p-[20px] last:scroll-mr-[10px]'>
            <img src={url} alt="" className='rounded-[10px]'/>
            <h1 className="my-[10px] text-center text-[6vw] font-semibold">{title}</h1>
            <p className="text-center font-semibold text-[4.2vw]">{description}</p>
        </section>
    )
}

export default Task