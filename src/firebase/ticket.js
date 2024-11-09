import { db } from "./firebase";
import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";

export const getOpenTickets = async () => {
    const q = query(collection(db, "tickets"), where("open", "==", true))
    const querySnapshot = await getDocs(q);
    
    let tickets = []
    querySnapshot.forEach((doc) => {
        tickets.push(doc.data())
    })

    return tickets
}

export const createTicket = async (ticket) => {
    ticket.created_at = Timestamp.fromDate(ticket.created_at)

    const docRef = await addDoc(collection(db, "tickets"), ticket);
    console.log("Ticket written with ID: ", docRef.id);
}

export const closeTicket = async () => {
    
}