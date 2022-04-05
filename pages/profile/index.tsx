import { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import SocialMediaItems from '../../components/SocialMediaItems'
import { CurrentTab } from '../../constants/types'

const Profile: NextPage = () => {

    const config = {
        delta: 10,
        preventDefaultTouchmoveEvent: false,
        trackTouch: true,
        trackMouse: false,
        rotationAngle: 0,
    }
    const [currentTab, setCurrentTab] = useState<CurrentTab>("My Designs");
    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            if (currentTab === "My Designs") {
                setCurrentTab("Task In Progress")
            }
            else if (currentTab === "Task In Progress") {
                setCurrentTab("Task Completed")
            }
            else {
                setCurrentTab("Task Completed")
            }
        },
        onSwipedRight: (eventData) => {
            if (currentTab === "Task Completed") {
                setCurrentTab("Task In Progress")
            }
            else if (currentTab === "Task In Progress") {
                setCurrentTab("My Designs")
            }
            else {
                setCurrentTab("My Designs")
            }
        },
        ...config,
    });

    const RenderTabs = () => {
        if (currentTab === 'My Designs') {
            return (
                <div {...handlers} className="w-[100%] h-[100%] flex flex-col overflow-y-scroll snap-y snap-mandatory scrollbar-hide sm:grid sm:grid-cols-4 sm:place-items-center sm:gap-y-5 sm:snap-none">
                    <Card url='/Assets/images/image1.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} />
                    <Card url='/Assets/images/image2.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/2"} />
                    <Card url='/Assets/images/image3.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/3"} />
                    <Card url='/Assets/images/image1.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} />
                    <Card url='/Assets/images/image2.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/2"} />
                    <Card url='/Assets/images/image3.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/3"} />
                </div>
            )
        }
        else if (currentTab === 'Task In Progress') {
            return (
                <div {...handlers} className="w-[100%] h-[100%] flex flex-col overflow-y-scroll snap-y snap-mandatory scrollbar-hide sm:grid sm:grid-cols-4 sm:place-items-center sm:gap-y-5 sm:snap-none">
                    <Card url='/Assets/images/image1.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={3} destination={"challenges/1"} />
                </div>
            )
        }
        else {
            return (
                <div {...handlers} className="w-[100%] h-[100%] flex flex-col overflow-y-scroll snap-y snap-mandatory scrollbar-hide sm:grid sm:grid-cols-4 sm:place-items-center sm:gap-y-5 sm:snap-none">
                    <Card url='/Assets/images/image1.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={2} destination={"challenges/1"} />
                    <Card url='/Assets/images/image2.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/2"} />
                    <Card url='/Assets/images/image1.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={3} destination={"challenges/1"} />
                </div>
            )
        }
    }

    return (
        <div className='w-screen h-screen flex flex-col box-border pt-[10vh] sm:pt-[12vh]'>
            <Head>
                <title>DevsUI 🌩️ </title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/faviconhttps://www.getdroidtips.com/realme-narzo-10a-firmware-flash-file/#google_vignette.ico" />
            </Head>
            <NavBar />

            {/*------------- details starts here -----------*/}
            <div className=" box-border overflow-y-scroll snap-y snap-mandatory scrollbar-hide scroll-pt-6 ">
                <section className="w-[100%] h-[45vh]  snap-start flex flex-col items-center justify-center sm:flex-row sm:items-start">
                    <div className="w-[100%] h-[80%] flex ">
                        {/*---------------- first column with image and follow section starts here -----------------------*/}
                        <div className="w-[55%] h-[100%] flex flex-col items-center justify-start box-border pt-7 sm:w-[40%] ">
                            <div className="w-[100%] h-[50%] flex flex-col items-center justify-center mr-3 mb-0 sm:mb-5 ">
                                <img src="/Assets/icons/avatar.png" alt="" className="w-[60%] sm:w-[45%]" />
                                {/*-------- update profile image button starts here ------*/}
                                <div className="w-[50%] h-[15%] rounded-[10px] bg-[#323c71] flex items-center justify-center mb-5 sm:w-[30%] sm:h-[20%] sm:mb-[1vh]">
                                    <span className="text-white">Edit image</span>
                                </div>
                                {/*-------- update profile image button starts here ------*/}

                            </div>
                            <div className="w-[100%] h-[20%] flex items-center justify-evenly box-border box-border pl-9 mt-5 sm:mt-0">
                                <div className="w-[25%] h-[100%] flex flex-col items-center justify-center  mr-7">
                                    <span className="mb-2 text-[12px] font-light sm:text-[18px]">contributions</span>
                                    <span className=" text-[22px] font-light">20</span>
                                </div>
                                <div className="w-[25%] h-[100%] flex flex-col items-center justify-center mr-5 ">
                                    <span className="mb-2 text-[12px] font-light sm:text-[18px]">Followers</span>
                                    <span className=" text-[22px] font-light">5K</span>
                                </div>
                                <div className="w-[25%] h-[100%] flex flex-col items-center justify-center mr-5">
                                    <span className="mb-2 text-[12px] font-light sm:text-[18px]">Following</span>
                                    <span className=" text-[22px] font-light">117</span>
                                </div>
                            </div>
                        </div>
                        {/*---------------- first column with image and follow section ends here -----------------------*/}

                        {/*-------------- details and social media section starts here ---------------------*/}
                        <div className="w-[50%] h-[100%] flex flex-col items-start justify-start box-border pt-5 pl-4 ">
                            <h1 className="text-[24px] font-semibold whitespace-nowrap  mt-3 sm:text-[32px] ">Athul Vishnu</h1>
                            <SocialMediaItems title='Bio' url='/Assets/lightmode/cv.png' />
                            <SocialMediaItems title='Website' url='/Assets/lightmode/link.png' />
                            <SocialMediaItems title='Github' url='/Assets/lightmode/github.png' />
                            <SocialMediaItems title='Twitter' url='/Assets/lightmode/twitter.png' />
                            <SocialMediaItems title='Behance' url='/Assets/lightmode/behance.png' />
                            <SocialMediaItems title='Facebook' url='/Assets/lightmode/facebook.png' />
                            <SocialMediaItems title='Dribble' url='/Assets/lightmode/dribble.png' />
                            <SocialMediaItems title='LinkedIn' url='/Assets/lightmode/linkedin.png' />
                            <SocialMediaItems title='Instagram' url='/Assets/lightmode/instagram.png' />
                        </div>
                        {/*-------------- details and social media section ends here ---------------------*/}

                    </div>
                    {/*----------------- design upload button starts here-------------*/}
                    <div className="w-[35%] h-[5%] min-h-[30px] rounded-[25px] bg-[#323c71] mr-0 flex items-center justify-center my-4 sm:w-[25%] sm:mr-5">
                        <span className='text-white text-[16px]'>Upload design</span>
                    </div>
                    {/*----------------- design upload button ends here -------------*/}

                </section>
                {/*------------- details ends here -----------*/}

                <section className="w-[100%] h-screen snap-start box-border pb-[10vh]">
                    <div className="flex w-[100%] h-[5%] items-center justify-between box-border px-3 mb-[2vh] sm:px-[10%] sm:mt-[2vh]">
                        <span onClick={() => setCurrentTab("My Designs")} className={`${currentTab === "My Designs" ? 'border-b-4 border-[#323c71] text-[#323c71] font-bold text-[18px]' : 'border-none text-black font-light text-[14px]'} duration-1000 py-2 cursor-pointer `}>My Designs</span>
                        <span onClick={() => setCurrentTab("Task In Progress")} className={`${currentTab === "Task In Progress" ? 'border-b-4 border-[#323c71] text-[#323c71] font-bold text-[18px]' : 'border-none text-black font-light text-[14px]'} duration-1000 py-2 cursor-pointer`}>Task In Progress</span>
                        <span onClick={() => setCurrentTab("Task Completed")} className={`${currentTab === "Task Completed" ? 'border-b-4 border-[#323c71] text-[#323c71] font-bold text-[18px]' : 'border-none text-black font-light text-[14px]'} duration-1000 py-2 cursor-pointer`}>Task Completed</span>
                    </div>
                    <RenderTabs />
                </section>
                <Footer />
            </div>

        </div>
    )
}

export default Profile