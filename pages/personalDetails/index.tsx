import { NextPage } from 'next'
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import { User } from '../../constants/types'
import { AuthContext } from '../../contexts/AuthContext'
import { SearchUserData, uploadData, uploadImage } from '../../services/Services'
import styles from '../../styles/desktop.module.css'
import { getStorage, ref } from "firebase/storage";


const PersonalDetails: NextPage = () => {

    const [currentUser, setcurrentUser] = useState<User>({})
    const { user } = useContext(AuthContext);
    const [loading, setloading] = useState<boolean>(false);
    const [uploading, setuploading] = useState<boolean>(false);
    const [Avatar, setAvatar] = useState<string | undefined>();
    const storage = getStorage();

    const handleImageAsFile = (e: any) => {
        const image = e.target.files[0];
        if (!image) return;
        const storageRef = ref(storage, `profileImages/${user?.uid}/${image.name}.png`);
        uploadImage({ file: image, storageRef, setloading, fetchUserData, setuploading, currentUser, user });
    }

    const fetchUserData = async () => {
        setloading(true)
        if (user) {
            const userData = await SearchUserData(user?.uid);
            setcurrentUser(userData);
            setloading(false);
            setAvatar(userData.photoURL)
        }
        else {
            setcurrentUser({});
            setloading(false);
            setAvatar('/Assets/icons/avatar.png')
        }
    }



    useEffect(() => {
        fetchUserData();
        // console.log(currentUser);
    }, [user]);


    return (
        <div className={`w-screen h-screen flex flex-col items-start justify-start box-border pt-[12vh]`}>
            <Head>
                <title>DevsUI 🌩️ </title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/faviconhttps://www.getdroidtips.com/realme-narzo-10a-firmware-flash-file/#google_vignette.ico" />
            </Head>
            <NavBar />
            <div className={`${styles.PersonalDetails} relative w-screen h-screen flex flex-col items-center justify-start overflow-y-scroll scrollbar-hide `}>
                <h1 className={`${styles.heading} z-[-1] self-start ml-5 my-3 text-[6vw] esm:text-[5.5vw] asm:text-[6vw] msm:text-[5vw] sm:text-[3vw] md:text-[3.2vw] lg:text-[3.4vw] xl:text-[2.6vw] 2xl:text-[1.5vw]  sm:ml-[55px] md:ml-[59px] lg:ml-[75px] xl:ml-[85px] 2xl:ml-[210px]`}>Personal Details</h1>
                <div className={` w-[100%] z-[1] sm:z-[10] flex flex-col sm:items-start sm:flex-row-reverse  sm:justify-center sm:items-start sm:w-[90%] 2xl:min-h-[65vh] ds:min-h-[70vh]`}>
                    <div className={`${styles.ImageContainer} flex flex-col items-center justify-center mb-2 sm:mr-10`}>
                        <img src={user?.photoURL ?? "/Assets/icons/avatar.png"} alt="" className={`w-[5vh] object-cover h-[5vh] sm:min-w-[230px] sm:min-h-[230px]  sm:h-[10vh] w-[10vh] min-w-[200px] min-h-[200px] rounded-[100%] 2xl:w-[50vh] 2xl:h-[40vh] 2xl:min-h-[650px] 2xl:min-w-[650px] 2xl:z-[-1]`} />
                        <button className={`${styles.UpdateImageBtn} box-border pt-[1%] relative min-w-[100px] my-1 cursor-pointer min-h-[30px] max-h-[40px] focus:outline-none bg-[#323c71] rounded-[10px] sm:min-w-[120px] sm:min-h-[35px] sm:mt-5 flex items-center justify-center text-white text-[70%] sm:text-[80%]  2xl:min-w-[500px] 2xl:min-h-[95px] 2xl:text-[1vw] `}>
                            <input accept='image/jpeg , image/png' title='upload' id='upload' className='z-[100] cursor-pointer absolute opacity-0' type={'file'} onChange={(e) => handleImageAsFile(e)} />
                            uploadImage
                        </button>
                    </div>
                    {
                        loading ? (
                            <div className='w-[100%] pt-[15vh] mi-h-[50vh] flex items-center font-bold italic justify-center'>
                                {uploading ? "Uploading Please wait..." : "Synchronising..."}
                            </div>
                        ) : (
                            <div className={`${styles.InputContainer} w-[100%] flex flex-col sm:box-border sm:pl-5`}>
                                <input value={currentUser.name} onChange={(e) => setcurrentUser({ ...AuthContext, name: e.target.value })} type="text" placeholder='Name' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                                <input value={currentUser.bio} onChange={(e) => setcurrentUser({ ...AuthContext, bio: e.target.value })} type="text" placeholder='Bio' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] min-h-[100px] 2xl:w-[40%] 2xl:min-h-[180px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input_bio} `} />
                                <input value={currentUser.website} onChange={(e) => setcurrentUser({ ...AuthContext, website: e.target.value })} type="text" placeholder='Website' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                                <input value={currentUser.github} onChange={(e) => setcurrentUser({ ...AuthContext, github: e.target.value })} type="text" placeholder='Github' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                                <input value={currentUser.twitter} onChange={(e) => setcurrentUser({ ...AuthContext, twitter: e.target.value })} type="text" placeholder='Twitter' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                                <input value={currentUser.facebook} onChange={(e) => setcurrentUser({ ...AuthContext, facebook: e.target.value })} type="text" placeholder='Facebook' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                                <input value={currentUser.linkedIn} onChange={(e) => setcurrentUser({ ...AuthContext, linkedIn: e.target.value })} type="text" placeholder='Linkedin' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                                <input value={currentUser.dribble} onChange={(e) => setcurrentUser({ ...AuthContext, dribble: e.target.value })} type="text" placeholder='Dribble' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                                <input value={currentUser.instagram} onChange={(e) => setcurrentUser({ ...AuthContext, instagram: e.target.value })} type="text" placeholder='Instagram' className={`self-center focus:outline-none w-[80%] min-h-[40px] bg-gray-200 rounded-[10px] my-2 pl-4 sm:self-start sm:w-[60%] 2xl:w-[40%] 2xl:w-[40%] 2xl:min-h-[80px] 2xl:placeholder:text-[30px] 2xl:my-5 ${styles.input} `} />
                                <button onClick={() => uploadData({ currentUser, setloading, fetchUserData, setuploading, user })} className={`${styles.UpdateProfileBtn} self-start ml-10 mt-5 mb-8 min-w-[100px] min-h-[35px] focus:outline-none rounded-[10px] bg-[#323c71] flex items-center justify-center text-[75%] text-white sm:ml-0 2xl:min-w-[300px] 2xl:min-h-[75px] 2xl:text-[1vw]`}>Update Profile</button>
                            </div>

                        )
                    }
                </div>
                <Footer position='relative' />
            </div>
        </div>
    )
}

export default PersonalDetails