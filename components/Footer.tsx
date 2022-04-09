import React, { useEffect, useState } from 'react'
import styles from '../styles/desktop.module.css'

function Footer() {

  const [width, setwidth] = useState(0);
  useEffect(() => {
    if(typeof(window) !== undefined){
      setwidth(window.innerWidth)
    }
  }, [])
  


  return (
    <footer className={`relative ${styles.footer} w-screen z-[-1] box-border bg-footer-mesh bg-no-repeat bg-cover bg-center snap-center flex flex-col items-center justify-center sm:relative sm:flex-row sm:items-start sm:justify-end sm:pt-[10vh]`} >
          <div className="w-screen max-w-[200px] h-[25%] flex flex-col items-center justify-start my-[15px] sm:mt-[5vh]">
            <p className="text-left">ofifiuahfuafihafu</p>
            <p className="text-left">ofifiuajkbafbjkbafkhfuafihafu</p>
            <p className="text-left">ofifiuajajfffjkbkfhfuafihafu</p>
            <div className="flex w-[70%] items-center justify-evenly mt-[20px] sm:hidden ">
              <img src="/Assets/lightmode/instagram.png" alt="instagram" className="w-[15%] min-w-[30px]" />
              <img src="/Assets/lightmode/twitter.png" alt="twitter" className="w-[15%] min-w-[30px]" />
            </div>
          </div>
          <div className="w-screen flex flex-col items-center h-[25%] justify-center sm:h-[80%] sm:justify-start sm:w-[20%] sm:ml-[40vw]">
            <span className="text-[5vw] font-semibold sm:text-[1.5vw] sm:my-[10px]">Explore</span>
            <div className="w-[60%] mt-[5px] flex items-center justify-between sm:flex-col">
              <span className="sm:my-[10px]">Home</span>
              <span className="sm:my-[10px]">Designs</span>
              <span className="sm:my-[10px]">Challenges</span>
            </div>
          </div>
          <div className="w-screen flex flex-col items-center h-[25%] justify-center sm:h-[80%] sm:justify-start sm:w-[20%]">
            <span className="text-[5vw] font-semibold sm:text-[1.5vw] sm:my-[10px]">Contact Us</span>
            <div className="flex w-[40%] items-center justify-between mt-[5px]  sm:flex-col">
              <span className="sm:my-[10px]">Email Us</span>
              <span className="sm:my-[10px]">Discord</span>
              <div className="hidden w-[90%] items-center justify-evenly mt-[20px] sm:flex sm:justify-evenly sm:items-center">
              <img src="/Assets/lightmode/instagram.png" alt="instagram" className="w-[25%] min-w-[40px]" />
              <img src="/Assets/lightmode/twitter.png" alt="twitter" className="w-[25%] min-w-[40px]" />
            </div>
            </div>

          </div>
        </footer>
  )
}

export default Footer