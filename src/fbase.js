import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,  } from "firebase/auth";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

export const _createUserWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(authService, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("user : ", userCredential);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error : ", error);
            // ..
        });
}

export const _signInWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(authService, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("user : ", userCredential);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error : ", error);
        });
}

initializeApp(firebaseConfig);

export const authService = getAuth();