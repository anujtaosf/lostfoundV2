import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getUniqname = (user) => {
	return user.email.split("@")[0];
};

export const getUserData = async (user) => {
	const docRef = doc(db, "users", getUniqname(user));
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
        console.log(`Retrieving ${getUniqname(user)} from database`)
		return docSnap.data();
	} else {
        console.log(`Creating ${getUniqname(user)}`)
		return createUser(user);
	}
};

export const createUser = async (user) => {
    const userRef = doc(db, 'users', getUniqname(user));
    const name = user.displayName;
    const role = 'user';
    const trainings = []

    const newUser = {
        name,
        role,
        trainings
    }

    await setDoc(userRef, newUser);
    return newUser
}