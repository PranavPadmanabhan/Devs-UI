import { StorageReference } from "firebase/storage";
import { AppProps } from "next/dist/shared/lib/router/router";
import { type } from "os";
import React, { ReactElement } from "react";

export type backgroundImage = {
    portrait: string,
    landscape: string
}

export type themeMode = {
    backgroundImage: backgroundImage,
    textColor: string
}

export interface PreferredTheme {
    backgroundImage: backgroundImage,
    textColor: string
}

export type props = {
    children: React.ReactNode
}

export type theme = "light" | "dark";
export type themeContext = { theme: theme; toggleTheme: () => void, preferredTheme: themeMode };
export type authContext = { user: any };


export type drawerProps = {
    url: string,
    title: string,
    redAccent: boolean,
    onClick: () => void,
    upcoming: boolean
}

export interface Cardprops {
    images: Array<string>,
    title: string,
    description: string,
    level: number,
    destination: string,
    snap: 'snap-start' | 'snap-center' | 'snap-end' | 'snap-none',
    uid?:string,
    userData:any,
    fetchUserData?: () => Promise<void>,

}


export type designCards = {
    images:Array<string>,
    destination:string,
    profileURL:string,
    designName:string,
    lightenings?:number,
    comments?:Array<Object>,
    shares?:Array<any>,
    uid:any
}

export interface optionProps {
    selected: boolean,
    onClick: () => void,
    title: string,
    borderEnabled: boolean
}

export type buttonProps = {
    title: string,
}

export type providedItemProps = {
    title: string
}

export type socialMediaProps = {
    url: string,
    title: string | any
}

export type CurrentTab = "My Designs" | "Task In Progress" | "Task Completed";

export type checkBoxProps = {
    percentage: string,
    checked: boolean,
    onClick: () => void
}

export type check = string | null;

export type uploadType = {
    checked: boolean,
    onClick: () => void,
    title: string
}

export type toolsProps = {
    url: string,
    checked: boolean,
    onClick: () => void

}

export type ToolsUsed = 'Figma' | 'XD' | 'AE' | 'Illustrator' | 'Photoshop' | 'Sketch';

export type FooterProps = {
    position: 'absolute' | 'relative' | 'fixed' | 'sticky'
}

export type User = {
    name?: string,
    email?: string,
    photoURL?: string,
    uid?: string,
    following?: any,
    followers?: any,
    contributions?: string | number,
    bio?: string,
    website?: string,
    github?: string,
    twitter?: string,
    instagram?: string,
    linkedIn?: string,
    dribble?: string,
    facebook?: string,
    role?:'designer'| 'developer'|'both'|null
}

export type SignIn = {
    callback:() => void,
}

export type LogOutProps = {
    callback:() => void
}

export type createDocProps = {
    updating: boolean,
    name?: string,
    bio?: string,
    website?: string,
    github?: string,
    twitter?: string,
    instagram?: string,
    linkedIn?: string,
    dribble?: string,
    facebook?: string,
    setloading?: any,
    photoURL?: string,
    fetchUserData?: any,
    contributions?:number,
    followers?:any,
    following?:any,
    role?:'designer'| 'developer'|'both'|null,
    uid?:any

}

export type UploadData = {
    photoURL?: string,
    currentUser?: User,
    setloading?: any,
    fetchUserData?: () => Promise<void>,
    setuploading?: any,
    user?: any
}

export type UploadImage = {
    file: any,
    storageRef: StorageReference,
    setloading: React.Dispatch<React.SetStateAction<boolean>>,
    fetchUserData: () => Promise<void>,
    setuploading: React.Dispatch<React.SetStateAction<boolean>>,
    currentUser?: User,
    user?: any
}


export type Design = {
    name?: string,
    description?: string,
    images?: Array<string>,
    completed?: check,
    levels?: check,
    figmaFileURL?: string,
    sketchFileURL?: string,
    ImageAssetsURL?: string,
    isCompleted: boolean,
    toolsUsed?: Array<ToolsUsed> | undefined,
    lightenings?:any,
    comments?:Array<object>,
    shares?:Array<any>

}

export type UploadDesign = {

    designName?: string,
    description?: string,
    images?: Array<string | null>,
    completed?: check,
    levels?: check,
    figmaFileURL?: string,
    sketchFileURL?: string,
    ImageAssetsURL?: string,
    isCompleted: boolean,
    toolsUsed?: Array<ToolsUsed> | undefined,
    setloading: React.Dispatch<React.SetStateAction<boolean>>,
    userData:any,
    fetchUserData:any,
    user?: any,
    callback:() => void
}

export type UploadImages = {
    files: any,
    setloading: React.Dispatch<React.SetStateAction<boolean>>,
    fetchUserData?: () => Promise<void>,
    setuploading: React.Dispatch<React.SetStateAction<boolean>>,
    user?: any,
    design: Design,
    setprogress: React.Dispatch<React.SetStateAction<number>>,
}

export type UploadFiles = {
    file: any,
    setloading: React.Dispatch<React.SetStateAction<boolean>>,
    fetchUserData?: () => Promise<void>,
    setuploading: React.Dispatch<React.SetStateAction<boolean>>,
    setprogress: React.Dispatch<React.SetStateAction<number>>
    user?: any,
    design: Design,
    setDesignFileURL:React.Dispatch<React.SetStateAction<string>>,
}

export type HandleDesignFiles = {
    e: any,
    setloading: React.Dispatch<React.SetStateAction<boolean>>,
    setuploading: React.Dispatch<React.SetStateAction<boolean>>,
    setDesign: React.Dispatch<React.SetStateAction<Design>>,
    setprogress: React.Dispatch<React.SetStateAction<number>>,
    setFigmaFileURL:React.Dispatch<React.SetStateAction<any>>,
    setSketchFileURL:React.Dispatch<React.SetStateAction<any>>,
    setImageAssetURL:React.Dispatch<React.SetStateAction<any>>,
    item:string,
    design: Design,
    user: any
}

export type UploadFileManage = {
    item: string,
    setFigmaFileURL:React.Dispatch<React.SetStateAction<string>>,
    setSketchFileURL:React.Dispatch<React.SetStateAction<string>>,
    setImageAssetURL:React.Dispatch<React.SetStateAction<string>>,
    file: any,
    setloading: React.Dispatch<React.SetStateAction<boolean>>,
    setuploading: React.Dispatch<React.SetStateAction<boolean>>,
    setprogress: React.Dispatch<React.SetStateAction<number>>
    user?: any,
    design: Design,
}

export type Delete = {
    designName:string,
    user?: any,
    userData:any,
    images:string[],
    fetchUserData?: () => Promise<void>,

}

export type AddLight = {
    designName:string
}