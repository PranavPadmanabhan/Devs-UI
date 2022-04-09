import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { FaEdit, FaPen } from 'react-icons/fa'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import styles from '../../styles/desktop.module.css'

const PersonalDetails: NextPage = () => {

    // useEffect(() => {
    //   if(typeof(window) !== undefined){
    //       alert(`${window.innerHeight}  ${window.innerWidth}`)
    //   }
    // }, [])
    

    return (
        <div className={`w-screen h-screen flex flex-col items-start justify-start box-border pt-[12vh]`}>
            <Head>
                <title>DevsUI 🌩️ </title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/faviconhttps://www.getdroidtips.com/realme-narzo-10a-firmware-flash-file/#google_vignette.ico" />
            </Head>
            <NavBar />
            <div className={`relative w-screen h-screen flex flex-col items-center justify-start overflow-y-scroll scrollbar-hide `}>
                <h1 className={`${styles.heading} self-start ml-5 my-3 text-[6vw] esm:text-[5.5vw] asm:text-[6vw] msm:text-[5vw] sm:text-[3vw] md:text-[3.2vw] lg:text-[3.4vw] xl:text-[2.6vw] 2xl:text-[1.5vw]  sm:ml-[55px] md:ml-[59px] lg:ml-[75px] xl:ml-[85px] 2xl:ml-[210px]`}>Personal Details</h1>
                <div className={` w-[100%]  flex flex-col sm:items-start sm:flex-row-reverse  sm:justify-center sm:items-start sm:w-[90%] 2xl:min-h-[65vh] ds:min-h-[70vh]`}>
                    <div className={`${styles.ImageContainer} flex flex-col items-center justify-center mb-2 sm:mr-10`}>
                        <img src="/Assets/icons/avatar.png" alt="" className={`w-[5vh] h-[5vh] min-w-[150px] min-h-[150px] sm:h-[10vh] w-[10vh] min-w-[300px] min-h-[300px] rounded-[100%] 2xl:w-[50vh] 2xl:h-[40vh] 2xl:min-h-[650px] 2xl:min-w-[650px] 2xl:z-[-1]`} />
                        <button className={`${styles.UpdateImageBtn} min-w-[100px] min-h-[30px] max-h-[40px] focus:outline-none bg-[#323c71] rounded-[10px] sm:min-w-[120px] sm:min-h-[35px] flex items-center justify-center text-white text-[70%] sm:text-[80%]  2xl:min-w-[500px] 2xl:min-h-[95px] 2xl:text-[1vw] `}>Edit Image</button>
                    </div>
                    <div className={` w-[100%] flex flex-col sm:box-border sm:pl-5`}>
                        <input type="text" placeholder='Name' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                        <input type="text" placeholder='Bio' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] min-h-[100px] 2xl:w-[40%] 2xl:min-h-[180px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input_bio} `} />
                        <input type="text" placeholder='Website' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                        <input type="text" placeholder='Github' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                        <input type="text" placeholder='Twitter' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                        <input type="text" placeholder='Facebook' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                        <input type="text" placeholder='Linkedin' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                        <input type="text" placeholder='Dribble' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                        <button className={`${styles.UpdateProfileBtn} self-start ml-10 mt-5 mb-8 min-w-[100px] min-h-[35px] focus:outline-none rounded-[10px] bg-[#323c71] flex items-center justify-center text-[75%] text-white 2xl:min-w-[300px] 2xl:min-h-[75px] 2xl:text-[1vw]`}>Update Profile</button>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default PersonalDetails