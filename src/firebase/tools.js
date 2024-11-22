import { FirebaseError } from "firebase/app";
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

/**
 * @typedef tool
 * @property {String} name name of tool
 * @property {Number} amount amount in tool shop
 * @property {Number} rating tool rating
 * @property {String} training required training to checkout tool
 *
 */

/**
 * @returns {Tool[]} list of all tools in databasde
 */
export const getAllTools = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "tools"));
    
        let tools = []
        querySnapshot.forEach((doc) => {
            tools.push(doc.data())
        })

        return tools
    } catch (error) {
        if (error instanceof FirebaseError) {
            return []
        }

        throw error
    } 
}

/**
 * @param {String} name 
 * @returns {Tool} gets tool information by name
 */
export const getTool = async (name) => {
    try {
        const q = query(collection(db, "tools"), where("name", "==", name))
        const querySnapshot = await getDocs(q)

        const tool = querySnapshot.docs[0].data()
        return tool
    } catch (error) {
        if (error instanceof FirebaseError) {
            return []
        }
    }
}
