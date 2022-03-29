import React from 'react'
import Card from './Card'

function Carousel() {
  return (
    <div className="flex w-[90vw] h-[65vh] bg-red-300 items-center justify-start box-border overflow-x-scroll snap-x snap-mandatory px-[2%] scroll-px-4 scrollbar-hide">
        <Card />
      <Card />
      <Card />

    </div>
  )
}

export default Carousel