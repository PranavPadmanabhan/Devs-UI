import useLocalStorage from '@rehooks/local-storage'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import SocialMediaItems from '../../components/SocialMediaItems'
import { CurrentTab, User } from '../../constants/types'
import { AuthContext } from '../../contexts/AuthContext'
import { SearchUserData } from '../../services/Services'
import styles from '../../styles/desktop.module.css'

const Profile: NextPage = () => {

    const router = useRouter()
    const images = [
        '/Assets/images/image1.JPG',
        '/Assets/images/image2.JPG',
        '/Assets/images/image3.JPG'
    ]
    const config = {
        delta: 10,
        preventDefaultTouchmoveEvent: true,
        trackTouch: true,
        trackMouse: false,
        rotationAngle: 0,
    }
    const [currentTab, setCurrentTab] = useState<CurrentTab>("My Designs");
    const [currentUser, setcurrentUser] = useState<User>({} as User);
    const { user } = useContext(AuthContext)

    const fetchUserData = async () => {
        if (user) {
            const userData = await SearchUserData(user?.uid)
            setcurrentUser(userData)
        }
        else {
            setcurrentUser({})
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [user])


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
                <div {...handlers} className={`${styles.singleTab} w-[100%] h-[100%] flex flex-col items-center overflow-y-scroll snap-y snap-mandatory scrollbar-hide sm:grid sm:grid-cols-4 sm:place-items-center sm:gap-y-5 sm:snap-none `}>
                    <Card snap='snap-start' images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} />
                    <Card snap='snap-start' images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/2"} />
                    <Card snap='snap-start' images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/3"} />
                    <Card snap='snap-start' images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} />
                    <Card snap='snap-start' images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/2"} />
                    <Card snap='snap-start' images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/3"} />
                </div>
            )
        }
        else if (currentTab === 'Task In Progress') {
            return (
                <div {...handlers} className={`${styles.singleTab} w-[100%] h-[100%] flex flex-col items-center overflow-y-scroll snap-y snap-mandatory scrollbar-hide sm:grid sm:grid-cols-4 sm:place-items-center sm:gap-y-5 sm:snap-none pt-1`}>
                    <Card snap='snap-start' images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={3} destination={"challenges/1"} />
                </div>
            )
        }
        else {
            return (
                <div {...handlers} className={`${styles.singleTab} w-[100%] h-[100%] flex flex-col items-center overflow-y-scroll snap-y snap-mandatory scrollbar-hide sm:grid sm:grid-cols-4 sm:place-items-center sm:gap-y-5 sm:snap-none`}>
                    <Card snap='snap-start' images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={2} destination={"challenges/1"} />
                    <Card snap='snap-start' images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/2"} />
                    <Card snap='snap-start' images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={3} destination={"challenges/1"} />
                    <Card snap='snap-start' images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={3} destination={"challenges/1"} />

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
            <div className={`box-border overflow-y-scroll snap-y snap-mandatory scrollbar-hide scroll-pt-6 `}>
                <section className={`${styles.firstSection} w-[100%] h-[45vh]  snap-start flex flex-col items-center justify-center sm:flex-row sm:items-start`}>
                    <div className={` w-[100%] h-[80%] flex `}>
                        {/*---------------- first column with image and follow section starts here -----------------------*/}
                        <div className={`${styles.FirstColumn} w-[55%] h-[100%] flex flex-col items-center justify-start box-border mt-5 pt-7 sm:w-[40%] sm:pt-2 `}>
                            <div className={`${styles.LogoContainer}  w-[100%] h-[70%] flex flex-col items-center justify-center -mt-3 pt-2 mr-3 mb-0 sm:mb-5 `}>
                                <img src={user?.photoURL ?? "/Assets/icons/avatar.png"} alt="" className={`${styles.ProfileAvatar} w-[150px] min-h-[150px] sm:w-[180px] sm:min-h-[180px] object-cover rounded-[100%]`} />
                                {/*-------- update profile image button starts here ------*/}
                                <div onClick={() => router.push('/personalDetails')} className={`${styles.EditProfileBtn} w-[50%]  h-[15%] rounded-[10px] bg-[#323c71] min-h-[32px] flex items-center justify-center cursor-pointer mb-5 mt-2 sm:w-[30%] sm:h-[20%] sm:mb-[1vh]`}>
                                    <span className={`text-white text-[4vw] sm:text-[1.5vw] `}>Edit profile</span>
                                </div>
                                {/*-------- update profile image button starts here ------*/}

                            </div>
                            <div className={`${styles.FollowerSection} w-[100%] h-[20%] flex items-center justify-evenly mt-[10px] box-border box-border pl-9 mt-9 sm:mt-[5vh] `}>
                                <div className={`w-[25%] h-[100%] flex flex-col items-center justify-center  mr-7`}>
                                    <span className={`mb-2 text-[12px] font-light sm:text-[18px]`}>contributions</span>
                                    <span className={` text-[22px] font-light`}>{currentUser.contributions ?? 0}</span>
                                </div>
                                <div className={`w-[25%] h-[100%] flex flex-col items-center justify-center mr-5 `}>
                                    <span className={`mb-2 text-[12px] font-light sm:text-[18px]`}>Followers</span>
                                    <span className={`text-[22px] font-light`}>{currentUser.followers ?? 0}</span>
                                </div>
                                <div className={`w-[25%] h-[100%] flex flex-col items-center justify-center mr-5`}>
                                    <span className={`mb-2 text-[12px] font-light sm:text-[18px]`}>Following</span>
                                    <span className={`text-[22px] font-light`}>{currentUser.following ?? 0}</span>
                                </div>
                            </div>
                        </div>
                        {/*---------------- first column with image and follow section ends here -----------------------*/}

                        {/*-------------- details and social media section starts here ---------------------*/}
                        <div className={`${styles.secondColumn} w-[50%] h-[100%] flex flex-col items-start justify-start box-border pt-5 pl-4 sm:pt-0`}>
                            <h1 className={`text-[2.5vh] font-semibold whitespace-nowrap  mt-3 sm:text-[32px] `}>{currentUser.name ?? '########'}</h1>
                            <SocialMediaItems title={currentUser.bio == '' ? 'Not Available' : currentUser.bio} url='/Assets/lightmode/cv.png' />
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
                    <div onClick={() => router.push('/uploadDesign')} className={`w-[35%] h-[5%] min-h-[35px] rounded-[25px] bg-[#323c71] mr-0 flex items-center justify-center my-4 cursor-pointer sm:w-[25%] sm:mr-5`}>
                        <span className={`text-white text-[16px]`}>Upload design</span>
                    </div>
                    {/*----------------- design upload button ends here -------------*/}

                </section>
                {/*------------- details ends here -----------*/}

                <section className={`${styles.Content} w-[100%] h-screen  snap-start box-border pb-[10vh] sm:mt-[6vh] `}>
                    <div className={`${styles.TabsContainer} flex w-[100%] h-[5%] items-center justify-between box-border px-3 mb-[2vh] sm:px-[10%] sm:mt-[2vh] `}>
                        <span onClick={() => setCurrentTab("My Designs")} className={`${currentTab === "My Designs" ? `border-b-4 border-[#323c71] text-[#323c71] font-bold text-[18px] ${styles.TabActive}` : `border-none text-black font-light text-[14px] ${styles.Tab}`} duration-1000 py-2 cursor-pointer `}>My Designs</span>
                        <span onClick={() => setCurrentTab("Task In Progress")} className={`${currentTab === "Task In Progress" ? `border-b-4 border-[#323c71] text-[#323c71] font-bold text-[18px] ${styles.TabActive}` : `border-none text-black font-light text-[14px] ${styles.Tab}`} duration-1000 py-2 cursor-pointer`}>Task In Progress</span>
                        <span onClick={() => setCurrentTab("Task Completed")} className={`${currentTab === "Task Completed" ? `border-b-4 border-[#323c71] text-[#323c71] font-bold text-[18px] ${styles.TabActive}` : `border-none text-black font-light text-[14px] ${styles.Tab}`} duration-1000 py-2 cursor-pointer`}>Task Completed</span>
                    </div>
                    <RenderTabs />
                </section>
                <Footer position='relative' />

            </div>

        </div>
    )
}

export default Profile