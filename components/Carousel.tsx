import React, { useState } from 'react'
import Card from './Card'
import styles from '../styles/desktop.module.css'
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';

function Carousel() {

    const [designs, setDesigns] = useState<Array<any>>([])

    const images = [
        '/Assets/images/image1.JPG',
        '/Assets/images/image2.JPG',
        '/Assets/images/image3.JPG'
    ]

    const q = query(collection(getFirestore(), "Designs"));
    onSnapshot(q, (querySnapshot) => {
        setDesigns(querySnapshot.docs);
        // querySnapshot.forEach((doc) => {
        //     // setDesigns([...designs, doc.data()])
        // });

    });

    return (
        <div className={`${styles.Carousel} flex w-[100vw] h-[72vh] items-center justify-start box-border overflow-x-scroll snap-x snap-mandatory px-[2%] scroll-px-4 scrollbar-hide sm:overflow-x-hidden sm:grid sm:grid-cols-4 sm:h-[80vh] sm:place-content-start sm:px-[5%] sm:gap-y-[50px] sm:pt-[3vh] sm:pb-[10vh]`}>
             {
                        designs.slice(0,4).map((item, index) => (
                            <Card images={item.data().images} title={item.data().name} description={item.data().description} level={item.data().levels} destination={`challenges/${item.data().name}`} snap={"snap-none"} uid={item.data().uid} />
                        ))
             }
        </div>
    )
}

export default Carousel