import { db } from "./firebase";
import { collection, addDoc} from "firebase/firestore";

export const createEmail = async (email) => {

    await addDoc(collection(db, "mail"), email);
}