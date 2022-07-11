import { getAuth, GithubAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../config/firebase";
import { check, createDocProps, Delete, Design, HandleDesignFiles, LogOutProps, SignIn, ToolsUsed, UploadData, UploadDesign, UploadFileManage, UploadFiles, UploadImage, UploadImages, User } from "../constants/types";
import { deleteDoc, doc, getDoc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore'
import { writeStorage, deleteFromStorage } from '@rehooks/local-storage';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import toast from "react-hot-toast";
import firebase from 'firebase/firestore'


const githubProvider = new GithubAuthProvider();
export const authentication = getAuth(app);
let userData: User = {};
let currentUser: any;

export const signIn = async ({ callback }: SignIn) => {
    return await signInWithPopup(authentication, githubProvider).then(async (res: any) => {
        // createorUpdateUserDoc({ updating: false });
        const data = await SearchUserData(res.user.uid);

        if (!data.role) {
            callback();
        }
        else return;
    }).catch((err) => console.log(err)
    )
}
export const LogOut = async ({ callback }: LogOutProps) => {
    await signOut(authentication).then(() => callback());
    userData = {};
    deleteFromStorage('uid');
};

export const fetchData = async (user: any, setuserData: React.Dispatch<React.SetStateAction<{}>>) => {
    const userData = await SearchUserData(user?.uid);
    setuserData(userData);
}


export async function SearchUserData(uid?: string | null) {
    const snapshot = await getDoc(doc(getFirestore(), 'users', `${uid}`));
    if (snapshot.exists()) {
        userData = snapshot.data();
        writeStorage('uid', snapshot.data().uid);
    }
    return userData;
}

export const createorUpdateUserDoc = ({ updating, bio, dribble, facebook, github, instagram, linkedIn, name, twitter, website, photoURL, setloading, fetchUserData, contributions, followers, following, role, uid }: createDocProps) => {
    SearchUserData().then(() => {
        if (userData.name && !updating) {
            setDoc(doc(getFirestore(), 'users', `${currentUser?.uid}`), {
                name: userData.name,
                email: userData.email,
                photoURL: userData.photoURL,
                uid: userData.uid,
                role: role ?? userData.role,
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
            }).then(() => toast.success('Done')).catch((err) => notify("something went wrong"))
        } else if (userData && updating) {
            setDoc(doc(getFirestore(), 'users', `${uid??currentUser?.uid}`), {
                name: name == '' ? userData.name : name,
                email: userData.email,
                photoURL: photoURL,
                uid: userData.uid,
                role: userData.role,
                followers: followers ?? userData.followers,
                following: following ?? userData.following,
                contributions: contributions ?? userData.contributions,
                bio: bio,
                twitter: twitter,
                website: website,
                github: github,
                linkedIn: linkedIn,
                instagram: instagram,
                facebook: facebook,
                dribble: dribble,

            }).then(() => { updateProfile(currentUser, { displayName: userData.name }); fetchUserData();  }).catch((err) => notify(err.message));

        }

        else {
            if (!userData.name && !updating)
                setDoc(doc(getFirestore(), 'users', `${currentUser.uid}`), {
                    name: currentUser.displayName??currentUser.email,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    uid: currentUser.uid,
                    followers: [],
                    following: [],
                    contributions: 0,
                    bio: '',
                    twitter: '',
                    website: '',
                    github: '',
                    linkedIn: '',
                    instagram: '',
                    facebook: '',
                    dribble: '',
                    role: role
                }).then(() => toast.success('Done')).catch((err) => notify("something went wrong"));
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

export const uploadImage = ({ fetchUserData, file, setloading, setuploading, storageRef, currentUser, user }: UploadImage) => {
    setuploading(true);
    setloading(true)
    if (!file) return;
    uploadBytesResumable(storageRef, file).then((snapshot) => {
        // console.log(snapshot);
    }).then(() => {
        getDownloadURL(storageRef).then(async (res) => {
            uploadData({ photoURL: res, currentUser: currentUser, fetchUserData, setloading, setuploading, user });
            fetchUserData();
            setloading(false)
            setuploading(false)
            updateProfile(user, { photoURL: res })
        }).then(() => toast.success('Done')).catch((err) => notify("something went wrong"));
    });
}

export const uploadData = ({ currentUser, fetchUserData, photoURL, setloading, setuploading, user }: UploadData) => {
    setuploading(true)
    if (!photoURL) {
        const state = createorUpdateUserDoc({
            updating: true,
            bio: currentUser?.bio ?? '',
            dribble: currentUser?.dribble ?? '',
            facebook: currentUser?.facebook ?? '',
            github: currentUser?.github ?? '',
            linkedIn: currentUser?.linkedIn ?? '',
            name: currentUser?.name ?? user?.displayName,
            twitter: currentUser?.twitter ?? '',
            website: currentUser?.website ?? "",
            instagram: currentUser?.instagram ?? '',
            photoURL: user?.photoURL ?? currentUser?.photoURL,
            setloading: setloading,
            fetchUserData: fetchUserData
        });
    }
    else {
        const state = createorUpdateUserDoc({
            updating: true,
            bio: currentUser?.bio ?? '',
            dribble: currentUser?.dribble ?? '',
            facebook: currentUser?.facebook ?? '',
            github: currentUser?.github ?? '',
            linkedIn: currentUser?.linkedIn ?? '',
            name: currentUser?.name ?? user.displayName,
            twitter: currentUser?.twitter ?? '',
            website: currentUser?.website ?? "",
            instagram: currentUser?.instagram ?? '',
            photoURL: photoURL ?? currentUser?.photoURL,
            setloading: setloading,
            fetchUserData: fetchUserData
        });
        console.log(currentUser?.github);
        
    }
    setloading(false)
}

export const uploadDesign = ({ designName, description, completed, images, levels, figmaFileURL, sketchFileURL, ImageAssetsURL, toolsUsed, isCompleted, user, setloading, userData, fetchUserData, callback }: UploadDesign) => {
    setloading(true)
    const { bio, dribble, facebook, github, instagram, linkedIn, name, twitter, website, photoURL, followers, following, contributions } = userData;
    const contribution = contributions + 1;
    setDoc(doc(getFirestore(), `Designs/${designName}`), {
        name: designName,
        description,
        completed,
        levels,
        images,
        figmaFileURL: figmaFileURL ?? null,
        sketchFileURL: sketchFileURL ?? null,
        ImageAssetsURL: ImageAssetsURL,
        toolsUsed,
        isCompleted,
        lightenings: 0,
        comments: [],
        shares: [],
        uid: user.uid,
        authorName: user.displayName,
        userPhotoURL: user.photoURL,
        createdAt: Date.now()
    }).then(() => {
        setloading(false);
        toast.success('Done')
        callback()
        createorUpdateUserDoc({ updating: true, bio, dribble, facebook, github, instagram, linkedIn, name, photoURL: user.photoURL, setloading, twitter, website, contributions: contribution, followers, following, fetchUserData })
    })
};

export const uploadDesignImages = ({ files, fetchUserData, setloading, setuploading, user, design, setprogress }: UploadImages) => {
    let urls: Array<string> = [];
    const storage = getStorage();
    for (let index = 0; index < files.length; index++) {
        setuploading(true)
        const storageRef = ref(storage, `Designs/${user.uid}/${design.name}/${design.name}-${index+1}`);
        const task = uploadBytesResumable(storageRef, files[index]);
        task.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setprogress(progress);
            },
            (error) => {
                alert(error);
                setuploading(false)
            },
            () => {
                setuploading(false)
                getDownloadURL(storageRef).then(async (res) => {
                    console.log(res);
                    urls.push(res)
                    toast.success('uploading complete')
                });
                return urls;
            }
        );

    }


    return urls;
}

export const uploadDesignFiles = ({ file, setloading, setuploading, user, design, setprogress, setDesignFileURL }: UploadFiles) => {
    const storage = getStorage();
    setuploading(true);

    const storageRef = ref(storage, `Designs/${user.uid}/${design.name}/${design.name}`);
    const task = uploadBytesResumable(storageRef, file);
    task.on("state_changed",
        (snapshot) => {
            const progress =
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setprogress(progress);

        },
        (error) => {
            alert(error);
            setuploading(false);
        },
        () => {
            setuploading(false)

            getDownloadURL(storageRef).then(async (res) => {
                console.log(res);
                toast.success('uploading complete')
                setDesignFileURL(res);
            })
        }
    );



}

export const deleteDesign = ({ designName, user, userData, images, fetchUserData }:Delete) => {
    const storageRef = ref(getStorage(), `Designs/${user.uid}/${designName}/${designName}`);
    const { bio, dribble, facebook, github, instagram, linkedIn, name, twitter, website, photoURL, followers, following, contributions } = userData;
    const contribution = contributions - 1;
    console.log(contribution)
    createorUpdateUserDoc({ updating: true, bio, dribble, facebook, github, instagram, linkedIn, name, photoURL: user.photoURL, twitter, website, contributions: contribution, followers, following, fetchUserData })
    deleteDoc(doc(getFirestore(),`Designs/${designName}`)).then(() => {
        toast.success("Deleted");
        // console.log(contribution);
        
        deleteObject(storageRef);
        images.map((items,index) => {
            const reference = ref(getStorage(), `Designs/${user.uid}/${designName}/${designName}-${index+1}`);
            deleteObject(reference);
         
        })

    })
}

export const notify = (msg: string) => toast.error(msg, {
    duration: 3000,
    position: 'bottom-right',
});


export const handleFiles = (e: any, setloading: React.Dispatch<React.SetStateAction<boolean>>, setuploading: React.Dispatch<React.SetStateAction<boolean>>, setDesign: React.Dispatch<React.SetStateAction<Design>>, design: Design, user: any, setprogress: React.Dispatch<React.SetStateAction<number>>) => {
    let images = e.target.files;
    if (!images) return;
    else if (images.length < 2) {
        images = null;
        notify("Select Minimum two images");

    }
    else {
        // console.log(images[0].type.slice(6, 10));
        const response = uploadDesignImages({ files: images, setloading, setuploading, design, user, setprogress });
        setDesign({ ...design, images: response });
        images = null;
    }

}

export const addCompletedStatus = (current: check, design: Design, setDesign: React.Dispatch<React.SetStateAction<Design>>, setToolsUsed: React.Dispatch<React.SetStateAction<ToolsUsed[]>>) => {
    if (!design.name || !design.description) notify('Fill above fields');
    else {
        setDesign({ ...design, completed: current })
        if (design.completed === current) {
            setDesign({ ...design, completed: null, levels: null });
            setToolsUsed([]);
        }
    }
}

export const addLevelCheckMark = (level: check, setDesign: React.Dispatch<React.SetStateAction<Design>>, design: Design, setToolsUsed: React.Dispatch<React.SetStateAction<ToolsUsed[]>>) => {
    if (!design.name || !design.description || !design.completed) notify("Fill above fields and try again");
    else {
        setDesign({ ...design, levels: level })
        if (design.levels === level) {
            setDesign({ ...design, levels: null });
            setToolsUsed([]);
        }
    }
}

export const addFileType = (type: string, setUploadedDetails: React.Dispatch<React.SetStateAction<string[]>>, uploadedDetails: string[]) => {
    if (uploadedDetails.includes(type)) {
        setUploadedDetails(uploadedDetails.filter((items) => items !== type))
    }
    else {
        setUploadedDetails([...uploadedDetails, type])
    }
}

export const addTool = (name: ToolsUsed, design: Design, toolsUsed: ToolsUsed[], setToolsUsed: React.Dispatch<React.SetStateAction<ToolsUsed[]>>, setDesign: React.Dispatch<React.SetStateAction<Design>>) => {
    if (!design.name || !design.description || !design.completed || !design.levels) notify('Fill the above fields');
    else {
        if (toolsUsed.includes(name)) {
            setToolsUsed(toolsUsed.filter((items) => items !== name))
        }
        else {
            setToolsUsed([...toolsUsed, name]);
            setDesign({ ...design, toolsUsed: toolsUsed });
            console.log(design.toolsUsed);
        }

    }
}

export const handleDesignFiles = ({ design, e, setDesign, setloading, setprogress, setuploading, user, item, setFigmaFileURL, setImageAssetURL, setSketchFileURL }: HandleDesignFiles) => {
    let file = e.target.files[0];
    if (!file) return;
    else {

        uploadFileManage({ design, file, item, setFigmaFileURL, setImageAssetURL, setSketchFileURL, setloading, setprogress, setuploading, user })
        file = null;

    }

}

export const uploadFileManage = ({ item, design, file, setFigmaFileURL, setImageAssetURL, setSketchFileURL, setloading, setprogress, setuploading, user }: UploadFileManage) => {
    if (item === 'Figma file') {
        uploadDesignFiles({ design: design, file: file, setloading, setuploading, user, setprogress, setDesignFileURL: setFigmaFileURL })
    }
    else if (item === 'Sketch file') {
        uploadDesignFiles({ design: design, file: file, setloading, setuploading, user, setprogress, setDesignFileURL: setSketchFileURL })
    }
    else {
        uploadDesignFiles({ design: design, file: file, setloading, setuploading, user, setprogress, setDesignFileURL: setImageAssetURL })
    }
}
