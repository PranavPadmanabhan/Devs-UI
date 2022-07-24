import useLocalStorage from '@rehooks/local-storage'
import { collection, getDocs, getFirestore, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useSwipeable } from 'react-swipeable'
import Card, { UseIntersection } from '../../components/Card'
import CheckInternetConnection from '../../components/CheckInternetConnection'
import Footer from '../../components/Footer'
import Loader from '../../components/Loader'
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
    ];

    const [currentTab, setCurrentTab] = useState<CurrentTab>("My Designs");
    const [currentUser, setcurrentUser] = useState<User>({} as User);
    const { user } = useContext(AuthContext)
    const [Width, setwidth] = useState(0)
    const [designs, setDesigns] = useState<Array<any>>([]);
    const [completedDesigns, setCompletedDesigns] = useState<Array<any>>([])
    const [incompletedDesigns, setIncompletedDesigns] = useState<Array<any>>([])
    const ref2 = useRef<HTMLDivElement>(null)
    const [intersecting, width] = UseIntersection({ ref: ref2, options: { rootMargin: '100px', threshold: 1 } })
    const { contributions } = currentUser;
    const { uid } = router.query;
    const [loading, setLoading] = useState<boolean>(false)



    const q = query(collection(getFirestore(), "Designs"),orderBy('createdAt','desc'));
//    const unsub =  onSnapshot(q, (querySnapshot) => {
//         setDesigns(querySnapshot.docs);
//         // querySnapshot.forEach((doc) => {
//         //     // setDesigns([...designs, doc.data()])
//         // });
//         // console.log(querySnapshot.docs[0].data())

