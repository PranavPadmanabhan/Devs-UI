import { type } from 'os'
import React, { useEffect } from 'react'
import NavBar from './NavBar'


function Header() {
  return (
    <div className='w-screen h-screen box-border flex flex-col items-center justify-start px-[15px] snap-center bg-portrait'>
      <NavBar />
      <h1 className="self-end text-[7vw]  mt-[12vh] mb-[3vh] xs:mb-[5vh] lm:mb-[2vh] ">A problem well started <br /> is a problem half solved </h1>
      <img src="/Assets/images/illustration desktop.png" className="self-end font-bold w-[80%] h-[20%] xs:max-w-[75%] xs:h-[23%] lm:w-[80%] lm:h-[50vw] lm:max-w-[350px] lm:max-h-[300px]" />
      <h1 className="self-start text-[7vw] max-w-[95%] mt-[4vh] mb-[4vh] ">Build Your Career With Us By Solving Tasks</h1>
      <img src="/Assets/icons/code-illustration.png" className="w-[70%] h-[20vh] self-start" />
        <div className="self-center w-[80%] h-[10vh] max-h-[40px] rounded-[50px] flex items-center justify-center bg-black my-[7vh] xs:h-[10vh] xs:max-h-[50px] xs:min-h-[45px] xs:my-[4vh] lm:min-h-[45px] lm:max-h-[55px]">
          <span className="text-white text-[14px] mr-[10px] xs:text-[18px] lm:text-[22px]">Authorize with Github</span>
          <img src="/Assets/darkmode/git.png" alt="github" className="w-[20px]" />
        </div>

    </div>
  )
}

export default Header