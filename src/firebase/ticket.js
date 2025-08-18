import { db } from "./firebase";
import { collection, query, where, getDocs, addDoc, Timestamp, doc, updateDoc, orderBy} from "firebase/firestore";

/**
 * @typedef {Object} Ticket
 * @property {String} id
 * @property {Date} created_at
 * @property {String} location physical location where ticket is opened
 * @property {String} tool tool that is checked out
 * @property {String} user uniqname of person
 * @property {Number} tool_rating safety rating of tool, 1-3
 * @property {Boolean} open
 */

/**
 * @description gets all tickets where open==true
 * @returns {Ticket[]} 
 */
export const getOpenTickets = async () => {
    const q = query(collection(db, "tickets"), where("open", "==", true))
    const querySnapshot = await getDocs(q);
    
    let tickets = []
    querySnapshot.forEach((doc) => {
        tickets.push({"id": doc.id, ...doc.data()})
    })

    return tickets
}

/**
 * @description get all open tickets created by user
 * @param {String} users uniqname of user
 * @returns {Ticket[]}
 */
export const getOpenTicketsFromUser = async (user) => {
    const q = query(collection(db, "tickets"), where("open", "==", true), where("user", "==", user));
    const querySnapshot = await getDocs(q);
    
    let tickets = []
    querySnapshot.forEach((doc) => {
        tickets.push({"id": doc.id, ...doc.data()})
    })

    return tickets
}

/**
 * @description upload ticket to database
 * @param {Ticket} ticket 
 */
export const createTicket = async (ticket) => {
    ticket.created_at = Timestamp.fromDate(ticket.created_at)

    await addDoc(collection(db, "tickets"), ticket);
}

/**
 * @description set open value of ticket to false
 * @param {String} ticket_id 
 */
export const closeTicket = async (ticket_id) => {
    const ticketRef = doc(db, "tickets", ticket_id);
    await updateDoc(ticketRef, {open: false})
}

export const getAllTickets = async () => {
  const q = query(collection(db, "tickets"), orderBy("created_at", "desc"));
  const snap = await getDocs(q);

  const tickets = [];
  snap.forEach((d) => {
    const data = d.data();
    // Ensure created_at is a JS Date for easy formatting/sorting if needed
    const createdAt =
      data.created_at && typeof data.created_at.toDate === "function"
        ? data.created_at.toDate()
        : data.created_at;
    tickets.push({ id: d.id, ...data, created_at: createdAt });
  });

  return tickets;
};

export const getOpenTicketsFromUserAtLocation = async (user, location) => {
  const q = query(
    collection(db, "tickets"),
    where("open", "==", true),
    where("user", "==", user),
    where("location", "==", location)
  );
  const snap = await getDocs(q);
  const out = [];
  snap.forEach((d) => out.push({ id: d.id, ...d.data() }));
  return out;
};