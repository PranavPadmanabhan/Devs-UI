import Router from 'next/router';
import React, { useState } from 'react'
import { createorUpdateUserDoc } from '../services/Services';

type role = "developer" | "designer" | "both" | null;

function role() {

  const [role, setRole] = useState<role>(null)
  const replaceRoute = () => {
    Router.replace('/')
  }

  return (
    <div className='w-screen h-screen bg-portrait bg-cover bg-no-repeat bg-center flex items-center justify-center sm:bg-landscape sm:bg-cover sm:bg-no-repeat'>

      {/*-------------------------- roles container starts here -------------------*/}

      <div className="w-[60%] h-[70%] flex flex-col items-center justify-evenly sm:w-[80%] sm:h-[50%] sm:flex-row">

        {/*-------------- single role ---------------- */}

        <div onClick={() => {
          setRole("developer");
          createorUpdateUserDoc({updating:false,role:'developer'});
          replaceRoute();
          }} className={`w-[70%] h-[25%] cursor-pointer flex flex-col items-center justify-center rounded-[5%] sm:h-[60%] sm:w-[25%] sm:hover:translate-y-2 ${role === 'developer' ? 'border-[10px] border-[#343c71]' : 'border-[1px] border-gray-400'}`}>
          <img src="/Assets/icons/coding.png" alt="" className="w-[50%]" />
          <span className="text-[6vw] font-semibold mt-1 sm:text-[2vw]">Developer</span>
        </div>

        {/*-------------- single role ---------------- */}

        <div onClick={() => {
          setRole("designer");
          createorUpdateUserDoc({updating:false,role:'designer'});
          replaceRoute();
          }} className={`w-[70%] h-[25%] flex flex-col cursor-pointer items-center justify-center rounded-[5%] sm:h-[60%] sm:w-[25%] sm:hover:translate-y-2 ${role === 'designer' ? 'border-[10px] border-[#343c71]' : 'border-[1px] border-gray-400'}`}>
          <img src="/Assets/icons/graphic-designer.png" alt="" className="w-[50%]" />
          <span className="text-[6vw] font-semibold mt-1 sm:text-[2vw]">Designer</span>
        </div>

        {/*-------------- single role ---------------- */}

        <div onClick={() => {
          setRole("both");
          createorUpdateUserDoc({updating:false,role:'both'});
          replaceRoute();
          }} className={`w-[70%] h-[25%] flex flex-col cursor-pointer items-center justify-center rounded-[5%] sm:h-[60%] sm:w-[25%] sm:hover:translate-y-2 ${role === 'both' ? 'border-[10px] border-[#343c71]' : 'border-[1px] border-gray-400'}`}>
          <img src="/Assets/icons/ui-design.png" alt="" className="w-[50%]" />
          <span className="text-[6vw] font-semibold mt-1 sm:text-[2vw]">Both</span>
        </div>
        {/*-------------- single role ---------------- */}

      </div>

      {/*-------------------------- roles container starts here -------------------*/}

    </div>
  )
}

export default role