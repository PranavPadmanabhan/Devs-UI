import { createContext, useEffect, useState } from "react";
import { authContext, props } from "../constants/types";
import { LogOut, signIn,AuthState } from "../services/Services";
import { Detector } from 'react-detect-offline'


export const AuthContext = createContext<authContext>({} as authContext)



const AuthContextProvider = (props: props) => {

    const [user, setUser] = useState<any>({})
    const [online, setOnline] = useState<boolean>(true)
    useEffect(() => {
        if(online){
          AuthState(setUser);    
        }
    }, [])
            
    const value = { user }


    return (
        <AuthContext.Provider value={value}>
            {props.children}
            <Detector 
             render={() => null}
             onChange={(o) => setOnline(o)}
            />
        </AuthContext.Provider>
    )
}

export default AuthContextProvider