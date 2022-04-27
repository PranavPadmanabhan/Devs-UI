import { NextPage } from 'next'
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import { FaFilter, FaSort } from 'react-icons/fa'
import OptionItems from '../../components/OptionItems'
import DrawerItem from '../../components/DrawerItem'
import MiniFooter from '../../components/MiniFooter'
import styles from '../../styles/desktop.module.css'
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore'
import Link from 'next/link'
import { AuthContext } from '../../contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import { notify } from '../../services/Services'

const Challenges: NextPage = () => {
    const [width, setWidth] = useState(0);
    const { user } = useContext(AuthContext)
    const [filter, setFilter] = useState<Array<any>>([] as Array<any>)
    const [filterOptions, setFilterOptions] = useState(["Level 1", "Level 2", "Level 3", "Level 4"])
    const [sortOptions, setsortOptions] = useState(["Easier First", "Harder First"]);
    const [sort, setSort] = useState<Array<any>>([] as Array<any>)
    const [sortingDrawerVisiblity, setSortingDrawerVisiblity] = useState<boolean>(false)
    const [filterDrawerVisiblity, setFilterDrawerVisibility] = useState<boolean>(false);
    const [designs, setDesigns] = useState<Array<any>>([]);

    const q = query(collection(getFirestore(), "Designs"));
    onSnapshot(q, (querySnapshot) => {
        setDesigns(querySnapshot.docs);
        // querySnapshot.forEach((doc) => {
        //     // setDesigns([...designs, doc.data()])
        // });

    });
    const images = [
        '/Assets/images/image1.JPG',
        '/Assets/images/image2.JPG',
        '/Assets/images/image3.JPG'
    ]

    useEffect(() => {
        if (typeof (window) !== undefined) {
            setWidth(window.innerWidth);
        }

    }, [])

    const addFilter = (item: string, index: number,) => {
        if (filter.includes(item)) {
            setFilter(filter.filter((f) => f !== item))
        }
        else {
            setFilter([...filter, item])
        }
    }
    const addtoSort = (item: string, index: number,) => {
        if (sort.includes(item)) {
            setSort(sort.filter((f) => f !== item))
        }
        else {
            setSort([...sort, item])
        }
    }

    const uploadLinkClick = () => {
        if (!user) notify('Please login and try again');
        else return;
    }

    return (
        <div className='w-screen h-screen box-border flex flex-col pt-[9vh] overflow-hidden'>
            <Head>
                <title>Challenges 🌩️ </title>
                <meta name="description" content="designs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <h1 className="self-start block text-[7vw] text-black font-bold sm:hidden">Challenges</h1>


            {/*--------------- second header with search options starts here ---------------*/}


            <div className={`${styles.SmallHeader} group  flex items-center justify-between w-[100%] h-[10vh] sm:px-[3%] border-b-[1px] border-gray-400 sm:mb-5`}>
                <div className="flex w-[60%] min-h-[45px] h-[70%] items-center justify-evenly px-[3%] sm:px-2 ml-2 bg-[#e5e7eb] rounded-[10px]">
                    <input type="text" className=" w-[90%] h-[100%] focus:outline-none focus:group-mt-[-10px] bg-[#e5e7eb]" />
                    <img src="/Assets/lightmode/magnifying-glass.png" alt="" className="h-[45%]" />
                </div>
                <div className="flex items-center justify-evenly w-[40%] h-[100%] ">
                    <div className="w-[40%] h-[70%] min-h-[45px] flex flex-col items-center justify-center rounded-[10px] cursor-pointer bg-[#e5e7eb]">
                        <h1 className="hidden sm:flex">sort by</h1>
                    </div>
                    <div className="w-[40%] h-[70%] min-h-[45px] flex flex-col items-center justify-center rounded-[10px] cursor-pointer bg-[#e5e7eb]">
                        <h1 className="hidden sm:flex">Filter by</h1>
                    </div>
                </div>
            </div>

            {/*--------------- second header with search options starts here ---------------*/}

            {/*--------------- challenges container starts here ---------------*/}
            <div className="flex flex-col w-[100%] h-auto overflow-x-hidden overflow-y-auto snap-y snap-mandatory scrollbar-hide">
                {designs.length !== 0 ? null : (<Link href={user ? '/uploadDesign' : '/challenges'}><h1 onClick={uploadLinkClick} className='self-center cursor-pointer border-b-[1px] border-black mt-[35vh]'>Upload a challenge</h1></Link>)}

                <section className=" grid grid-cols-1 gap-y-[5vh] place-items-center snap-center py-[3vh] scrollbar-hide bg-white overflow-y-scroll snap-y snap-mandatory w-[100%] min-h-[70vh] sm:overflow-x-hidden sm:grid sm:grid-cols-4 sm:place-items-center sm:min-h-[90vh]">
                    {
                        designs.map((item, index) => (
                            <Card images={item.data().images} title={item.data().name} description={item.data().description} level={item.data().levels} destination={`challenges/${item.data().name}`} snap={width < 640 ? 'snap-center' : "snap-none"} uid={item.data().uid} />
                        ))
                    }
                    {/* <Card images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap={width < 640 ? 'snap-start':"snap-none"} />
                <Card images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap={width < 640 ? 'snap-start':"snap-none"} />
                <Card images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap={width < 640 ? 'snap-start':"snap-none"} />
                <Card images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap={width < 640 ? 'snap-start':"snap-none"} />
                <Card images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap={width < 640 ? 'snap-start':"snap-none"} />
                <Card images={images} title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap={width < 640 ? 'snap-start':"snap-none"} /> */}
                </section>
                <Footer position='relative' />
                <Toaster />
            </div>

            {/*--------------- challenges container ends here ---------------*/}

        </div>
    )
}

export default Challenges