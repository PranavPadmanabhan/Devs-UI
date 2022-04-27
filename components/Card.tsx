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

function Card({ images, title, description, level, destination, snap, uid }: Cardprops) {

  const colors = ["#58FF74", "#F4FF58", "#FFA658", "#FF5858"]
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null)
  const [mouseOver, setMouseOver] = useState(false)
  const [imageHover, setimageHover] = useState(false)
  const [intersecting, width] = UseIntersection({ ref: ref, options: { rootMargin: '100px', threshold: 1 } })


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
    <div onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)} ref={ref} onClick={navigate} className={`${styles.Card} flex flex-col w-[93vw] h-[65vh] max-w-[400px] border-[1px] border-gray-300 rounded-[15px] overflow-hidden box-border pb-[2vh] bg-white shadow-task  cursor-pointer ${snap} sm:w-[20vw] sm:min-w-[280px] sm:max-w-[400px] sm:first:ml-7`}>
      {/*------- challenge image ----- */}
      {width < 640 ? (<Carousel className=' ' showThumbs={false} autoPlay={autoPlaySetings()} infiniteLoop={((intersecting && width < 600) || (mouseOver)) ? true : false} showArrows={false}>
        {images.map((item, index) => (
          <div className="bg-gray-200">
            <img key={index} src={item} alt="" className={`${styles.CardImg} min-h-[40vh] max-h-[300px]`} style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} />
          </div>

        ))}
      </Carousel>) :
        (<div onMouseOver={() => setimageHover(true)} onMouseOut={() => setimageHover(false)} className='z-[10] rounded-[15px] '>
          <Carousel swipeable={true} interval={1000} centerMode={false} className='z-[10] rounded-[15px] max-h-[60%] w-[100%] min-h-[40vh]' showThumbs={false} autoPlay={autoPlaySetings()} infiniteLoop={mouseOver ?? true} showArrows={false}>
            {images.map((item, index) => (
              <img onMouseEnter={() => { setMouseOver(true) }} onMouseLeave={() => { setMouseOver(false) }} key={index} src={item} alt="" className={`${styles.CardImg} bg-gray-200 w-[100%] min-h-[40vh] h-[100%] sm:w-[100%] sm:h-[100%]`} style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} />

            ))}
          </Carousel>
        </div>)
      }
      {/*------- challenge image ----- */}

      {/*------ level of challenge starts here ----------*/}

      <div  className="self-start my-[8px] ml-3 flex items-center justify-between w-[35%] h-[10%] max-h-[30px] pl-[5px] border-[1px] border-gray-300 rounded-[8px]">
        <span className="text-[3vw] sm:text-[1vw]">Level {level}</span>
        <div className="w-[30px]  h-[30px] rounded-[5px] flex items-center justify-center mr-[-2px]" style={{ backgroundColor: colors[level - 1] }}><span className="text-white font-bold">{level}</span></div>
      </div>

      {/*------ level of challenge ends here ----------*/}
      
      <h1 className={`${styles.CardTitle} self-center ml-3 text-[3.5vh] font-semibold mb-[5px] sm:text-[1.6vw] sm:mb-[1vw]`}>{title}</h1>
      <h1 className={`${styles.CardDescription} ml-3 max-w-[50%] text-center text-justify`}>{description.slice(0, 30)}<br />{description.slice(30,58)}...</h1>
    </div>
  )
}

export default Card