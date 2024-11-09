import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getAllTools = async () => {
    const querySnapshot = await getDocs(collection(db, "tools"));
    
    let tools = []
    querySnapshot.forEach((doc) => {
        tools.push(doc.data())
    })

    return tools
}

export const getTool = async (name) => {
    const q = query(collection(db, "tools"), where("name", "==", name))
    const querySnapshot = await getDocs(q)

    const tool = querySnapshot.docs[0].data()
    return tool
}
