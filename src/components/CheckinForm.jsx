import React, { useEffect, useState } from "react";
import { closeTicket, getOpenTicketsFromUser } from "../firebase/ticket";
import styled from "styled-components";
import { createNotification } from "../firebase/notifications";
import UniqnameForm from "./UniqnameForm";
import {
	Formlabel,
	Description,
	Fieldlabel,
	Select,
	StatusMessage,
	SubmitButton,
	SignOutButton,
	Input,
	CheckboxInput,
} from "../styles/form-styles";

const CheckoutForm = () => {
	const [tickets, setTickets] = useState([]);
	const [selectedTicket, setSelectedTicket] = useState("");
	const [isBroken, setIsBroken] = useState(false);
	const [brokenDescription, setBrokenDescription] = useState("");

	const [uniqname, setUniqname] = useState("");

	const [statusMessage, setStatusMessage] = useState("");
	useEffect(() => {
		const handleGetTickets = async () => {
			const tickets = await getOpenTicketsFromUser(uniqname);
			setTickets(tickets);
		};

		handleGetTickets();
	}, [uniqname]);

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent page reload

		const ticket = tickets.filter((ticket) => {
			return ticket.id === selectedTicket;
		})[0];

		closeTicket(selectedTicket);
		if (isBroken) {
			createNotification({
				created_at: new Date(),
				description: brokenDescription,
				user: uniqname,
				type: "broken",
				ticket: selectedTicket,
				open: true,
			});
		}

		const handleGetTickets = async () => {
			const tickets = await getOpenTicketsFromUser(uniqname);
			setTickets(tickets);
		};

		handleGetTickets();
		setSelectedTicket("");
		setIsBroken(false);
		setBrokenDescription("");
		setStatusMessage(`Successfully checked in ${ticket.tool}`);
	};

	const handleSignOut = (e) => {
		e.preventDefault();

		setSelectedTicket("");
		setIsBroken(false);
		setBrokenDescription("");
		setTickets([]);
		setUniqname("");
	};

	return (
		<Container>
			{!uniqname ? (
				<UniqnameForm
					setUniqname={setUniqname}
					setTrainings={() => {
						return;
					}}
				/>
			) : (
				<Checkin onSubmit={handleSubmit}>
					<Formlabel>Tool Check-in Form</Formlabel>
					<Description>
						Thank you for returning the tool! Please choose the tool you are checking in
						below
					</Description>
					<Fieldlabel htmlFor="dropdown">Tool:</Fieldlabel>
					<Select
						id="dropdown"
						value={selectedTicket}
						onChange={(e) => {
							setSelectedTicket(e.target.value);
						}}
					>
						<option value="">-- Please choose an option --</option>
						{tickets.map((ticket, index) => (
							<option key={index} value={ticket.id}>
								{ticket.tool}
							</option>
						))}
					</Select>
				

					<Fieldlabel htmlFor="isBroken">
						Is the tool broken:
						<CheckboxInput
							id="isBroken"
							checked={isBroken}
							onChange={(e) => setIsBroken(e.target.checked)}
						/>
					</Fieldlabel>
					<br/>

					{isBroken ? (
						<>
							<Fieldlabel htmlFor="brokenDescription">Description:</Fieldlabel>
							<Input
								type="text"
								id="brokenDescription"
								value={brokenDescription}
								placeholder="Describe how the item broke"
								onChange={(e) => setBrokenDescription(e.target.value)}
							/>
						</>
					) : (
						<></>
					)}

					
					{statusMessage ? (
						<>
							<StatusMessage>{statusMessage}</StatusMessage>
							<StatusMessage>
								Check-in another tool above or please sign out below
							</StatusMessage>
						</>
					) : (
						<></>
					)}

					<SubmitButton type="submit" disabled={!selectedTicket}>
						Submit
					</SubmitButton>
					<SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
				</Checkin>
			)}
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	padding: 40px 20px;
	display: flex;
	justify-content: center;

	@media (max-width: 991px) {
		width: 100%;
		padding: 40px 40px;
		justify-content: center;
	}
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

	@media (max-width: 991px) {
		max-width: 70%;
		padding: 12px;
	}
`;

export default CheckoutForm;
