import React, { useContext, useState } from 'react'
import Card from './Card'
import styles from '../styles/desktop.module.css'
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthContext';
import { SearchUserData } from '../services/Services';
import { Detector } from 'react-detect-offline'

function Carousel() {

    const [designs, setDesigns] = useState<Array<any>>([])
    const [currentUser, setcurrentUser] = useState<any>({})
    const { user } = useContext(AuthContext)
    const [online, setOnline] = useState<boolean>(true)



    if(online){
        const q = query(collection(getFirestore(), "Designs"),orderBy('createdAt','desc'));
        onSnapshot(q, (querySnapshot) => {
            setDesigns(querySnapshot.docs);
            // querySnapshot.forEach((doc) => {
            //     // setDesigns([...designs, doc.data()])
            // });

        });
    }

    const fetchUserData = async () => {
        if (user && online) {
            const userData = await SearchUserData(user?.uid)
            setcurrentUser(userData)
        }
        else {
            setcurrentUser({})
        }
    }


    return (
        <div className={`${styles.Carousel} flex w-[100vw] h-[72vh] items-center justify-start box-border overflow-x-scroll snap-x snap-mandatory px-[2%] scroll-px-4 scrollbar-hide sm:overflow-x-hidden sm:grid sm:grid-cols-4 sm:h-[80vh] sm:place-content-start sm:px-[5%] sm:gap-y-[50px] sm:pt-[3vh] sm:pb-[10vh]`}>
             {
                        designs.slice(0,4).map((item, index) => (
                            <Card key={index} images={item.data().images} title={item.data().name} description={item.data().description} level={item.data().levels} destination={``} snap={"snap-center"} uid={item.data().uid} userData={currentUser} fetchUserData={fetchUserData}/>
                        ))
             }
             <Detector 
              render={() => null}
              onChange={(o) => setOnline(o)}
             />
        </div>
    )
}

export default Carousel