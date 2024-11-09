import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const getAllTools = async () => {
    const querySnapshot = await getDocs(collection(db, "tools"));
    
    let tools = []
    querySnapshot.forEach((doc) => {
        tools.push(doc.data())
    })

    return tools
}
