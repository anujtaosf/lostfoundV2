import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Landing from "./Landing";
import { getUserRole } from "../firebase/users";

const admin = ["ljweaver", "anuhea"]

export const AdminRoutes = () => {
    // const [isAdmin, setIsAdmin] = useState(false);
    const {currentUser, userRole, userLoggedIn} = useAuth();
    
    return (
        userRole == "admin" ? <Outlet /> : <Landing />
    )
}

export const UserRoutes = () => {
    const {userLoggedIn} = useAuth();

    return (
        userLoggedIn ? <Outlet /> : <Landing />
    )
}