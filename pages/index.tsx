import type { NextPage } from 'next'
import Head from 'next/head'
import Carousel from '../components/Carousel'
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
        <div className="w-screen h-screen flex flex-col items-center justify-start pt-[11vh] snap-center">
          <img src="/Assets/images/discord.png" alt="discord" className="self-center w-[85%] h-[16%] min-h-[130px] rounded-[15px] mb-[20px]" />
          <div className="flex flex-col items-center justify-start">
            <img src="/Assets/lightmode/choose-icon.png" className="w-[20%]" />
            <span className="text-[20px] max-w-[60%] text-center mt-[7px] mb-[7px]">Choose your topic or design from us</span>
            <img src="/Assets/lightmode/design-dev.png" className="w-[22%] " />
            <span className="text-[20px] max-w-[60%] text-center mt-[7px] mb-[7px]">Develop or design your item</span>
            <img src="/Assets/lightmode/publish-icon.png" className="w-[19%] " />
            <span className="text-[20px] max-w-[60%] text-center mt-[7px] mb-[7px]">Publish on our site and support others</span>
          </div>
        </div>
        <div className="flex flex-col w-screen box-border h-screen items-center justify-start pt-[12vh] snap-center ">
          <h1 className="mb-[8px]  font-bold text-[5vw]">Top Tasks</h1>
            <Carousel />
        </div>
        <footer className="w-screen h-[25vh] box-border bg-footer-mesh bg-no-repeat bg-cover bg-center snap-center flex items-start justify-between">
          <div className="w-[40%] max-w-[200px] h-[90%] flex flex-col items-center justify-start pt-[6vh]">
            <p className="">ofifiuahfuafihafu</p>
            <p className="">ofifiuahfuafihafu</p>
            <p className="">ofifiuahfuafihafu</p>

          </div>
          <div className="w-[30%] flex flex-col items-center h-[60%] justify-between mt-[15px] mr-[10px]">
            <span className="text-[5vw] font-semibold">Explore</span>
            <span className="">Home</span>
            <span className="">Designs</span>
            <span className="">Challenges</span>
          </div>
          <div className="w-[30%] flex flex-col items-center h-[60%] justify-between mt-[15px]">
            <span className="text-[5vw] font-semibold">Contact Us</span>
            <span className="">Email Us</span>
            <span className="">Discord</span>
            <div className="flex w-[100%] items-center justify-evenly px-1">
              <img src="/Assets/lightmode/instagram.png" alt="instagram" className="w-[25%]" />
              <img src="/Assets/lightmode/twitter.png" alt="twitter" className="w-[25%]" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