//     });
      const fetch = () => {
        setLoading(true)
        getDocs(q).then((res) => {
            setDesigns(res.docs.filter((items) => items.data().uid == uid));
            setCompletedDesigns(designs.filter((item) => item.data().isCompleted == true))
            setIncompletedDesigns(designs.filter((item) => item.data().isCompleted == false))
            setLoading(false)
        })
      }

      

    const fetchUserData = async () => {
        setLoading(true)
            const userData = await SearchUserData(uid?.toString())
            setcurrentUser(userData)
        setLoading(false)
    }

   
    useEffect(() => {
        if(typeof(window !== undefined)){
            setwidth(window.innerWidth)
               
        }
        fetchUserData();
        fetch();
        
    }, [user, contributions,designs.length,uid])

  
    

    const config = {
        delta: 10,
        preventDefaultTouchmoveEvent: true,
        trackTouch: true,
        trackMouse: false,
        rotationAngle: 0,
    }

    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            if (currentTab === "My Designs") {
                if(user && currentUser.uid === user.uid) setCurrentTab("Task In Progress")
            }
            else if ( currentTab === "Task In Progress") {
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
        if (currentTab === 'My Designs' ) {
            return (
                <div {...handlers} className={`${styles.singleTab} w-[100%] h-[100%] flex flex-col items-center overflow-y-scroll snap-y snap-mandatory box-border pb-[15%] scrollbar-hide ${!designs.length?'sm:flex flex-col':'sm:grid'} sm:grid-cols-4 sm:place-items-start sm:gap-y-5 sm:snap-none `}>
                    {
                        designs.map((item, index) => (
                            <Card key={index} images={item.data().images} title={item.data().name} description={item.data().description} level={item.data().levels} destination={item.data().name} snap={width < 640 ? 'snap-center' : "snap-none"} uid={item.data().uid} userData={currentUser} fetchUserData={fetchUserData} />
                        ))
                    }
                    {
                        !designs.length && (
                            <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
                                <h1 className='text-black font-bold'>No Designs</h1>
                            </div>
                        )
                    }
                   
                </div>
          
            )
        }
        else if (currentTab === 'Task In Progress') {
            return (
                <div {...handlers} className={`${styles.singleTab} w-[100%] h-[100%] flex flex-col items-center  overflow-y-scroll snap-y snap-mandatory scrollbar-hide ${!incompletedDesigns.length?'sm:flex flex-col':'sm:grid'} sm:grid-cols-4 sm:place-items-start sm:gap-y-5 sm:snap-none pt-1`}>
                    {
                       incompletedDesigns.map((item, index) => (
                            <Card key={index} images={item.data().images} title={item.data().name} description={item.data().description} level={item.data().levels} destination={item.data().name} snap={width < 640 ? 'snap-center' : "snap-none"} uid={item.data().uid} userData={currentUser} fetchUserData={fetchUserData} />
                        ))
                    }  
                    {
                        !incompletedDesigns.length && (
                            <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
                                <h1 className='text-black font-bold'>No Incomplete Designs</h1>
                            </div>
                        )
                    }
                </div>
            )
        }
        else {
            return (
                <div {...handlers} className={`${styles.singleTab} w-[100%] h-[100%] flex flex-col items-center overflow-y-scroll snap-y snap-mandatory scrollbar-hide ${!completedDesigns.length?'sm:flex flex-col':'sm:grid'} sm:grid-cols-4 sm:place-items-start sm:gap-y-5 sm:snap-none`}>
                     {
                        completedDesigns.map((item, index) => (
                            <Card key={index} images={item.data().images} title={item.data().name} description={item.data().description} level={item.data().levels} destination={item.data().name} snap={width < 640 ? 'snap-center' : "snap-none"} uid={item.data().uid} userData={currentUser} fetchUserData={fetchUserData} />
                        ))
                    }
                    {
                        !completedDesigns.length && (
                            <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
                                <h1 className='text-black font-bold'>No Completed Designs</h1>
                            </div>
                        )
                    }
                    
                </div>
            )
        }
    }

    return (
        <CheckInternetConnection>
        <div className='w-screen h-screen flex flex-col box-border pt-[10vh] sm:pt-[12vh]'>
            <Head>
                <title>DevsUI 🌩️ </title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />

            {/*------------- details starts here -----------*/}
            {
                loading?(
                    <div className='flex items-center justify-center w-[100vw] h-[100vh]'>
                        <Loader />
                    </div>
                ):(
                    <div className={`box-border overflow-y-scroll snap-y snap-mandatory scrollbar-hide scroll-pt-6 `}>
                        <section className={`${styles.firstSection} w-[100%] h-[45vh]  snap-start flex flex-col items-center justify-center sm:flex-row sm:items-start`}>
                            <div className={` w-[100%] h-[80%] flex `}>
                                {/*---------------- first column with image and follow section starts here -----------------------*/}
                                <div className={`${styles.FirstColumn} w-[55%] h-[100%] flex flex-col items-center justify-start box-border mt-5 pt-7 sm:w-[40%] sm:pt-2 `}>
                                    <div className={`${styles.LogoContainer}  w-[100%] h-[70%] flex flex-col items-center justify-center -mt-3 pt-2 mr-3 mb-0 sm:mb-5 sm:mt-3`}>
                                        <img src={currentUser?.photoURL ?? "/Assets/icons/avatar.png"} alt="" className={`${styles.ProfileAvatar} w-[150px] min-h-[150px] sm:w-[180px] sm:min-h-[180px] object-cover rounded-[100%]`} />
                                        {/*-------- update profile image button starts here ------*/}
                                        {
                                            user?(currentUser.uid == user?.uid?(
                                                <div onClick={() => router.push('/personalDetails')} className={`${styles.EditProfileBtn} w-[50%]  h-[15%] rounded-[10px] bg-[#323c71] min-h-[32px] flex items-center justify-center cursor-pointer mb-5 mt-2 sm:w-[30%] sm:h-[20%] sm:mb-[1vh]`}>
                                                    <span className={`text-white text-[4vw] sm:text-[1.5vw] `}>Edit profile</span>
                                                </div>
                                            ):(
                                                <div onClick={() => {}} className={`${styles.EditProfileBtn} w-[50%]  h-[15%] rounded-[10px] bg-[#323c71] min-h-[32px] flex items-center justify-center cursor-pointer mb-5 mt-2 sm:w-[30%] sm:h-[20%] sm:mb-[1vh]`}>
                                                    <span className={`text-white text-[4vw] sm:text-[1.5vw] `}>Follow</span>
                                                </div>
                                            )):null
                                        }
                                        {/*-------- update profile image button starts here ------*/}

                                    </div>
                                    <div className={`${styles.FollowerSection} w-[100%] h-[20%] flex items-center justify-evenly mt-[10px] box-border box-border pl-9 mt-9 sm:mt-[5vh] `}>
                                        <div className={`w-[25%] h-[100%] flex flex-col items-center justify-center  mr-7`}>
                                            <span className={`mb-2 text-[12px] font-light sm:text-[18px]`}>contributions</span>
                                            <span className={` text-[22px] font-light`}>{currentUser.contributions ?? 0}</span>
                                        </div>
                                        <div className={`w-[25%] h-[100%] flex flex-col items-center justify-center mr-5 `}>
                                            <span className={`mb-2 text-[12px] font-light sm:text-[18px]`}>Followers</span>
                                            <span className={`text-[22px] font-light`}>{currentUser.followers?.length ?? 0}</span>
                                        </div>
                                        <div className={`w-[25%] h-[100%] flex flex-col items-center justify-center mr-5`}>
                                            <span className={`mb-2 text-[12px] font-light sm:text-[18px]`}>Following</span>
                                            <span className={`text-[22px] font-light`}>{currentUser.following?.length ?? 0}</span>
                                        </div>
                                    </div>
                                </div>
                                {/*---------------- first column with image and follow section ends here -----------------------*/}

                                {/*-------------- details and social media section starts here ---------------------*/}
                                <div className={`${styles.secondColumn} w-[50%] h-[100%] flex flex-col items-start justify-start box-border pt-5 pl-2  sm:pt-0`}>
                                    <h1 className={`block text-[2.5vh] font-semibold whitespace-nowrap  mt-3 sm:text-[32px] sm:hidden`}>{currentUser.name?.slice(0, 8) ?? `${currentUser.email?.slice(0, 10)}`}..</h1>
                                    <h1 className={`hidden sm:block text-[2.5vh] font-semibold whitespace-nowrap  mt-3 sm:text-[32px] `}>{currentUser.name ?? `${currentUser.email?.slice(0, 10)}`}</h1>
                                    <SocialMediaItems title={currentUser.bio == ''  ? 'Not Available' : currentUser.bio} url='/Assets/lightmode/cv.png' />
                                    <SocialMediaItems title={currentUser.website == ''  ? 'Not Available' : currentUser.website} url='/Assets/lightmode/link.png' />
                                    <SocialMediaItems title={currentUser.github == ''  ? 'Not Available' : currentUser.github} url='/Assets/lightmode/github.png' />
                                    <SocialMediaItems title={currentUser.twitter == ''  ? 'Not Available' : currentUser.twitter} url='/Assets/lightmode/twitter.png' />
                                    <SocialMediaItems title={currentUser.facebook == ''  ? 'Not Available' : currentUser.facebook} url='/Assets/lightmode/facebook.png' />
                                    <SocialMediaItems title={currentUser.dribble == ''  ? 'Not Available' : currentUser.dribble} url='/Assets/lightmode/dribble.png' />
                                    <SocialMediaItems title={currentUser.linkedIn == ''  ? 'Not Available' : currentUser.linkedIn} url='/Assets/lightmode/linkedin.png' />
                                    <SocialMediaItems title={currentUser.instagram == ''  ? 'Not Available' : currentUser.instagram} url='/Assets/lightmode/instagram.png' />
                                </div>
                                {/*-------------- details and social media section ends here ---------------------*/}

                            </div>
                            {/*----------------- design upload button starts here-------------*/}
                            {
                                user?(currentUser.uid == user.uid && (
                                <div onClick={() => router.push('/uploadDesign')} className={`w-[35%] h-[5%] min-h-[35px] rounded-[25px] bg-[#323c71] mr-0 flex items-center justify-center my-[8%] cursor-pointer sm:w-[25%] sm:my-4 sm:mr-5`}>
                                    <span className={`text-white text-[16px]`}>Upload design</span>
                                </div>
                            ) ):null
                            }
                            {/*----------------- design upload button ends here -------------*/}

                        </section>
                {/*------------- details ends here -----------*/}

                <section className={`${styles.Content} w-[100%] h-screen  snap-start box-border pb-[10vh] sm:mt-[6vh] `}>
                    <div ref={ref2} className={`${styles.TabsContainer}  ${intersecting?'sticky top-0 mt-5 bg-white z-[100] sm:relative ':'relative'} flex w-[100%] h-[5%] items-center justify-between box-border px-3 mb-[2vh] sm:px-[10%] sm:mt-[2vh] `}>
                        {
                            user?(currentUser.uid == user.uid?(
                                <>
                                    <span onClick={() => setCurrentTab("My Designs")} className={`${currentTab === "My Designs" ? `border-b-4 border-[#323c71] text-[#323c71] font-bold text-[18px] ${styles.TabActive}` : `border-none text-black font-light text-[14px] ${styles.Tab}`} duration-1000 py-2 cursor-pointer `}>My Designs</span>
                                    <span onClick={() => setCurrentTab("Task In Progress")} className={`${currentTab === "Task In Progress" ? `border-b-4 border-[#323c71] text-[#323c71] font-bold text-[18px] ${styles.TabActive}` : `border-none text-black font-light text-[14px] ${styles.Tab}`} duration-1000 py-2 cursor-pointer`}>Task In Progress</span>
                                    <span onClick={() => setCurrentTab("Task Completed")} className={`${currentTab === "Task Completed" ? `border-b-4 border-[#323c71] text-[#323c71] font-bold text-[18px] ${styles.TabActive}` : `border-none text-black font-light text-[14px] ${styles.Tab}`} duration-1000 py-2 cursor-pointer`}>Task Completed</span>
                                </>
                            ):(<span onClick={() => setCurrentTab("My Designs")} className={`${currentTab === "My Designs" ? `border-b-4 border-[#323c71] text-[#323c71] font-bold text-[18px] ${styles.TabActive}` : `border-none text-black font-light text-[14px] ${styles.Tab}`} duration-1000 py-2 cursor-pointer `}>Designs</span>)):(<span onClick={() => setCurrentTab("My Designs")} className={`${currentTab === "My Designs" ? `border-b-4 border-[#323c71] text-[#323c71] font-bold text-[18px] ${styles.TabActive}` : `border-none text-black font-light text-[14px] ${styles.Tab}`} duration-1000 py-2 cursor-pointer `}>Designs</span>)
                        }
                    </div>
                    <RenderTabs />
                </section>
                {Width >640 && (<Footer position='relative' />)}

            </div>
                )
            }
            <Toaster />

        </div>
        </CheckInternetConnection>
    )
}

export default Profile