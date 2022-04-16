import React, { useContext, useEffect } from 'react'
import Theme from '../constants/ColorMode';
import { ThemeContext } from '../contexts/ThemeContext';
import NavBar from './NavBar'
import { backgroundImage, PreferredTheme } from '../constants/types'
import { useRouter } from 'next/router';
import styles from '../styles/desktop.module.css'



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
    <div className={`${styles.Header} relative w-screen h-screen box-border flex flex-col items-center justify-start p-[15px] pt-[10vh] snap-center bg-portrait bg-no-repeat bg-cover bg-center sm:flex-row sm:bg-landscape sm:bg-cover sm:items-center sm:justify-evenly`}>

      {/*------------- first quote-text combo starts here ----------------*/}

      <div className={`${styles.Header_First_col} flex flex-col max-h-[35%] w-[100%] mb-[5%] sm:max-h-[80%] sm:w-[40%]  sm:mb-0`}>
        <h1 className={`self-end text-[6.5vw] sm:text-[3vw]`}>A problem well started <br /> is a problem half solved </h1>
        <img src="/Assets/images/illustration desktop.png" className={`self-end max-h-[70%] min-w-[70%] my-[2%]  sm:min-w-[50%] sm:max-h-[50%]`} />
      </div>

      {/*------------- first quote-text combo ends here ----------------*/}

      {/*------------- second quote-text with button container starts here ----------------*/}

      <div className={`${styles.Header_Second_col}  flex flex-col max-h-[50%] w-[100%] sm:flex-col-reverse sm:max-h-[80%] sm:w-[40%]  sm:pt-0`}>
        <h1 className={`self-start text-[6.5vw] my-[2%] sm:text-[3vw] sm:max-w-[95%] sm:order-2 msm:mt-[5%]`}>Build Your Career With Us By Solving Tasks</h1>
        <img src="/Assets/icons/code-illustration.png" className={`self-start max-h-[50%] min-w-[85%] mb-[2%] sm:order-3 sm:max-h-[80%] `} />
        <div onClick={navigate} className={`${styles.AuthorizeBtn} self-center   w-[80%] min-h-[45px] max-h-[55px] rounded-[25px] bg-black flex items-center justify-center mt-[5%] mb-[2%] sm:order-1 sm:self-start `}>
          <span className={`text-white `}>Authorize with Github</span>
          <img src="/Assets/darkmode/git.png" alt="github" className={`${styles.AuthorizeBtnImg} w-[20px]`} />
        </div>
      </div>
      {/*------------- second quote-text  with button container ends here ----------------*/}


    </div>
  )
}

export default Header