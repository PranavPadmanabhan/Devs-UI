import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import { FaFilter, FaSort } from 'react-icons/fa'
import OptionItems from '../../components/OptionItems'
import DrawerItem from '../../components/DrawerItem'
import MiniFooter from '../../components/MiniFooter'
import styles from '../../styles/desktop.module.css'

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
            setSort([...sort, item])
        }
    }

    return (
        <div className='w-screen  flex flex-col justify-start items-center box-border  pt-[10vh] sm:pt-[12vh] px-[3%] sm:overflow-y-scroll sm:snap-y sm:snap-mandatory sm:'>
            <Head>
                <title>Challenges 🌩️ </title>
                <meta name="description" content="designs" />
                <link rel="icon" href="/faviconhttps://www.getdroidtips.com/realme-narzo-10a-firmware-flash-file/#google_vignette.ico" />
            </Head>
            <NavBar />
            <h1 className="self-start block text-[7vw] text-black font-bold sm:hidden">Challenges</h1>


            {/*--------------- second header with search options starts here ---------------*/}


            <div className={`${styles.SmallHeader} w-screen h-[40vh] box-border flex items-start px-[3%] justify-between sm:px-[5%]  pt-[5%] sm:pt-0 `}>
                <div className="w-[70%] h-[55%] flex items-center justify-between max-h-[50px] px-[3%]  bg-gray-200 rounded-[8px] sm:w-[50%] sm:h-[75%] sm:px-[1%]">
                    <input type="text" className="w-[90%]  h-[100%] min-h-[45px]  focus:outline-none bg-transparent" />
                    <img src="/Assets/lightmode/magnifying-glass.png" alt="" className="w-[10%] sm:max-w-[30px]" />
                </div>
                <div className="w-[40%] h-[100%] flex items-center max-h-[50px] justify-evenly ">
                    <div onClick={() => {
                        setSortingDrawerVisiblity(!sortingDrawerVisiblity);
                        setFilterDrawerVisibility(false)
                    }} className="relative group  sm:z-[-1] cursor-pointer w-[35%] h-[100%] bg-gray-200 flex items-center justify-center rounded-[8px] sm:z-[100]">
                        <span className="hidden sm:block">sort By</span>
                        <FaSort className='block sm:hidden' />

                        {/*--------------- sort options in desktop view starts here ---------------*/}

                        <div className="absolute  hidden flex-col top-[110%] right-1  w-[20vw] h-auto bg-white shadow-task overflow-hidden rounded-[10%] group-hover-none sm:group-hover:flex hover:flex">
                            {
                                sortOptions.map((item, index) => (
                                    <OptionItems key={index} title={item} onClick={() => addtoSort(item, index)} selected={sort.includes(item) ? true : false} borderEnabled={true} />
                                ))
                            }
                        </div>

                        {/*--------------- sort options in desktop view ends here ---------------*/}


                        {/*--------------- sort options in mobile view starts here ---------------*/}

                        {sortingDrawerVisiblity && (
                            <div className="absolute z-[100] flex flex-col top-[115%] right-1  w-[50vw] h-auto bg-white shadow-task overflow-hidden rounded-[10%] sm:hidden">
                                {
                                    sortOptions.map((item, index) => (
                                        <OptionItems key={index} title={item} onClick={() => addtoSort(item, index)} selected={sort.includes(item) ? true : false} borderEnabled={true} />
                                    ))
                                }
                            </div>)}
                        {/*--------------- sort options in mobile view ends here ---------------*/}

                    </div>
                    <div onClick={() => {
                        setFilterDrawerVisibility(!filterDrawerVisiblity);
                        // setSortingDrawerVisiblity(false)
                    }} className="relative group sm:z-[-1] w-[35%] cursor-pointer h-[100%] bg-gray-200 flex items-center  justify-center  max-h-[50px] rounded-[8px] sm:z-[100]">
                        <span className="hidden sm:block">filter by</span>
                        <FaFilter className='block sm:hidden' />

                        {/*--------------- filter options in Desktop view starts here ---------------*/}


                        <div className="absolute hidden  flex-col top-[115%] right-1  w-[15vw] h-auto bg-white shadow-task overflow-hidden rounded-[10%] group-hover-none sm:group-hover:flex hover:flex sm:z-[-1]">
                            {
                                filterOptions.map((item, index) => (
                                    <OptionItems key={index} title={item} onClick={() => addFilter(item, index)} selected={filter.includes(item) ? true : false} borderEnabled={false} />
                                ))
                            }
                        </div>

                        {/*--------------- filter options in Desktop view ends here ---------------*/}


                        {/*--------------- filter options in mobile view starts here ---------------*/}

                        {filterDrawerVisiblity && (
                            <div className="absolute z-[100] flex flex-col top-[115%] right-1  w-[50vw] h-auto bg-white shadow-task overflow-hidden rounded-[10%] sm:hidden">
                                {
                                    filterOptions.map((item, index) => (
                                        <OptionItems key={index} title={item} onClick={() => addFilter(item, index)} selected={filter.includes(item) ? true : false} borderEnabled={false} />
                                    ))
                                }
                            </div>)}

                        {/*--------------- filter options in mobile view ends here ---------------*/}


                    </div>
                </div>
            </div>

            {/*--------------- second header with search options starts here ---------------*/}

            {/*--------------- challenges container starts here ---------------*/}

            <section className={`${styles.ChallengesContainer} w-screen h-[80%] mt-[-30vh] flex flex-col items-center overflow-y-scroll snap-y snap-mandatory scrollbar-hide sm:snap-none sm:grid sm:grid-cols-4 place-items-center sm:mt-[-15%] sm:h-[90%]`}>
                <Card url='/Assets/images/image1.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap='snap-center' />
                <Card url='/Assets/images/image1.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap='snap-center' />
                <Card url='/Assets/images/image1.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap='snap-center' />
                <Card url='/Assets/images/image1.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap='snap-center' />
                <Card url='/Assets/images/image1.JPG' title='Dream Job Finder' description='The project will help you to improve your app development skills. We provide designs and assets to develop the UI.' level={1} destination={"challenges/1"} snap='snap-center' />
                {width < 640 && (<MiniFooter />)}
            </section>

            {/*--------------- challenges container ends here ---------------*/}

            {width > 640 && (<Footer position='relative'/>)}

        </div>
    )
}

export default Challenges