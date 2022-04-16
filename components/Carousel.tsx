import React from 'react'
import Card from './Card'
import styles from '../styles/desktop.module.css'

function Carousel() {

    const images = [
        '/Assets/images/image1.JPG',
        '/Assets/images/image2.JPG',
        '/Assets/images/image3.JPG'
    ]

    return (
        <div className={`${styles.Carousel} flex w-[100vw] h-[72vh] items-center justify-start box-border overflow-x-scroll snap-x snap-mandatory px-[2%] scroll-px-4 scrollbar-hide sm:overflow-x-hidden sm:grid sm:grid-cols-4 sm:h-[80vh] sm:place-content-start sm:px-[5%] sm:gap-y-[50px] sm:pt-[3vh] sm:pb-[10vh]`}>
            <Card images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap={'snap-center'}/>
            <Card images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/2"} snap={'snap-center'}/>
            <Card images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/3"} snap={'snap-center'}/>
            <Card images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap={'snap-center'}/>
            <Card images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/2"} snap={'snap-center'}/>
            <Card images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/3"} snap={'snap-center'}/>
        </div>
    )
}

export default Carousel