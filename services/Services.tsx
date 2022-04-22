import { getAuth, GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import app from "../config/firebase";
import { createDocProps, User } from "../constants/types";
import { doc, getDoc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore'
import { writeStorage, deleteFromStorage } from '@rehooks/local-storage';



const githubProvider = new GithubAuthProvider();
export const authentication = getAuth(app);
let userData: User = {};
let currentUser: any;

export const signIn = async () => {
    return await signInWithPopup(authentication, githubProvider).then((res: any) => {
        createorUpdateUserDoc({ updating: false });
    }).catch((err) => console.log(err)
    )
}
export const LogOut = async () => {
    await signOut(authentication);
    userData = {};
    deleteFromStorage('uid');
};

export async function SearchUserData(uid?: string | null) {
    const snapshot = await getDoc(doc(getFirestore(), 'users', `${currentUser?.uid ?? uid}`));
    // console.log(snapshot.exists());
    if (snapshot.exists()) {
        userData = snapshot.data();
        // console.log(userData);
        writeStorage('uid', snapshot.data().uid);
    }

    // onSnapshot(doc(getFirestore(), 'users', `${currentUser?.uid??uid}`),(doc) => {
    //     if (doc.exists()) {
    //     userData = doc.data();
    //     // console.log(userData);
    //     setUser(userData)
    //     writeStorage('uid', doc.data().uid);
    // }
    // })

    return userData;
}

export const createorUpdateUserDoc = ({ updating, bio, dribble, facebook, github, instagram, linkedIn, name, twitter, website,photoURL, setloading,fetchUserData }: createDocProps) => {
    SearchUserData().then(() => {
        if (userData.name && !updating) {
            setDoc(doc(getFirestore(), 'users', `${currentUser?.uid}`), {
                name: userData.name,
                email: userData.email,
                photoURL: userData.photoURL,
                uid: userData.uid,
                followers: userData.followers,
                following: userData.following,
                contributions: userData.contributions,
                bio: userData.bio,
                twitter: userData.twitter,
                website: userData.website,
                github: userData.github,
                linkedIn: userData.linkedIn,
                instagram: userData.instagram,
                facebook: userData.facebook,
                dribble: userData.dribble,
            })
        } else if (userData && updating) {
            setloading(true)
            setDoc(doc(getFirestore(), 'users', `${currentUser?.uid}`), {
                name: name == '' ? userData.name : name,
                email: userData.email,
                photoURL: photoURL,
                uid: userData.uid,
                followers: userData.followers,
                following: userData.following,
                contributions: userData.contributions,
                bio: bio == '' ? userData.bio : bio,
                twitter: twitter == '' ? userData.twitter : twitter,
                website: website == '' ? userData.website : website,
                github: github == '' ? userData.github : github,
                linkedIn: linkedIn == '' ? userData.linkedIn : linkedIn,
                instagram: instagram == '' ? userData.instagram : instagram,
                facebook: facebook == '' ? userData.facebook : facebook,
                dribble: dribble == '' ? userData.dribble : dribble,
                
            }).then(() => {setloading(false); fetchUserData();});

        }

        else {
            if (!userData.name && !updating)

            setDoc(doc(getFirestore(), 'users', `${currentUser.uid}`), {
                name: currentUser.displayName,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                uid: currentUser.uid,
                followers: 0,
                following: 0,
                contributions: 0,
                bio: '',
                twitter: '',
                website: '',
                github: '',
                linkedIn: '',
                instagram: '',
                facebook: '',
                dribble: '',
            })
        }
    });

}

export const AuthState = (setUser: any) => {
    onAuthStateChanged(authentication, (user) => {
        if (user) {
            setUser(user);
            writeStorage('uid', user.uid);
            currentUser = user;
        }
        else {
            setUser(null)
        }
    })
}