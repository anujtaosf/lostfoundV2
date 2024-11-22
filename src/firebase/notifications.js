import { db } from "./firebase";
import {
	addDoc,
	collection,
	Timestamp,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
} from "firebase/firestore";

/**
 * @typedef {Object} Notification
 * @property {String} id unique ID
 * @property {Date} created_at time notification was created
 * @property {String} user user who created/prompted creation of notification
 * @property {String} description
 * @property {String} type
 * @property {String} ticket reference to ticket related to the notification
 * @property {Boolean} open 
 */

/**
 * @description gets all open notifications from firestore
 * @returns {Notification[]}
 */
export const getOpenNotifications = async () => {
	const q = query(collection(db, "notifications"), where("open", "==", true));
	const querySnapshot = await getDocs(q);

	let notifications = [];
	querySnapshot.forEach((doc) => {
		notifications.push({ id: doc.id, ...doc.data() });
	});

	return notifications;
};

/**
 * @description uploads notificaton to firestore
 * @param {Notification} notification 
 */
export const createNotification = async (notification) => {
	notification.created_at = Timestamp.fromDate(notification.created_at);
	const docRef = await addDoc(collection(db, "notifications"), notification);
};

/**
 * @description sets open property of notification to false
 * @param {String} notification_id 
 */
export const closeNotification = async (notification_id) => {
	const notifRef = doc(db, "notifications", notification_id);
	await updateDoc(notifRef, { open: false });
};
