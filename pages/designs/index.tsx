import { collection, doc, getFirestore, onSnapshot, query } from 'firebase/firestore'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import DesignCard from '../../components/DesignCard'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import { Design } from '../../constants/types'
import styles from '../../styles/desktop.module.css'
import { Detector } from 'react-detect-offline'
import CheckInternetConnection from '../../components/CheckInternetConnection'



const Designs: NextPage = () => {
    const [width, setWidth] = useState(0);
    const [designs, setDesigns] = useState<Array<any>>([]);
    const [online, setonline] = useState<boolean>(true)



    useEffect(() => {
        if (typeof (window) !== undefined) {
            setWidth(window.innerWidth);
        }
        // console.log(width);    
        try {
            if(online){
                const q = query(collection(getFirestore(), "Designs"));
                onSnapshot(q, (querySnapshot) => {
                setDesigns(querySnapshot.docs);
                // querySnapshot.forEach((doc) => {
                //     // setDesigns([...designs, doc.data()])
                // });
        
                });
            }
        } catch (error) {
            console.log(error)
        }
    }, [])



    return (
        <CheckInternetConnection>
        <div className='w-screen h-screen flex flex-col justify-start items-center overflow-y-scroll snap-y snap-mandatory scrollbar-hide pt-[14vh] sm:pt-[10vh] sm:snap-none'>
            <Head>
                <title>DevsUI-Designs 🌩️ </title>
                <meta name="description" content="designs" />
                <link rel="icon" href="/faviconhttps://www.getdroidtips.com/realme-narzo-10a-firmware-flash-file/#google_vignette.ico" />
            </Head>
            <NavBar />
            <h1 className="text-[7vw] flex font-bold self-start snap-center ml-[20px] mb-[10px]  sm:hidden ">Designs</h1>
            <h1 className="text-[5vw] font-bold self-start ml-[20px] mb-[10px] snap-start sm:text-[2vw] sm:snap-none">Latest updates</h1>
            <div className={`${styles.DesignCardContainer} flex flex-col w-screen items-center box-border  border-2 sm:grid sm:grid-cols-4 sm:place-items-center sm:px-[3%] gap-y-[50px] sm:pt-[3vh] sm:pb-[7vh] sm:pt-[5vh]`}>
                {
                    designs.map((item,index) =>(
                        <DesignCard key={index} destination='' images={item.data().images} designName={item.data().name} profileURL={item.data().userPhotoURL} uid={item.data().uid} />
                    ))
                }
               
            </div>
            {width > 640 && (<Footer position='relative' />)}
            <Detector 
              render={() => null}
              onChange={(o) => setonline(o)}
            />
        </div>
        </CheckInternetConnection>
    )
}

export default Designs