import { createContext, useState } from "react";
import { authContext, props } from "../constants/types";
import auth, { getAuth, GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import app from "../config/firebase";

export const AuthContext = createContext<authContext>({} as authContext)
const githubProvider = new GithubAuthProvider();
const authentication = getAuth(app);



const AuthContextProvider = (props: props) => {

    const [user, setUser] = useState<any>();
    const Auth = getAuth(app);
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    onAuthStateChanged(authentication,(user) => {
        if(user){
            setUser(user);
            setLoggedIn(true);
            console.log(loggedIn);

        }
        else {
            setLoggedIn(false);
            setUser(null);
            console.log(loggedIn);

        }
    })

    const signIn = async () => {
        return await signInWithPopup(authentication, githubProvider).then((res: any) => {
            return res;
        }).catch((err) => console.log(err)
        )
    }
    const LogOut = async () => {
        await signOut(Auth);
        
    };
    const value = { signIn, LogOut, user, loggedIn }


    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider