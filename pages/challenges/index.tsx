import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import { FaFilter, FaSort } from 'react-icons/fa'
import OptionItems from '../../components/OptionItems'

const Challenges: NextPage = () => {
    const [width, setWidth] = useState(0);
    const [filter, setFilter] = useState<Array<any>>([] as Array<any>)
    const [filterOptions, setFilterOptions] = useState(["Level 1", "Level 2", "Level 3", "Level 4"])
    const [sortOptions, setsortOptions] = useState(["Easier First", "Harder First"]);
    const [sort, setSort] = useState<Array<any>>([] as Array<any>)
    const [sortingDrawerVisiblity, setSortingDrawerVisiblity] = useState<boolean>(false)
    const [filterDrawerVisiblity, setFilterDrawerVisibility] = useState<boolean>(false)

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
            setSort([...sort,item])
        }
    }

    return (
        <div className='w-screen h-screen flex flex-col justify-start items-center overflow-y-scroll snap-y snap-mandatory scrollbar-hide pt-[14vh] sm:pt-[10vh] sm:snap-none'>
            <Head>
                <title>Challenges 🌩️ </title>
                <meta name="description" content="designs" />
                <link rel="icon" href="/faviconhttps://www.getdroidtips.com/realme-narzo-10a-firmware-flash-file/#google_vignette.ico" />
            </Head>
            <NavBar />
            <h1 className="text-[7vw] font-bold self-start ml-[20px] mb-[10px] snap-start sm:text-[2vw] sm:snap-none">Challenges</h1>
            <div className="flex items-center w-[100vw] min-h-[10vh] self-start  justify-center snap-center box-border">
                <div className="w-[55%] h-[70%] flex items-start ml-[15px] rounded-[15px] bg-gray-200 items-center px-[2%]">
                    <input placeholder='search' type="text" className=" w-[100%] h-[90%] bg-transparent cursor-auto focus:outline-none" />
                    <img src="/Assets/lightmode/magnifying-glass.png" alt="" className="w-[15%] min-w-[30px] sm:w-[5%]" />
                </div>
                <div onClick={() => {
                    setSortingDrawerVisiblity(!sortingDrawerVisiblity);
                    setFilterDrawerVisibility(false)
                }}
                    className="group w-[14%] bg-gray-200 flex items-center justify-center min-h-[70%] rounded-[10px] mx-[10px] sm:w-[10%] sm:mx-[5%]">
                    <h1 className="hidden sm:flex text-gray-700">sort By</h1>
                    <FaSort className='flex sm:hidden' />
                    <div className="fixed z-1000 top-[26.5vh] right-[22vw] w-[14%] h-auto bg-white shadow-task rounded-[20px] border-2 border-gray-300 hidden sm:group-hover:flex hover:flex flex-col items-center justify-start overflow-hidden">
                        {
                            sortOptions.map((item, index) => (
                                <OptionItems
                                    key={index}
                                    borderEnabled={true}
                                    title={item}
                                    selected={sort.includes(item) ? true : false}
                                    onClick={() => addtoSort(item, index)} />
                            ))
                        }
                    </div>
                    {
                        sortingDrawerVisiblity && (
                            <div className="fixed z-1000 top-[30vh] right-[22vw] w-[50%] h-auto bg-white shadow-task rounded-[20px] border-2 border-gray-300 flex flex-col items-center justify-start overflow-hidden sm:hidden">
                                {
                                    sortOptions.map((item, index) => (
                                        <OptionItems
                                            key={index}
                                            borderEnabled={true}
                                            title={item}
                                            selected={sort.includes(item) ? true : false}
                                            onClick={() => addtoSort(item, index)} />
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                <div onClick={() => {
                    setFilterDrawerVisibility(!filterDrawerVisiblity);
                    setSortingDrawerVisiblity(false)
                }}
                    className="group w-[14%] bg-gray-200 flex items-center justify-center min-h-[70%] rounded-[10px] sm:w-[10%]">
                    <h1 className=" hidden sm:flex text-gray-700">Filter By</h1>
                    <FaFilter className='flex sm:hidden' />
                    <div className="fixed  top-[26.5vh] right-[6.9vw] w-[14%] h-auto bg-white shadow-task rounded-[20px] border-2 border-gray-300 overflow-hidden hidden sm:group-hover:flex hover:flex flex-col items-center justify-start">
                        {
                            filterOptions.map((item, index) => (
                                <OptionItems
                                    key={index}
                                    borderEnabled={false}
                                    title={item}
                                    selected={filter.includes(item) ? true : false}
                                    onClick={() => addFilter(item, index)} />
                            ))
                        }
                    </div>
                    {
                        filterDrawerVisiblity && (
                            <div className="fixed  top-[30vh] right-[6.9vw] w-[50%] h-auto bg-white shadow-task rounded-[20px] border-2 border-gray-300 overflow-hidden flex flex-col items-center justify-start sm:hidden">
                                {
                                    filterOptions.map((item, index) => (
                                        <OptionItems
                                            key={index}
                                            borderEnabled={false}
                                            title={item}
                                            selected={filter.includes(item) ? true : false}
                                            onClick={() => addFilter(item, index)} />
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="flex flex-col w-screen items-center box-border  border-2 sm:grid sm:grid-cols-4 sm:place-items-center sm:px-[3%] gap-y-[50px] sm:pt-[3vh] sm:pb-[7vh] sm:pt-[5vh]">
                <Card url='/Assets/images/image1.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' animationEnabled={true} level={1} destination={"challenges/1"}/>
                <Card url='/Assets/images/image2.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' animationEnabled={true} level={1} destination={"challenges/2"}/>
                <Card url='/Assets/images/image3.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' animationEnabled={true} level={1} destination={"challenges/3"}/>
                <Card url='/Assets/images/image1.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' animationEnabled={true} level={1} destination={"challenges/1"}/>
                <Card url='/Assets/images/image2.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' animationEnabled={true} level={1} destination={"challenges/2"}/>
                <Card url='/Assets/images/image3.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' animationEnabled={true} level={1} destination={"challenges/3"}/>
                {width < 640 && (<Footer />)}
            </div>
            {width > 640 && (<Footer />)}
        </div>
    )
}

export default Challenges