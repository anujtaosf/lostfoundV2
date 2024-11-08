import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Landing from "./Landing";
import { getUniqname } from "../lib/auth";

const admin = ["ljweaver", "anuhea"]

export const AdminRoutes = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const {currentUser, userLoggedIn} = useAuth();

    //const docRef = auth.currentUser && doc(db, "uniqname", getUniqname(auth.currentUser));
    //const docSnap = await getDoc(docRef);

    ///if (docSnap.exists()) {

    //}
    
    return (
        userLoggedIn && admin.includes(getUniqname(currentUser)) ? <Outlet /> : <Landing />
    )
}

export const UserRoutes = () => {
    const {userLoggedIn} = useAuth();

    return (
        userLoggedIn ? <Outlet /> : <Landing />
    )
}