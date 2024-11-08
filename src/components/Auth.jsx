import React from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


export const SignIn = () => {

    const auth = getAuth()

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    return !auth.currentUser && (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
}

export const SignOut = () => {
    const auth = getAuth()

    return auth.currentUser && (
    <button onClick={() => signOut(auth)}>Sign Out</button>
    )
}