import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let app:FirebaseApp;

const firebaseConfig = {
  apiKey: "AIzaSyAbrzplcZEkqN2fu5EPQIOxajC-IGCablI",
  authDomain: "devs-ui.firebaseapp.com",
  projectId: "devs-ui",
  storageBucket: "devs-ui.appspot.com",
  messagingSenderId: "482033258523",
  appId: "1:482033258523:web:2e386b87e8f8897b77e8be",
  measurementId: "G-3RDDS8M83V"
};

// Initialize Firebase
if(getApps().length == 0){
   app = initializeApp(firebaseConfig);
}
else {
  app = getApp();
}

export default app;