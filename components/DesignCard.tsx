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
   <div className="">
     
   </div>
  )
}

export default DesignCard