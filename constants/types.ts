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
