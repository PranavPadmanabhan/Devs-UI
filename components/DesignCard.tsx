import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { designCards } from '../constants/types';
import styles from '../styles/desktop.module.css'
import { UseIntersection } from './Card';


function DesignCard({ images, destination, designName, profileURL, comments, lightenings,  shares  }:designCards) {

  const ref = useRef<HTMLDivElement>(null)
  const [mouseOver, setMouseOver] = useState(false)
  const [imageHover, setimageHover] = useState(false)
  const [intersecting, width] = UseIntersection({ ref: ref, options: { rootMargin: '100px', threshold: 1 } })
 const router = useRouter()
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


  return (
    <div onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)} ref={ref}  onClick={navigate} className={`${styles.DesignCard} cursor-pointer self-center w-[85%] h-[60vh] flex-none  snap-center rounded-[20px] shadow-task p-[5%] flex flex-col sm:h-[65vh] sm:max-h-[600px] sm:rounded-[25px] sm:w-[85%] my-[10px]  sm:hover:scale-110 duration-700`}>
      {width < 640 ? (<Carousel className='rounded-[15px] max-h-[50%] w-[100%] min-h-[60%]' showThumbs={false} autoPlay={autoPlaySetings()} infiniteLoop={((intersecting && width < 600) || (mouseOver)) ? true : false} showArrows={false}>
        {images.map((item, index) => (
          <img key={index} src={item} alt="" className={`${styles.CardImg} rounded-[15px]  w-[100%] h-[90%] sm:w-[100%] sm:h-[100%]`} style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} />

        ))}
      </Carousel>) :
        (<div onMouseOver={() => setimageHover(true)} onMouseOut={() => setimageHover(false)} className='z-[10] rounded-[15px] '>
          <Carousel swipeable={true} interval={1000} centerMode={false} className='z-[10] rounded-[15px] max-h-[60%] w-[100%] min-h-[40vh]' showThumbs={false} autoPlay={autoPlaySetings()} infiniteLoop={mouseOver ?? true} showArrows={false}>
            {images.map((item, index) => (
              <img onMouseEnter={() => { setMouseOver(true) }} onMouseLeave={() => { setMouseOver(false) }} key={index} src={item} alt="" className={`${styles.CardImg} rounded-[15px] w-[100%] h-[100%] sm:w-[100%] sm:h-[100%]`} style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} />

            ))}
          </Carousel>
        </div>)
      }        <h1 className="self-center text-[7vw] font-semibold my-[10px] sm:text-[1.6vw] sm:my-[1.5vw]">{designName}</h1>
      <div className="flex w-[100%] items-center justify-between my-[5px]">
        <div className="flex w-[40%] items-center justify-between">
          <img src="/Assets/lightmode/flash.png" alt="" className="cursor-pointer w-[20%] min-w-[25px]" />
          <img src="/Assets/lightmode/messenger.png" alt="" className="cursor-pointer w-[20%] min-w-[25px]" />
          <img src="/Assets/lightmode/share.png" alt="" className="cursor-pointer w-[20%] min-w-[25px]" />
        </div>
        <img src={profileURL} alt="" className=" w-[40px] h-[40px] cursor-pointer w-[10%] rounded-[100%] min-w-[40px]" />
      </div>
    </div>
  )
}

export default DesignCard