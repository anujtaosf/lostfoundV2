import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getOpenTickets = async () => {
    const q = query(collection(db, "tickets"), where("open", "==", true))
    const querySnapshot = await getDocs(q);
    
    let tickets = []
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        tickets.push(doc.data())
    })

    return tickets
}

export const createTicket = async () => {

}

export const closeTicket = async () => {
    
}