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
export type authContext = { signIn: () => Promise<void>, LogOut: () => void; user: any };


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
    snap: 'snap-start' | 'snap-center' | 'snap-end' | 'snap-none'
}

export interface optionProps {
    selected: boolean,
    onClick: () => void,
    title: string,
    borderEnabled: boolean
}

export type buttonProps = {
    title: string
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
    following?: string | number,
    followers?: string | number,
    contributions?: string | number,
    bio?: string,
    website?: string,
    github?: string,
    twitter?: string,
    instagram?: string,
    linkedIn?: string,
    dribble?: string,
    facebook?: string,
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
    setloading?:any,
    photoURL?:string,
    fetchUserData?:any
}

