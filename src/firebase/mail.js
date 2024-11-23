import { db } from "./firebase";
import { collection, addDoc} from "firebase/firestore";

/**
 * @typedef {Object} Email 
 * @property {String[]} email_addresses list of email addresses to send email to
 * @property {{subject: String, text: String, html: String}} message contents of email
 * @property {Date} timestamp time email was created
 * @property {String} status used to track email state. Default to "pending"
 */

/**
 * @description Creates an email document in the firestore email collection and automatically sends it
 * @param {Email} email email object to send
 */
export const createEmail = async (email) => {
    return await addDoc(collection(db, "mail"), email);
}