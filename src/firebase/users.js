import { db } from "./firebase";
import { FirebaseError } from "firebase/app";
import {  collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";

export const getUniqname = (user) => {
	return user.email.split("@")[0];
};

/**
 * @typedef User
 * @property {String} uniqname
 * @property {String[]} trainings
 * @property {String} role
 */


/**
 * @param {String} uniqname 
 * @returns {User}
 */
export const getUserData = async (uniqname) => {
	const docRef = doc(db, "users", uniqname);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} 

    return undefined
};

/**
 * @description create a firestore user from auth user information
 * @param {AuthUser} user 
 * @returns {User}
 */
export const createUserWithAuth = async (user) => {
    const userRef = doc(db, 'users', getUniqname(user));
    const uniqname = getUniqname(user);
    const role = 'user';
    const trainings = []

    const newUser = {
        uniqname,
        role,
        trainings
    }

    await setDoc(userRef, newUser);
    return newUser
}

/**
 * @description create a firestore user from unauthenticated user information
 * @param {String} uniqname 
 * @returns {User}
 */
export const createUserNoAuth = async (uniqname, role, trainings) => {
    const userRef = doc(db, 'users', uniqname);

    const newUser = {
        uniqname,
        role,
        trainings
    }

    await setDoc(userRef, newUser);
    return newUser;
}


export const getAllUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
    
        let users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        })

        return users
    } catch (error) {
        if (error instanceof FirebaseError) {
            return []
        }

        throw error
    } 
}
