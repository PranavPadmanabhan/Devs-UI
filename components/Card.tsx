import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Cardprops } from '../constants/types'
import styles from '../styles/desktop.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FaEllipsisV } from 'react-icons/fa'
import { deleteDesign } from '../services/Services';
import { AuthContext } from '../contexts/AuthContext';

type UseIntersectionProps = {
  options: {
    rootMargin: string,
    threshold: number
  },
  ref: any
}

export const UseIntersection = ({ options, ref }: UseIntersectionProps) => {
  const [intersecting, setintersecting] = useState<boolean>(false)
  const [width, setwidth] = useState(0)

  useEffect(() => {
    if (typeof (window) !== undefined) {
      setwidth(window.innerWidth)
    }
    const observer = new IntersectionObserver(([entry]) => {
      setintersecting(entry.isIntersecting);
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return [intersecting, width]
}

function Card({ images, title, description, level, destination, snap, uid, userData, fetchUserData }: Cardprops) {

  const colors = ["#58FF74", "#F4FF58", "#FFA658", "#FF5858"]
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null)
  const [mouseOver, setMouseOver] = useState(false)
  const [imageHover, setimageHover] = useState(false)
  const [intersecting, width] = UseIntersection({ ref: ref, options: { rootMargin: '100px', threshold: 1 } })
  const [settings, setsettings] = useState(false)
  const { user } = useContext(AuthContext);

  

  const navigate = () => {
    if (!imageHover) router.push({ pathname: `/${destination}`, query: {challengeName:title ,id: uid } });
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
    <div ref={ref} onMouseOver={() => setMouseOver(true)} onMouseEnter={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)} className={`relative w-[85%]  h-[90%] min-w-[85%] mx-3 min-h-[60vh] rounded-[20px] shadow-task max-w-[90vw] max-h-[30vh] bg-white my-3 p-[4%] ${snap} flex flex-col cursor-pointer`}>
      <Carousel showStatus={false} interval={2000} dynamicHeight={true} showThumbs={false} autoPlay={autoPlaySetings()} infiniteLoop={true} className={`rounded-[15px] max-h-[35vh] shadow-task`}>
        {
          images.map((item,index) => (
            <img src={item} alt="" className="h-[60%] min-h-[35vh] max-h-[35vh] bg-grey-200 w-[100%] object-fill rounded-[15px] z-[-1]" />
          ))
        }
      </Carousel>
      <div className="w-[40%] h-[7%] min-h-[35px] rounded-[10px] border-2 border-black box-border flex items-center justify-between sm:mt-2 mt-3 mb-1">
        <span className="ml-1">Level {level}</span>
        <div className="w-[30%] h-[85%] bg-orange-500 text-white font-bold rounded-[5px] flex items-center justify-center  mr-[2px]">{level}</div>
      </div>
      <h1 className='self-center text-[7vw] sm:text-[2vw] sm:mb-2 font-bold mb-2 '>{title}</h1>
      <p className="self-center max-w-[90%] ">{description}</p>
        { uid == user.uid && (<FaEllipsisV size={22} onClick={() => setsettings(!settings)} className='self-end group absolute right-4 bottom-9'/>)}
        <div className={`${settings?'flex z-[1000] flex-col':'hidden'} absolute bg-white  self-end w-[50%] h-auto shadow-task bottom-[13%] sm:bottom-[16%]  items-center justify-center`}>
          <div onClick={() => deleteDesign({designName:title,user,userData,images, fetchUserData})} className="h-[40px] w-[100%] self-center flex items-center justify-center">Delete</div>
        </div>
    </div>
  )
}

export default Card