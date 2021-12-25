import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
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

export const _signInWithPopup = (provider) => {
    signInWithPopup(authService, provider)
    .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
    });
}

export const writeDB = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(dbService, collectionName), data);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const readDB = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(dbService, collectionName));
        return querySnapshot;
    } catch (e) {
        console.error("Error reading  document: ", e);
    }
}

initializeApp(firebaseConfig);

export const firebaseGoogleProvider = GoogleAuthProvider;
export const firebaseGithubProvider = GithubAuthProvider;
export const authService = getAuth();
export const dbService = getFirestore();