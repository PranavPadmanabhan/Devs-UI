import React, { useEffect } from 'react'
import NavBar from './NavBar'


function Header() {

  useEffect(() => {
   if(typeof window !== undefined){
     console.log(window.innerWidth);
     
   }
  }, [])
  

  return (
    <div className='w-screen h-screen box-border flex flex-col items-center justify-start p-[15px] pt-[10vh] snap-center bg-portrait'>
      <NavBar />
      <h1 className="self-end text-[7vw]">A problem well started <br /> is a problem half solved </h1>
      <img src="/Assets/images/illustration desktop.png" className="slef-end w-[75%] my-[4%]" />
      <h1 className="self-start text-[7vw]">Build Your Career With Us By Solving Tasks</h1>
      <img src="/Assets/icons/code-illustration.png" className="self-start w-[75%] h-[25%] my-[4%]" />
        <div className="self-center w-[80%] h-[15%] max-h-[50px] min-h-[40] flex items-center justify-center bg-black rounded-[25px] mt-[5%]">
          <span className="text-white text-[4.5vw] mr-[15px]">Authorize with Github</span>
          <img src="/Assets/darkmode/git.png" alt="github" className="w-[20px]" />
        </div>

    </div>
  )
}

export default Header