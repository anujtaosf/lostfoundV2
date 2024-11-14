import React, { useEffect, useState } from "react";
import { getUniqname } from "../firebase/users";
import { useAuth } from "../context/authContext";
import { closeTicket, getOpenTicketsFromUser } from "../firebase/ticket";
import styled from 'styled-components';

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
		<Container>
			<Checkin onSubmit={handleSubmit}>
				<Formlabel>Tool Check-in Form</Formlabel>
				<Description>Thank you for returning the tool! Please choose the tool you are checking in below</Description>
				<Fieldlabel htmlFor="dropdown">Tool:</Fieldlabel>
				<Select
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
				</Select>
				<br />

				<Fieldlabel htmlFor="isBroken">
					<input
						type="checkbox"
						id="isBroken"
						checked={isBroken}
						onChange={(e) => setIsBroken(e.target.checked)}
					/>
					Is the tool broken?
				</Fieldlabel>
				<br />

				<SubmitButton type="submit" disabled={!selectedTicket}>
					Submit
				</SubmitButton>
			</Checkin>
		</Container>
	);
};


const Container = styled.div`
	width: 100%;
	padding: 40px 20px;
	display: flex;
	justify-content: center;
`;

const Checkin = styled.form`
	width: 100%;
	max-width: 480px;
	padding: 32px;
	background-color: white;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const Formlabel = styled.label`
	font-size: 32px;
	font-weight: bold;
	margin: 10px 0px 0px 0px;
	
`;

const Description = styled.label`
	font-size: 18px;
	margin: 0px 10px 10px 0px;
	border-style: hidden hidden dotted hidden;
	border-width: 4px;
	border-color: rgba(0, 0, 0, 0.3);
	padding-bottom: 8px;
`;

const Fieldlabel = styled.label`
	font-size: 24px;
	font-weight: bold;
	margin: 10px 10px;
	
`;

const Select = styled.select`
	padding: 8px;
	margin-bottom: 10px;
	width: 100%;
	max-width: 300px;
	display: center;
	border-radius: 6px;

	&:focus {
    outline: none;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  	}
	
`;

const SubmitButton = styled.button`
	padding: 10px 20px;
	font-size: 14px;
	background-color: #4CAF50;
	color: white;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	margin: 10px;
	transition: all 0.2s ease;


	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
	&:hover:not(:disabled) {
    transform: scale(1.05);
  	}

`;

export default CheckoutForm;
