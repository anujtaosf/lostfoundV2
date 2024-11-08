import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAfouK7rufR-0RkkDAdNMbZrTEIuFoDE50",
    authDomain: "lostfound-makerspace.firebaseapp.com",
    projectId: "lostfound-makerspace",
    storageBucket: "lostfound-makerspace.firebasestorage.app",
    messagingSenderId: "52755277898",
    appId: "1:52755277898:web:8ecffb215b6031ec6c5eb3",
    measurementId: "G-93D2S4C08N"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}