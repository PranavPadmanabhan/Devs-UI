import { NextPage } from 'next'
import data from '../../data.json'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import ItemsProvided from '../../components/ItemsProvided'
import ChallengeButtons from '../../components/ChallengeButtons'
import styles from '../../styles/desktop.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { collection, doc, getDoc, getFirestore, onSnapshot, query, where } from 'firebase/firestore'
import { Design } from '../../constants/types'
import { AuthContext } from '../../contexts/AuthContext'
import { notify } from '../../services/Services'
import { Toaster } from 'react-hot-toast'
import CheckInternetConnection from '../../components/CheckInternetConnection'
import { Detector } from 'react-detect-offline' 


const Challenge: NextPage = (challenges) => {

    const router = useRouter()
    const { challengeName, id } = router.query;
    const [currentElement, setcurrentElement] = useState<any>({})
    const { user } = useContext(AuthContext);
    const [currentImage, setcurrentImage] = useState<string>();
    const [images, setimages] = useState([])
    const [online, setonline] = useState<boolean>(true)



        //   getDoc(doc(getFirestore(),`Designs/${challengeName}`)).then((res) => {
        //    setcurrentElement(res.data());
        //    console.log(res.data())
        // })

        if(online){
            const unsub =  onSnapshot(doc(getFirestore(),`Designs/${challengeName}`), (querySnapshot) => {
                // querySnapshot.forEach((doc) => {
                //     // setDesigns([...designs, doc.data()])
                // });
                setcurrentElement(querySnapshot.data())

            });
        }
        

 



    const challengeBtnClick = () => {
        if (!user) notify('Please login and try again');
        else return;
    }




    return (
        <CheckInternetConnection>
        <div className='w-screen h-screen flex flex-col items-center justify-start pt-[10vh] box-border overflow-y-scroll snap-y snap-mandatory scrollbar-hide sm:snap-none '>
            <NavBar />
            <div className="flex flex-col items-center justify-start sm:flex-row sm:items-center justify-center sm:box-border sm:px-[5%]">
                <div className={`${styles.Section1} flex flex-col items-center justify-start w-screen h-[60%] px-[5%] min-h-[60vh] box-border snap-center sm:w-[50%] sm:h-[100%] `}>
                    <div className={`${styles.IconRow} flex items-center w-[100%] h-[15%] justify-between`}>
                        <div className="self-start my-[10px] flex items-center justify-between w-[35%] h-[70%] max-h-[30px] pl-[5px] border-[1px] border-gray-300 rounded-[8px] sm:w-[25%] sm:h-[25%] sm:min-h-[30px] sm:ml-[7%] sm:mb-[5%]">
                            <span className="">Level {currentElement?.levels??1}</span>
                            <div className="w-[30px] h-[30px] rounded-[5px] flex items-center justify-center mr-[-2px]" style={{ backgroundColor: '#58FF74' }}><span className="text-white font-bold">{currentElement?.levels??1}</span></div>
                        </div>
                        <div className="hidden sm:flex items-center justify-center w-[20%]">
                            <div className="flex w-[40%] items-center bg-gray-300 justify-center mr-[5px] rounded-[8px] mr-[5px] min-h-[35px]">
                                <img src="/Assets/lightmode/monitor.png" alt="" className="w-[40%]" />
                            </div>
                            <div className="flex w-[40%] bg-gray-300 items-center justify-center min-h-[35px] rounded-[8px]">
                                <img src="/Assets/lightmode/smartphone.png" alt="" className="w-[50%]" />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.ChallengeImgContainer} w-screen h-[100%] flex flex-col  px-[7%] scrollbar-hide sm:h-[100%] sm:w-[100%] sm:mb-[5vh]`}>
                        <Carousel dynamicHeight={true} showThumbs={false} className="rounded-[15px] ">

                            {
                                currentElement?.images?.map((item:any, index:number) => (
                                    <img key={index} src={item} alt="" className="h-[60%] min-h-[45vh] sm:min-h-[65vh] max-h-[65vh] bg-grey-200 rounded-[15px]  duration-1000" />
                                    ))
                            }
                        </Carousel>
                    </div>
                </div>
                <div className={`${styles.ChallengeDetails} flex flex-col w-screen  box-border snap-center sm:w-[50%] `}>
                    <h1 className={`${styles.ChallengeName} ml-[5%] text-[10vw] font-light self-start my-[7px] sm:text-[4vw]`}>{currentElement?.name}</h1>
                    <span className={`ml-[5%] max-w-[90%] text-[4vw] font-light sm:text-[1vw]`}>{currentElement?.description}</span>
                    <div className={`${styles.AuthorContainer} pl-[5%] w-screen h-[13vh] flex items-center box-border sm:w-[60%]`}>
                        <img src={currentElement?.userPhotoURL} alt="" className={`w-[20%] rounded-[100%] mr-3 sm:w-[10%] sm:max-w-[90px] sm:min-w-[60px]`} />
                        <div className={` flex flex-col w-[50%] items-start justify-center h-[100%] sm:w-[60%] sm:ml-[3%]`}>
                            <span className={`1text-[6vw] sm:text-[1.6vw] font-semibold`}>{user?(currentElement?.uid !== user.uid?(currentElement?.authorName??"########"):"You"):(currentElement?.authorName??'########')}</span>
                            <div onClick={() => router.push(`/profile/${currentElement?.uid}`)} className={`${styles.VisitProfileBtn} w-[60%] h-[30%] bg-[#333c73] flex items-center justify-center rounded-[10px] sm:mt-[5px] sm:w-[50%] sm:min-w-[100px] sm:max-h-[40px] sm:h-[35%] cursor-pointer`}>
                                <span className={`text-white text-[4vw] sm:text-[1vw] font-semibold`}>{user?(currentElement?.uid !== user.uid? 'Visit Profile':'Profile'):'Visit Profile'}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.ProvidedItemsDetails} flex flex-col items-start justify-start box-border sm:w-[50%]`}>
                        <h1 className="ml-[5%] my-[10px] text-black font-bold text-[5vw] sm:text-[1vw]">Items Provided  </h1>
                        <ItemsProvided title='Figma file access' />
                        <ItemsProvided title='PNG or JPG file for Desktop and Mobile layouts' />
                        <ItemsProvided title='Optimized image assets' />
                        <ItemsProvided title='Readme file to get started' />
                    </div>
                    {
                        user ? (
                           currentElement?.uid !== user.uid?(
                            <div className={`${styles.ButtonsContainer} my-[2vh] w-[100%] min-h-[10vh] flex items-center justify-start box-border`}>
                            {currentElement?.ImageAssetsURL && (<a onClick={challengeBtnClick} href={user ? currentElement?.ImageAssetsURL : '#'}><ChallengeButtons title='Download Zip file' /></a>
                            )}
                            {currentElement?.figmaFileURL && (<a onClick={challengeBtnClick} href={user ? currentElement?.figmaFileURL : "#"}><ChallengeButtons title='Download Figma file' /></a>
                            )}
                            {currentElement?.sketchFileURL && (<a onClick={challengeBtnClick} href={user ? currentElement?.sketchFileURL : "#"}><ChallengeButtons title='Download Sketch file' /></a>
                            )}
                        </div>
                           ):null
                        ):null
                    }
                   
                </div>
            </div>
            <Footer position='relative' />
            <Toaster />
            <Detector 
              render={() => null}
              onChange={(o) => setonline(o)}
            />
        </div>
        </CheckInternetConnection>
    )
}

export default Challenge

