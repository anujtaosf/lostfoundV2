import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

export const doSignInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider)
        return result
    } catch (e) {
        console.log(e);
    }
}

export const doSignOut = () => {
    return auth.signOut();
}