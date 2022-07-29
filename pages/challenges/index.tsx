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
import { collection, getFirestore, onSnapshot, orderBy, query,  } from 'firebase/firestore'
import Link from 'next/link'
import { AuthContext } from '../../contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import { notify, SearchUserData } from '../../services/Services'
import { Detector } from 'react-detect-offline'
import CheckInternetConnection from '../../components/CheckInternetConnection'
import { AiOutlineCheck } from 'react-icons/ai'
import { SortOptions } from '../../constants/types'
import Loader from '../../components/Loader'



const Challenges: NextPage = () => {
    const [width, setWidth] = useState(0);
    const { user } = useContext(AuthContext)
    const [filter, setFilter] = useState<Array<any>>([] as Array<any>)
    const [filterOptions, setFilterOptions] = useState([1, 2, 3, 4])
    const [sort, setSort] = useState<SortOptions>(null)
    const [sortingDrawerVisiblity, setSortingDrawerVisiblity] = useState<boolean>(false)
    const [filterDrawerVisiblity, setFilterDrawerVisibility] = useState<boolean>(false);
    const [designs, setDesigns] = useState<Array<any>>([]);
    const [currentUser, setcurrentUser] = useState<any>({})
    const [online, setonline] = useState<boolean>(true)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [filteredArray, setFilteredArray] = useState<Array<any>>([])
    const [sortedArray, setSortedArray] = useState<Array<any>>([])
    const [searchResult, setSearchResult] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(false)
    

      
    useEffect(() => {
        if(online){
            const q = query(collection(getFirestore(), "Designs"),orderBy('createdAt','desc'));
        onSnapshot(q, (querySnapshot) => {
            setDesigns(querySnapshot.docs);
            // querySnapshot.forEach((doc) => {
            //     // setDesigns([...designs, doc.data()])
            // });
         });
        }
    }, [])
    
   

    const fetchUserData = async () => {
        if (user && online) {
            const userData = await SearchUserData(user?.uid)
            setcurrentUser(userData)
        }
        else {
            setcurrentUser({})
        }
    }


    useEffect(() => {
        if (typeof (window) !== undefined) {
            setWidth(window.innerWidth);
        }
       if(sort == 'Easier First') setSortedArray(designs.filter(item => item.data().levels <= 2))
       else if(sort == 'Harder First') setSortedArray(designs.filter(item => item.data().levels > 2))
       else if(searchKeyword) setSearchResult(designs.filter(item => item.data().name.toLowerCase().includes(searchKeyword.toLowerCase())))
       return () => {
          setSortedArray([]);
          setSearchResult([])
       }
    }, [ sort, searchKeyword ])

  
    

    const addFilter = (item: number, index: number,) => {
        setFilterDrawerVisibility(false)
        if (filter.includes(item)) {
            setFilter(filter.filter((f) => f !== item))
            setSort(null)
            setFilteredArray(filteredArray.filter(des => des.data().levels !== item.toString()))
        }
        else {
            setFilter([...filter, item])
            setSort(null)
            designs.map((des) => {
                if(des.data().levels === item.toString()){
                    setFilteredArray([...filteredArray,des])
                }
            })
        }
    }
   
   const addSorting = (sortOption:SortOptions) => {
        setFilterDrawerVisibility(false)
       if(sort === sortOption) setSort(null);
       else setSort(sortOption)
   }

    const uploadLinkClick = () => {
        if (!user) notify('Please login and try again');
        else return;
    }


    const RenderChallenges = () => {
        if(filter.length){
            return (
                <section className={`grid grid-cols-1 gap-y-[5vh] place-items-center snap-center py-[3vh] scrollbar-hide bg-white overflow-y-scroll snap-y snap-mandatory w-[100%] min-h-[70vh] sm:overflow-x-hidden  ${filteredArray.length?'sm:grid sm:grid-cols-2 lg:grid-cols-4  sm:place-items-center sm:place-content-start':'sm:flex sm:items-center sm:justify-center'} sm:min-h-[90vh]`}>
                    {
                       
                        filteredArray.map((item, index) => (
                            <Card key={index} images={item.data().images} title={item.data().name} description={item.data().description} level={item.data().levels} destination={item.data().name} snap={width < 640 ? 'snap-center' : "snap-none"} uid={item.data().uid} userData={currentUser} fetchUserData={fetchUserData} />
                        ))
                       
                    }
                    {
                        !filteredArray.length && (
                            <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
                                <h1 className='text-black font-bold'>No Designs Found</h1>
                            </div>
                        )
                    }
                    
                
                </section>
            )
        }
        else if(sort !== null){
            return (
                <section className={`grid grid-cols-1 gap-y-[5vh] place-items-center snap-center py-[3vh] scrollbar-hide bg-white overflow-y-scroll snap-y snap-mandatory w-[100%] min-h-[70vh] sm:overflow-x-hidden  ${sortedArray.length?'sm:grid sm:grid-cols-2 lg:grid-cols-4  sm:place-items-center sm:place-content-start':'sm:flex sm:items-center sm:justify-center'} sm:min-h-[90vh]`}>
                    {
                    
                        sortedArray.map((item, index) => (
                            <Card key={index} images={item.data().images} title={item.data().name} description={item.data().description} level={item.data().levels} destination={item.data().name} snap={width < 640 ? 'snap-center' : "snap-none"} uid={item.data().uid} userData={currentUser} fetchUserData={fetchUserData} />
                        ))
                    
                    }
                    {
                        !sortedArray.length && (
                            <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
                                <h1 className='text-black font-bold'>No Designs Found</h1>
                            </div>
                        )
                    }
                
                </section>
            )
        }
        else if(searchKeyword){
            return(
                <section className={`grid grid-cols-1 gap-y-[5vh] place-items-center snap-center py-[3vh] scrollbar-hide bg-white overflow-y-scroll snap-y snap-mandatory w-[100%] min-h-[70vh] sm:overflow-x-hidden  ${searchResult.length?'sm:grid sm:grid-cols-2 lg:grid-cols-4  sm:place-items-center sm:place-content-start':'sm:flex sm:items-center sm:justify-center'} sm:min-h-[90vh]`}>
                    {
                    
                        searchResult.map((item, index) => (
                            <Card key={index} images={item.data().images} title={item.data().name} description={item.data().description} level={item.data().levels} destination={item.data().name} snap={width < 640 ? 'snap-center' : "snap-none"} uid={item.data().uid} userData={currentUser} fetchUserData={fetchUserData} />
                        ))
                    
                    }
                    {
                        !searchResult.length && (
                            <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
                                <h1 className='text-black font-bold'>No Results Found</h1>
                            </div>
                        )
                    }
                    
                
                </section>
            )
        }
        else if(loading){
            return(
                <section className={`w-[100%] h-[100%] flex flex-col items-center justify-center`}>
                    <Loader />
                </section>
            )
        }
        else {
            return(
                <section className={`grid grid-cols-1 gap-y-[5vh] place-items-center snap-center py-[3vh] scrollbar-hide bg-white overflow-y-scroll snap-y snap-mandatory w-[100%] min-h-[70vh] sm:overflow-x-hidden  ${designs.length?'sm:grid sm:grid-cols-2 lg:grid-cols-4  sm:place-items-center sm:place-content-start':'sm:flex sm:items-center sm:justify-center'} sm:min-h-[90vh]`}>
                    {
                    
                        designs.map((item, index) => (
                            <Card key={index} images={item.data().images} title={item.data().name} description={item.data().description} level={item.data().levels} destination={item.data().name} snap={width < 640 ? 'snap-center' : "snap-none"} uid={item.data().uid} userData={currentUser} fetchUserData={fetchUserData} />
                        ))
                    
                    }
                  {
                  designs.length !== 0 ? null : 
                    (
                       <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
                        <Link href={user ? '/uploadDesign' : '/challenges'}>
                            <h1 onClick={uploadLinkClick} className='self-center cursor-pointer border-b-[1px] border-black mt-[35vh] snap-center'>Upload a challenge</h1>
                        </Link>
                       </div>  
                    )}

                
                </section>
            )
        }
    }


    return (
        <CheckInternetConnection>
        <div className='w-screen h-screen box-border flex flex-col pt-[9vh] overflow-hidden'>
            <Head>
                <title>Challenges 🌩️ </title>
                <meta name="description" content="designs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <h1 className="self-start ml-2 block text-[7vw] text-black font-bold sm:hidden">Challenges</h1>


            {/*--------------- second header with search options starts here ---------------*/}


            <div className={`${styles.SmallHeader}   flex items-center justify-between w-[100%] h-[10vh] sm:px-[3%] border-b-[1px] border-gray-400 sm:mb-5`}>
                <div className="flex w-[60%] min-h-[45px] h-[70%] items-center justify-evenly px-[3%] sm:px-2 ml-2 bg-[#e5e7eb] rounded-[10px] border-[1px] border-gray-300">
                    <input onChange={(e) => setSearchKeyword(e.target.value)} type="text" placeholder='search challenge..' className=" w-[90%] h-[100%] placeholder:text-[1rem] focus:outline-none focus:group-mt-[-10px] bg-[#e5e7eb] " />
                    <img src="/Assets/lightmode/magnifying-glass.png" alt="" className="h-[45%]" />
                </div>
                <div className="flex items-center justify-evenly w-[40%] h-[100%] ">
                    <div onClick={() => {
                        setSortingDrawerVisiblity(!sortingDrawerVisiblity);
                        setFilterDrawerVisibility(false)
                    }} className="relative group w-[40%] h-[70%] min-h-[45px] flex flex-col items-center justify-center rounded-[10px] bg-[#e5e7eb] border-[1px] border-gray-300 cursor-pointer">
                        <h1 className="hidden sm:flex">sort by</h1>
                        <FaSort color='black' size={25} className='block sm:hidden lg:hidden' />
                        <div className="fixed z-[100] hidden sm:hidden sm:group-hover:flex sm:flex-col top-[18%] w-[15%] min-h-[10%] bg-[#e5e7eb] sm:border-[1px] border-gray-300 sm:rounded-[10px] sm:overflow-hidden">
                                <div onClick={() => addSorting('Easier First')} className="w-[100%] h-[45px] flex items-center justify-between px-3 border-b-[1px] border-b-gray-300">
                                    <span className="">Easier First</span>
                                    { sort === 'Easier First' &&(<AiOutlineCheck size={24} color="green" />)}
                                </div>
                                <div  onClick={() => addSorting('Harder First')} className="w-[100%] h-[45px] flex items-center justify-between px-3 border-b-[1px] border-b-gray-300">
                                    <span className="">Harder First</span>
                                    { sort === 'Harder First' &&(<AiOutlineCheck size={24} color="green" />)}
                                </div>
                        </div>
                        {
                            sortingDrawerVisiblity && (
                                <div className="fixed z-[100]  flex flex-col top-[25%] w-[45%] min-h-[10%] bg-[#e5e7eb] border-[1px] border-gray-300 rounded-[10px] overflow-hidden">
                                <div onClick={() => addSorting('Easier First')} className="w-[100%] h-[45px] flex items-center justify-between px-3 border-b-[1px] border-b-gray-300">
                                    <span className="">Easier First</span>
                                    { sort === 'Easier First' &&(<AiOutlineCheck size={24} color="green" />)}
                                </div>
                                <div  onClick={() => addSorting('Harder First')} className="w-[100%] h-[45px] flex items-center justify-between px-3 border-b-[1px] border-b-gray-300">
                                    <span className="">Harder First</span>
                                    { sort === 'Harder First' &&(<AiOutlineCheck size={24} color="green" />)}
                                </div>
                        </div>
                            )
                        }
                    </div>
                    <div onClick={() => {
                        setFilterDrawerVisibility(!filterDrawerVisiblity);
                        setSortingDrawerVisiblity(false);
                        }} className="relative group w-[40%] h-[70%] min-h-[45px] flex flex-col items-center justify-center rounded-[10px]  bg-[#e5e7eb] border-[1px] border-gray-300 cursor-pointer">
                        <h1 className="hidden sm:flex">Filter by</h1>
                        <FaFilter color='black' size={25} className='block sm:hidden lg:hidden' />
                        <div className="fixed z-[100] hidden sm:hidden sm:group-hover:flex sm:flex-col w-[15%] h-auto min-h-[10%] top-[18%] bg-[#e5e7eb] sm:border-[1px] border-gray-300 sm:rounded-[10px] sm:overflow-hidden">
                            {
                                filterOptions.map((item,index) => (
                                <div key={index} onClick={() => addFilter(item,index)} className="w-[100%] h-[45px] flex items-center justify-between px-3 border-b-[1px] border-b-gray-300">
                                    <span className="">Level {item}</span>
                                    { filter.includes(item) &&(<AiOutlineCheck size={24} color="green" />)}
                                </div>
                                ))
                            }
                        </div>
                        {
                            filterDrawerVisiblity && (
                                <div className="fixed z-[100] flex flex-col w-[45%] h-auto min-h-[10%] top-[25%] right-[2%] bg-[#e5e7eb] border-[1px] border-gray-300 rounded-[10px] overflow-hidden">
                                    {
                                        filterOptions.map((item,index) => (
                                        <div key={index} onClick={() => addFilter(item,index)} className="w-[100%] h-[45px] flex items-center justify-between px-3 border-b-[1px] border-b-gray-300">
                                            <span className="">Level {item}</span>
                                            { filter.includes(item) &&(<AiOutlineCheck size={24} color="green" />)}
                                        </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/*--------------- second header with search options starts here ---------------*/}

            {/*--------------- challenges container starts here ---------------*/}
            <div className="flex flex-col w-[100%] h-auto overflow-x-hidden overflow-y-auto snap-y snap-mandatory scrollbar-hide">
                    <RenderChallenges />
                <Footer position='relative' />
                <Toaster />
            </div>
            <Detector 
            render={() => null}
              onChange={(o) => setonline(o) }
            />

            {/*--------------- challenges container ends here ---------------*/}
        </div>
        </CheckInternetConnection>
    )
}

export default Challenges