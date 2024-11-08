import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Landing from "./Landing";
import { getUniqname } from "../lib/auth";

const admin = ["ljweaver", "anuhea"]

export const AdminRoutes = () => {
    // const [isAdmin, setIsAdmin] = useState(false);

    const {currentUser, userLoggedIn} = useAuth();
    
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