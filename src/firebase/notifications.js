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

export const getOpenNotifications = async () => {
	const q = query(collection(db, "notifications"), where("open", "==", true));
	const querySnapshot = await getDocs(q);

	let notifications = [];
	querySnapshot.forEach((doc) => {
		notifications.push({ id: doc.id, ...doc.data() });
	});

	return notifications;
};

export const createNotification = async (notification) => {
	notification.created_at = Timestamp.fromDate(notification.created_at);

	const docRef = await addDoc(collection(db, "notifications"), notification);
	console.log("Created notification:" + docRef.id);
};

export const closeNotification = async (notification_id) => {
	const notifRef = doc(db, "notifications", notification_id);
	await updateDoc(notifRef, { open: false });
};
