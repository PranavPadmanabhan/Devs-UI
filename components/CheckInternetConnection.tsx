import React from 'react'
import { Detector} from 'react-detect-offline'

import { BsWifiOff } from 'react-icons/bs'

type props = {
    children:any
}

function CheckInternetConnection(props:props) {
  return (
    <>
        <Detector 
          render={({online}) => (
            online?props.children:(
                <div className='absolute left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center '>
                    <BsWifiOff size={80}/>
                    <h1>No Connection</h1>
                    <h3>please check your internet connection</h3>
                </div>
            )
          )}
        />
    </>
  )
}

export default CheckInternetConnection