import React, { useEffect, useState } from "react";
import { getUniqname } from "../firebase/users";
import { useAuth } from "../context/authContext";
import { closeTicket, getOpenTicketsFromUser } from "../firebase/ticket";

const CheckoutForm = () => {
	const [tickets, setTickets] = useState({});
	const [selectedTicket, setSelectedTicket] = useState("");
	const [isBroken, setIsBroken] = useState(false);

	const { currentUser } = useAuth();

	useEffect(() => {
        const handleGetTickets = async () => {
            const tickets = await getOpenTicketsFromUser(getUniqname(currentUser));
            setTickets(tickets);
        };

		handleGetTickets();
	}, [currentUser]);

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent page reload

        closeTicket(selectedTicket);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="dropdown">Tool:</label>
			<select
				id="dropdown"
				value={selectedTicket}
				onChange={(e) => {
					setSelectedTicket(e.target.value);
				}}
			>
				<option value="">-- Please choose an option --</option>
				{Object.keys(tickets).map((ticket, index) => (
					<option key={index} value={ticket}>
						{tickets[ticket].tool}
					</option>
				))}
			</select>
			<br />

			<label htmlFor="isBroken">
				<input
					type="checkbox"
					id="isBroken"
					checked={isBroken}
					onChange={(e) => setIsBroken(e.target.checked)}
				/>
				Is the tool broken?
			</label>
			<br />

			<button type="submit" disabled={!selectedTicket}>
				Submit
			</button>
		</form>
	);
};

export default CheckoutForm;
