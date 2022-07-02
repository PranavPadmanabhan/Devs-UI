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
    <div ref={ref} onMouseOver={() => setMouseOver(true)} onMouseEnter={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)} className={`w-[90%]  h-[90%] min-w-[90%] mx-3 min-h-[60vh] rounded-[20px] shadow-task max-w-[90vw] max-h-[30vh] bg-white my-3 p-[3%] ${snap}`}>
      <Carousel interval={2000} dynamicHeight={true} showThumbs={false} autoPlay={autoPlaySetings()} infiniteLoop={true} className={`rounded-[15px] max-h-[30vh] shadow-task`}>
        {
          images.map((item,index) => (
            <img src={item} alt="" className="h-[50%] min-h-[30vh] max-h-[30vh] bg-grey-200 w-[100%] object-fill rounded-[15px] z-[-1]" />
          ))
        }
      </Carousel>
      <h1>{title}</h1>
    </div>
  )
}

export default Card