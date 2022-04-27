import { createContext, useEffect, useState } from "react";
import { authContext, props } from "../constants/types";
import { LogOut, signIn,AuthState } from "../services/Services";

export const AuthContext = createContext<authContext>({} as authContext)



const AuthContextProvider = (props: props) => {

    const [user, setUser] = useState<any>({})
     AuthState(setUser);    
        
    const value = { user }


    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider