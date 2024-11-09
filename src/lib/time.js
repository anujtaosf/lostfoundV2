export const formatTimestampToTime = (timestamp) => {
	const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensures two digits for minutes

	// Determine AM or PM suffix
	const ampm = hours >= 12 ? "pm" : "am";

	// Convert to 12-hour format
	hours = hours % 12 || 12; // Convert '0' hour to '12' for 12-hour format

	return `${hours}:${minutes} ${ampm}`;
};

export const formatTimestampToDuration = (timestamp) => {
	const timestampDate = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
	const now = new Date(); // Current date and time

	// Calculate the difference in milliseconds
	const diffInMs = now - timestampDate;

	// Convert milliseconds to hours
	const hours = Math.floor(diffInMs / (1000 * 60 * 60));

	return hours;
};

export const isTimestampToday = (timestamp) => {
	const timestampDate = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
	const now = new Date(); // Current date and time

	// Check if year, month, and day are the same
	return (
		timestampDate.getFullYear() === now.getFullYear() &&
		timestampDate.getMonth() === now.getMonth() &&
		timestampDate.getDate() === now.getDate()
	);
};
