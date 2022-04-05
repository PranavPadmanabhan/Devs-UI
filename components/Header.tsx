import React, { useContext, useEffect } from 'react'
import Theme from '../constants/ColorMode';
import { ThemeContext } from '../contexts/ThemeContext';
import NavBar from './NavBar'
import classNames from 'classnames';
import { backgroundImage, PreferredTheme } from '../constants/types'
import { useRouter } from 'next/router';



function Header() {

  const { theme, toggleTheme, preferredTheme } = useContext(ThemeContext);
  const router = useRouter();

  useEffect(() => {
    console.log(theme);

  }, [])

  const navigate = () => {
    router.push('/role')
  }

  return (
    <div className={`relative w-screen h-screen box-border flex flex-col items-center justify-start p-[15px] pt-[10vh] snap-center bg-portrait bg-no-repeat bg-cover bg-center sm:flex-row sm:bg-landscape sm:bg-cover`}>
      <NavBar />

      {/*------------- first quote-text combo starts here ----------------*/}

      <div className="flex flex-col items-end sm:w-[60%] sm:h-[80%] sm:items-center sm:justify-center sm:pr-[3%]">
        <h1 className="self-end text-[7vw] sm:text-[3vw] sm:self-center">A problem well started <br /> is a problem half solved </h1>
        <img src="/Assets/images/illustration desktop.png" className="slef-end w-[75%] my-[4%] sm:w-[60%]" />
      </div>

      {/*------------- first quote-text combo ends here ----------------*/}

      {/*------------- second quote-text with button container starts here ----------------*/}

      <div className="flex flex-col items-start h-[50%]  sm:order-2 sm:w-[40%] sm:h-[80%] sm:flex-col-reverse sm:justify-end sm:pl-[2%]">
        <h1 className="self-start text-[7vw] sm:text-[3vw] sm:order-1 sm:self-start sm:my-[10px] sm:text-left sm:max-w-[80%]">Build Your Career With Us By Solving Tasks</h1>
        <img src="/Assets/icons/code-illustration.png" className="self-start w-[75%] h-[25%] min-h-[150px] my-[4%] sm:order-3 sm:self-start" />
        <div onClick={navigate} className="self-center cursor-pointer w-[80%] h-[15%] max-h-[50px] min-h-[40] flex items-center justify-center bg-black rounded-[25px] mt-[5%] sm:self-start sm:w-[70%]">
          <span className="text-white text-[4.5vw] sm:text-[1.7vw] mr-[15px]">Authorize with Github</span>
          <img src="/Assets/darkmode/git.png" alt="github" className="w-[20px]" />
        </div>
      </div>
      {/*------------- second quote-text  with button container ends here ----------------*/}


    </div>
  )
}

export default Header