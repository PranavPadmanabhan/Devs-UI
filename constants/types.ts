import { AppProps } from "next/dist/shared/lib/router/router";
import React, { ReactElement } from "react";

export type backgroundImage = {
    portrait:string,
    landscape:string
}

export type themeMode = {
    backgroundImage:backgroundImage,
    textColor:string
}

export interface PreferredTheme {
    backgroundImage:backgroundImage,
    textColor:string
}  

export type  props = {
    children:React.ReactNode
}

export type theme = "light" | "dark";
export type themeContext = { theme: theme; toggleTheme: () => void,preferredTheme:themeMode };

export type drawerProps = {
    url:string,
    title:string,
    redAccent:boolean,
    destination:string,
    upcoming:boolean
}

export interface Cardprops  {
    url:string,
    title:string,
    description:string,
    level:number,
    destination:string
}

export interface optionProps  {
    selected:boolean,
    onClick:() => void,
    title:string,
    borderEnabled:boolean
}

export type buttonProps = {
    title:string
}

export type providedItemProps = {
    title:string
}

export type socialMediaProps = {
    url:string,
    title:string
}

export type CurrentTab = "My Designs" | "Task In Progress" | "Task Completed"