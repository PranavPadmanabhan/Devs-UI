import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home: NextPage = () => {

  

  return (
    <div className='box-border overflow-y-scroll snap-y snap-mandatory scrollbar-hide'>
      <Head>
        <title>DevsUI 🌩️ </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/faviconhttps://www.getdroidtips.com/realme-narzo-10a-firmware-flash-file/#google_vignette.ico" />
      </Head>
      <div className="w-screen h-screen ">
        <Header />

      {/* ---------------  second page with discord logo starts here ---------------------- */}

        <div className="w-screen h-screen flex flex-col items-center justify-start pt-[11vh] snap-center">
          <div className="self-center w-[95%] h-[16%] min-h-[130px] rounded-[15px] mb-[20px] bg-discord bg-[#5965f1] bg-fit bg-no-repeat bg-center flex items-end justify-center sm:h-[30%] sm:max-h-[300px] sm:pb-[10px] sm:bg-[center_bottom_-2.5rem] sm:mb-[18vh]">
             <h1 className="hidden sm:block text-white font-semibold text-[2vw] tracking-wide">Connect  with  1000+  people  through  Discord</h1>
          </div>
          <div className="flex flex-col items-center justify-start sm:flex-row sm:w-[80%]">
            <div className="flex flex-col items-center justify-center">
              <img src="/Assets/lightmode/choose-icon.png" className="w-[20%] sm:w-[40%]" />
              <span className="text-[20px] max-w-[60%] text-center mt-[7px] mb-[7px] sm:text-[25px] sm:max-w-[80%]">Choose your topic or design from us</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src="/Assets/lightmode/design-dev.png" className="w-[22%] sm:w-[38%]" />
              <span className="text-[20px] max-w-[60%] text-center mt-[7px] mb-[7px] sm:text-[25px] sm:max-w-[60%]">Develop or design your item</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src="/Assets/lightmode/publish-icon.png" className="w-[19%] sm:w-[30%]" />
              <span className="text-[20px] max-w-[60%] text-center mt-[7px] mb-[7px] sm:text-[25px] sm:max-w-[80%]">Publish on our site and support others</span>
            </div>
          </div>
        </div>

      {/* ---------------  second page with discord logo ends here ---------------------- */}

      {/* ---------------  third page with top challenged starts here ---------------------- */}


        <div className="flex flex-col w-screen box-border h-screen items-center justify-start pt-[12vh] snap-center ">
          <h1 className="mb-[8px]  font-bold text-[5vw] sm:text-[2vw]">Top Challenges</h1>

          {/* ------ component which contains all challenge cards ----------*/}
          <Carousel /> 
          {/* ------ component which contains all challenge cards ----------*/}

        </div>

      {/* ---------------  third page with top challenged ends here ---------------------- */}


        <Footer />
      </div>
    </div>
  )
}

export default Home
