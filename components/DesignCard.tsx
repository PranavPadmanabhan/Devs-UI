import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { designCards } from '../constants/types';
import styles from '../styles/desktop.module.css'
import { UseIntersection } from './Card';
import { FaBolt, FaComment, FaShare } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard' 


function DesignCard({ images, destination, designName, profileURL, comments, lightenings,  shares, uid  }:designCards) {

  const ref = useRef<HTMLDivElement>(null)
  const [mouseOver, setMouseOver] = useState(false)
  const [imageHover, setimageHover] = useState(false)
  const [intersecting, width] = UseIntersection({ ref: ref, options: { rootMargin: '100px', threshold: 1 } })
  const router = useRouter();
  const [light, setlight] = useState(false)
  const navigate = () => {
    if(!imageHover) router.push(`/${destination}`);
    else return null;
  }

  const autoPlaySetings = () => {
    if (intersecting && width < 600) {
      return true
    }
    else if (mouseOver && width > 900) {
      return true
    }
    else return false
  }

  let url =  `${document.location.href}/${designName} `;
  const shareDetails = { url};


  

  return (
    <div ref={ref} onMouseOver={() => setMouseOver(true)} onMouseEnter={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)} className={`relative w-[85%]  h-[90%] mx-3 min-h-[55vh] rounded-[20px] shadow-task max-w-[90vw] max-h-[30vh] bg-white my-3 p-[4%] snap-center flex flex-col cursor-pointer`}>
      <Carousel showStatus={false} interval={2000} dynamicHeight={true} showThumbs={false} autoPlay={autoPlaySetings()} infiniteLoop={true} className={`rounded-[15px] max-h-[35vh] shadow-task`}>
        {
          images.map((item,index) => (
            <img src={item} alt="" className="h-[60%] min-h-[35vh] max-h-[35vh] bg-grey-200 w-[100%] object-fill rounded-[15px] z-[-1]" />
          ))
        }
      </Carousel>
      <h1 className='self-center text-[7vw] sm:text-[2vw] sm:mb-2 font-bold mt-2 mb-2 '>{designName}</h1>
       <div className="absolute bottom-[6%] flex items-center justify-between w-[100%]">
        <div className="flex w-[40%] items-center justify-evenly">
          <img onClick={() => setlight(!light)} src={light?"/Assets/lightmode/flash(1).png":"/Assets/lightmode/flash.png"} alt="" className="w-[30%] max-w-[40px] sm:max-w-[30px]" />
          <CopyToClipboard 
            text={`https://devs-ui.vercel.app/challenges/${designName}`}
          >
            <img onClick={() => toast.success('copied to clipboard') } src="/Assets/lightmode/share.png" alt="" className="w-[30%] max-w-[40px] sm:max-w-[30px]" />
          </CopyToClipboard>
        </div>
        <img onClick={() => router.push(`/profile/${uid}`)} src={profileURL} alt="" className="max-w-[60px] rounded-[100%] mr-[10%] border-[1px] border-gray-500 sm:max-w-[40px]" />
       </div>
       <Toaster />
    </div>
  )
}

export default DesignCard