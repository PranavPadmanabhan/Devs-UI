import React, { useContext, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import NavBar from '../../components/NavBar'
import CheckBox from '../../components/CheckBox'
import { check, Design, ToolsUsed } from '../../constants/types'
import UploadContent from '../../components/UploadContent'
import DesignTools from '../../components/DesignTools'
import ItemsProvided from '../../components/ItemsProvided'
import Footer from '../../components/Footer'
import styles from '../../styles/desktop.module.css'
import { getStorage, ref } from 'firebase/storage'
import { AuthContext } from '../../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { addCompletedStatus, addFileType, addLevelCheckMark, addTool, createorUpdateUserDoc, handleDesignFiles, handleFiles, notify, SearchUserData, uploadDesign, uploadDesignFiles } from '../../services/Services'
import { useRouter } from 'next/router';

const UploadDesign: NextPage = () => {
  const [uploadedDetails, setUploadedDetails] = useState<Array<string>>([] as Array<string>);
  const [toolsUsed, setToolsUsed] = useState<Array<ToolsUsed>>([])
  const [design, setDesign] = useState<Design>({} as Design)
  const { user } = useContext(AuthContext);
  const [loading, setloading] = useState<boolean>(false)
  const [uploading, setuploading] = useState<boolean>(false);
  const [progress, setprogress] = useState(0);
  const [figmaFileURL, setFigmaFileURL] = useState<string>()
  const [sketchFileURL, setSketchFileURL] = useState<string>()
  const [ImageAssetsURL, setImageAssetURL] = useState<string>();
  const [userData, setuserData] = useState<any>({})
  const router = useRouter()

  const fetchUserData = async () => {
    if (user) {
        const response = await SearchUserData(user.uid);
        setuserData(response);
    }
}

    useEffect(() => {
      fetchUserData();
    },[])

    const callback = () => {
      router.replace(`/profile/${user?.uid}`)
    }


  const uploadTask = async() => {
    const { name, description, images, levels, completed } = design;
    if (!name || !description || !images || !levels || !completed || !toolsUsed || !ImageAssetsURL) notify('Fill every fields and try again');
    else {
      uploadDesign({ designName:name, description, images, levels, completed, figmaFileURL, sketchFileURL, ImageAssetsURL, toolsUsed, user, isCompleted: completed == "100%" ? true : false ,setloading,userData,fetchUserData,callback});
      setDesign({name:'',description:'',levels:null,images:[],figmaFileURL:'',ImageAssetsURL:'',sketchFileURL:'',toolsUsed:[],completed:null, isCompleted:false})
      
    }
  }

  return (
    <div className={`${styles.Container} w-screen h-screen flex flex-col items-center justify-start pt-[10vh] sm:items-start sm:box-border sm:pt-[10vh]`}>
      <Head>
        <title>DevsUI 🌩️ </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className={`${styles.MainContainer} w-[100%]  h-[100%] flex flex-col overflow-y-scroll scrollbar-hide `}>
        {
          loading || uploading ? (
            <div className='h-[80%] w-[100%] flex items-center justify-center text-[5vw] sm:text-[2vw] font-bold italic'>
              {uploading ? `Uploading..${progress}%` : 'loading...'}
            </div>
          ) : (
            <div className={`${styles.PageContent} w-[100%] flex flex-col box-border px-5 sm:px-[45px] lg:px-[55px]`}>
              <h1 className={`${styles.heading_UploadDesign} text-[8vw] mt-3 esm:text-[6.8vw] asm:text-[7vw] sm:text-[2vw] md:text-[3vw] lg:text-[2vw] xl:text-[2.2vw]`}>Upload Design</h1>
              <h1 className="text-[3vw] sm:text-[0.8vw] text-gray-500 -mb-2 mt-4 ml-3">* please fill the fields in the given order</h1>
              <input
                value={design.name}
                onChange={(e) => setDesign({ ...design, name: e.target.value })}
                type="text" placeholder='Name'
                className={`${styles.input_UploadDesign} w-[85%] h-[6%] min-h-[40px] focus:outline-none ${design.name ? 'bg-gray-200' : 'bg-[#EFEFEF]'} rounded-[10px] mt-5 my-3 px-5 sm:w-[30%] sm:max-w-[350px] md:w-[45%] md:max-w-[450px] xl:w-[45%] xl:max-w-[550px] xl:h-[8%] xl:min-h-[55px]`} />
              <input
                disabled={!design.name ? true : false}
                value={design.description}
                onChange={(e) => {
                  if (!design.name) notify('Enter the name first!');
                  else setDesign({ ...design, description: e.target.value });
                }}
                type="text"
                placeholder='Description'
                className={`${styles.input_uploadDesign_bio} w-[85%] h-[15%] focus:outline-none min-h-[80px] ${design.name ? 'bg-gray-200' : 'bg-[#EFEFEF]'} rounded-[10px] my-3 px-5 sm:w-[30%] sm:max-w-[350px] sm:min-h-[120px] md:w-[45%] md:max-w-[450px] xl:max-w-[550px] xl:min-h-[150px]`} />
              <div className={`w-[100%] h-[10%] flex flex-col my-1 esm:my-2 xl:my-4`}>
                <span className={`${styles.UploadDesignText} text-gray-500 text-[4vw] sm:text-[1vw] sm:font-bold md:text-[2.4vw] lg:text-[1.5vw] lg:font-light xl:text-[1.7vw]`}>Upload designs in PNG or JPG format</span>
                <div className={`${styles.UploadFileBtnContainer} flex items-center justify-start mt-2 w-[100%] h-[100%] esm:mt-5`}>
                  <button
                    onClick={() => {
                      if (!design.name || !design.description) notify('fill the above fields')
                      else return
                    }}
                    className={`${styles.UploadImageFile} relative w-[35%] h-[85%] min-h-[35px] min-w-[120px] focus:outline-none rounded-[10px] flex items-center justify-center ${(!design.name || !design.description) ? 'bg-gray-200' : 'bg-[#323c71]'} ${(!design.name || !design.description) ? 'text-gray-500' : 'text-white'}  text-[4vw] esm:text-[3.4vw] asm:text-[3vw] msm:text-[2.5vw] sm:text-[0.8vw] md:text-[1.8vw] md:w-[20%] md:h-[85%] md:min-h-[35px] md:min-w-[80px] lg:text-[1.3vw] lg:w-[12%] lg:h-[85%] lg:min-h-[35px] lg:min-w-[80px] xl:min-h-[45px]`}>
                    <input
                      disabled={(!design.name || !design.description) ? true : false}
                      multiple
                      accept='image/*'
                      className='z-[100] cursor-pointer absolute opacity-0'
                      type={'file'}
                      onChange={(e) => handleFiles(e, setloading, setuploading, setDesign, design, user, setprogress)} />
                    Upload File
                  </button>
                </div>
              </div>
              <div className={`${styles.CompleteStatusContainer} w-[100%] h-[20%] flex  items-start  mt-5 sm:w-[30%] esm:mt-[35px] esm:w-[90%] asm:w-[80%] msm:w-[75%] md:w-[50%] lg:w-[40%]`}>
                <span className="font-semibold text-gray-500 esm:text-[3.4vw] asm:text-[3vw] msm:text-[2.5vw] sm:text-[0.8vw] md:text-[2.5vw] lg:text-[1.5vw] xl:text-[1.6vw]">Completed:</span>
                <CheckBox percentage={'25%'} checked={design.completed === '25%' ? true : false} onClick={() => addCompletedStatus('25%', design, setDesign, setToolsUsed)} />
                <CheckBox percentage={'50%'} checked={design.completed === '50%' ? true : false} onClick={() => addCompletedStatus('50%', design, setDesign, setToolsUsed)} />
                <CheckBox percentage={'75%'} checked={design.completed === '75%' ? true : false} onClick={() => addCompletedStatus('75%', design, setDesign, setToolsUsed)} />
                <CheckBox percentage={'100%'} checked={design.completed === '100%' ? true : false} onClick={() => addCompletedStatus('100%', design, setDesign, setToolsUsed)} />
              </div>
              {
                design.completed && (
                  <div className="w-[100%] h-auto  flex flex-col my-2 esm:my-2">
                    <UploadContent title='Figma file access' checked={uploadedDetails.includes('Figma file') ? true : false} onClick={() => addFileType('Figma file', setUploadedDetails, uploadedDetails)} />
                    <UploadContent title='Sketch file access' checked={uploadedDetails.includes('Sketch file') ? true : false} onClick={() => addFileType('Sketch file', setUploadedDetails, uploadedDetails)} />
                    <UploadContent title='Optimized image assets' checked={uploadedDetails.includes('Image Assets') ? true : false} onClick={() => addFileType('Image Assets', setUploadedDetails, uploadedDetails)} />
                  </div>
                )
              }
              <div className="w-[100%] h-auto flex flex-col ">
                {
                  uploadedDetails.map((item, index) => (
                    <div key={index} className="w-[100%] h-[50%] flex flex-col my-2 cursor-pointer">
                      <span className={`${styles.UploadFileText} text-gray-500 text-[7vw] sm:text-[1.4vw] esm:text-[5vw] asm:text-[4.4vw] msm:text-[4vw] md:text-[2.5vw] lg:text-[1.6vw] xl:text-[1.7vw]`}>Upload {item}</span>
                      <div className="w-[100%] h-[70%] flex mt-3">
                        <button
                          className={`${styles.UploadFileBtn} relative w-[35%] h-[85%] min-h-[35px] min-w-[120px] focus:outline-none rounded-[10px] flex items-center justify-center bg-[#323c71] text-white text-[4vw] esm:text-[3.4vw] asm:text-[3vw] msm:text-[2.5vw] sm:text-[0.8vw] md:text-[1.4vw] sm:w-[10%] lg:w-[12%] lg:text-[0.9vw] xl:min-h-[45px] xl:text-[1.3vw] xl:w-[15%]`}>
                          <input
                            disabled={(!design.name || !design.description) ? true : false}
                            accept='.zip'
                            className='z-[100] cursor-pointer absolute opacity-0'
                            type={'file'}
                            onChange={(e) => handleDesignFiles({ e, setloading, setuploading, setDesign, setprogress, design, user, item, setFigmaFileURL, setImageAssetURL, setSketchFileURL })}
                          />
                          Upload {item}
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="w-[100%] h-[20%] flex  items-start  mt-5  my-0 sm:w-[30%] sm:my-5 esm:w-[90%] asm:w-[80%] msm:w-[75%] md:w-[50%] lg:w-[40%]">
                <span className="font-semibold text-gray-500 text-[4vw] esm:text-[3.4vw] asm:text-[3vw] msm:text-[2.5vw] sm:text-[2.4vw] lg:text-[1.5vw] xl:text-[1.6vw]">Levels:</span>
                <CheckBox percentage={'1'} checked={design.levels === '1' ? true : false} onClick={() => addLevelCheckMark('1', setDesign, design, setToolsUsed)} />
                <CheckBox percentage={'2'} checked={design.levels === '2' ? true : false} onClick={() => addLevelCheckMark('2', setDesign, design, setToolsUsed)} />
                <CheckBox percentage={'3'} checked={design.levels === '3' ? true : false} onClick={() => addLevelCheckMark('3', setDesign, design, setToolsUsed)} />
                <CheckBox percentage={'4'} checked={design.levels === '4' ? true : false} onClick={() => addLevelCheckMark('4', setDesign, design, setToolsUsed)} />
              </div>
              <div className="w-[100%] h-[10%] flex flex-col  sm:w-[50%] md:w-[80%]">
                <span className="text-gray-500 font-semibold my-2 text-[4vw] esm:text-[3.4vw] asm:text-[3vw] msm:text-[2.5vw] sm:text-[2.4vw] lg:text-[1.5vw] xl:text-[1.6vw]">Tools Used</span>
                <div className=" w-[100%] h-[90%] flex items-center">
                  <DesignTools url='/Assets/icons/figma.png' checked={toolsUsed.includes('Figma') ? true : false} onClick={() => addTool('Figma', design, toolsUsed, setToolsUsed, setDesign)} />
                  <DesignTools url='/Assets/icons/xd.png' checked={toolsUsed.includes('XD') ? true : false} onClick={() => addTool('XD', design, toolsUsed, setToolsUsed, setDesign)} />
                  <DesignTools url='/Assets/icons/after-effects.png' checked={toolsUsed.includes('AE') ? true : false} onClick={() => addTool('AE', design, toolsUsed, setToolsUsed, setDesign)} />
                  <DesignTools url='/Assets/icons/illustrator.png' checked={toolsUsed.includes('Illustrator') ? true : false} onClick={() => addTool('Illustrator', design, toolsUsed, setToolsUsed, setDesign)} />
                  <DesignTools url='/Assets/icons/photoshop.png' checked={toolsUsed.includes('Photoshop') ? true : false} onClick={() => addTool('Photoshop', design, toolsUsed, setToolsUsed, setDesign)} />
                  <DesignTools url='/Assets/icons/sketch.png' checked={toolsUsed.includes('Sketch') ? true : false} onClick={() => addTool('Sketch', design, toolsUsed, setToolsUsed, setDesign)} />
                </div>
              </div>
              <button onClick={uploadTask} className={`${styles.UploadDesignPageBtn} min-w-[60px] max-w-[150px] min-h-[35px] bg-[#323c71] max-h-[45px] rounded-[10px] text-white flex items-center justify-center focus:outline-none mt-8 mb-4 text-[4vw] esm:text-[3.4vw] asm:text-[3vw] msm:text-[2.5vw] sm:text-[0.8vw] esm:my-[50px] md:text-[80%] md:mt-[65px] md:mb-[45px] lg:mt-[85px] lg:mb-[65px]`}>Upload Design</button>
            </div>
          )
        }
        <Footer position='relative' />
      </div>
      <Toaster />
    </div>
  )
}

export default UploadDesign