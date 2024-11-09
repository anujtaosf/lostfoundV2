import { useContext, useEffect, useState } from "react";
import React, { createContext } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from "../../firebase/users";
import { doSignOut } from "../../firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null)
    const [userData, setUserData] = useState(null)
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, initializeUser);
		return unsubscribe;
	}, []);

	const initializeUser = async (user) => {
        if (user && user.email.split(/@|\./)[1] !== "umich") {
            doSignOut();
            return
        }

		if (user) {
            const data = await getUserData(user);

			setCurrentUser({ ...user });
            setUserLoggedIn(true);
            setUserRole(data.role)
            setUserData(data)
		} else {
            setCurrentUser(null);
            setUserLoggedIn(false);
            setUserRole(null);
            setUserData(null);
        }
        setLoading(false);
	};

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        userRole,
        userData,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
};
