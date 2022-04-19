import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { Cardprops } from '../constants/types'
import styles from '../styles/desktop.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

type UseIntersectionProps = {
  options: {
    rootMargin: string,
    threshold: number
  },
  ref: any
}

const UseIntersection = ({ options, ref }: UseIntersectionProps) => {
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

function Card({ images, title, description, level, destination, snap }: Cardprops) {

  const colors = ["#58FF74", "#F4FF58", "#FFA658", "#FF5858"]
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null)
  const [mouseOver, setMouseOver] = useState(false)
  const [imageHover, setimageHover] = useState(false)
  const [intersecting, width] = UseIntersection({ ref: ref, options: { rootMargin: '100px', threshold: 1 } })


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
    <div onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)} ref={ref}  onClick={navigate} className={`${styles.Card} group w-[87%] min-w-[150px] max-w-[300px] z-[1] sm:z-[1]  h-[95%] max-h-[500px] flex-none cursor-pointer ${snap} rounded-[20px] mx-[15px] my-[10px] shadow-task last:mr-[30px] p-[5%] sm:p-5 flex flex-col sm:h-[70vh] sm:max-h-[40vw] sm:rounded-[25px] sm:w-[88%] sm:hover:z-1  sm:hover:scale-110 duration-700`}>
      {/*------- challenge image ----- */}
      {width < 640 ? (<Carousel  className='rounded-[15px] max-h-[50%] w-[100%] min-h-[60%]' showThumbs={false} autoPlay={autoPlaySetings()} infiniteLoop={((intersecting && width < 600) || (mouseOver)) ? true : false} showArrows={false}>
        {images.map((item, index) => (
          <img key={index} src={item} alt="" className={`${styles.CardImg} rounded-[15px]  w-[100%] h-[90%] sm:w-[100%] sm:h-[100%]`} style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} />

        ))}
      </Carousel>) :
        (<div onMouseOver={() =>  setimageHover(true)} onMouseOut={() => setimageHover(false)} className='z-[10] rounded-[15px] '>
          <Carousel swipeable={true} interval={1000} centerMode={false} className='z-[10] rounded-[15px] max-h-[60%] w-[100%] min-h-[40vh]' showThumbs={false} autoPlay={autoPlaySetings()} infiniteLoop={mouseOver??true} showArrows={false}>
          {images.map((item, index) => (
            <img onMouseEnter={() =>{ setMouseOver(true)}} onMouseLeave={() => {setMouseOver(false)}}  key={index} src={item} alt="" className={`${styles.CardImg} rounded-[15px] w-[100%] h-[100%] sm:w-[100%] sm:h-[100%]`} style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} />

          ))}
        </Carousel>
        </div>)
      }
      {/*------- challenge image ----- */}

      {/*------ level of challenge starts here ----------*/}

      <div  className="self-start my-[8px] flex items-center justify-between w-[35%] h-[10%] max-h-[30px] pl-[5px] border-[1px] border-gray-300 rounded-[8px]">
        <span className="text-[3vw] sm:text-[1vw]">Level {level}</span>
        <div className="w-[30px] h-[30px] rounded-[5px] flex items-center justify-center mr-[-2px]" style={{ backgroundColor: colors[level - 1] }}><span className="text-white font-bold">{level}</span></div>
      </div>

      {/*------ level of challenge ends here ----------*/}

      <h1 className={`${styles.CardTitle} self-center text-[3.5vh] font-semibold mb-[5px] sm:text-[1.6vw] sm:mb-[1vw]`}>{title}</h1>
      <p className={`${styles.CardDescription} self-center text-[4vw] text-center max-w-[95%] font-semibold sm:text-[0.7vw]`}>{description.slice(0, 58)}...</p>
    </div>
  )
}

export default Card