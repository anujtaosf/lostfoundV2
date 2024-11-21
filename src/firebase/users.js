import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getUniqname = (user) => {
	return user.email.split("@")[0];
};

export const getUserData = async (uniqname) => {
	const docRef = doc(db, "users", uniqname);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} 

    return undefined
};

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

export const createUserNoAuth = async (uniqname) => {
    const userRef = doc(db, 'users', uniqname);
    const role = 'user';
    const trainings = [];

    const newUser = {
        uniqname,
        role,
        trainings
    }

    await setDoc(userRef, newUser);
    return newUser;
}
