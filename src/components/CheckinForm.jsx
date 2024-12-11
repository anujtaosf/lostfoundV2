import React, { useEffect, useState } from "react";
import { closeTicket, getOpenTicketsFromUser } from "../firebase/ticket";
import styled from "styled-components";
import { createNotification } from "../firebase/notifications";
import UniqnameForm from "./UniqnameForm";
import {
	Formlabel,
	Description,
	Fieldlabel,
	StatusMessage,
	SubmitButton,
	SignOutButton,
	Input,
	CheckboxInput,
	ReactSelectStyles,
} from "../styles/form-styles";
import Select from "react-select";

const formatTicketOptions = (tickets) => {
	const ticketOptions = tickets.map((ticket) => {
		return { value: ticket.id, label: ticket.tool };
	});
	return ticketOptions;
};

const CheckoutForm = () => {
	const [ticketOptions, setTicketOptions] = useState([]);
	const [selectedTicketOption, setSelectedTicketOption] = useState({});
	const [isBroken, setIsBroken] = useState(false);
	const [brokenDescription, setBrokenDescription] = useState("");

	const [uniqname, setUniqname] = useState("");

	const [statusMessage, setStatusMessage] = useState("");

	useEffect(() => {
		const handleGetTickets = async () => {
			const tickets = await getOpenTicketsFromUser(uniqname);
			setTicketOptions(formatTicketOptions(tickets));
		};
		
		handleGetTickets();
	}, [uniqname]);

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent page reload

		const ticket = ticketOptions.filter((ticketOption) => {
			return ticketOption.value === selectedTicketOption.value;
		})[0];

		closeTicket(selectedTicketOption.value);
		if (isBroken) {
			createNotification({
				created_at: new Date(),
				description: brokenDescription,
				user: uniqname,
				type: "broken",
				ticket: selectedTicketOption.value,
				open: true,
			});
		}

		const handleGetTickets = async () => {
			const tickets = await getOpenTicketsFromUser(uniqname);
			setTicketOptions(formatTicketOptions(tickets));
		};

		handleGetTickets();
		setSelectedTicketOption({});
		setIsBroken(false);
		setBrokenDescription("");
		setStatusMessage(`Successfully checked in ${selectedTicketOption.label}`);
	};

	const handleSignOut = (e) => {
		e.preventDefault();

		setSelectedTicketOption({});
		setIsBroken(false);
		setBrokenDescription("");
		setTicketOptions([]);
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
						value={selectedTicketOption}
						onChange={setSelectedTicketOption}
						options={ticketOptions}
					    styles={ReactSelectStyles}
						placeholder="Select a ticket..."
						isSearchable={false}
					/>
					<Fieldlabel htmlFor="isBroken">
						Is the tool broken:
						<CheckboxInput
							id="isBroken"
							checked={isBroken}
							onChange={(e) => setIsBroken(e.target.checked)}
						/>
					</Fieldlabel>
					<br />

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

					<SubmitButton type="submit" disabled={!selectedTicketOption.value}>
						Submit
					</SubmitButton>
					<SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
				</Checkin>
			)}
		</Container>
	);
};

const Container = styled.div`
	padding: 40px 20px;
	display: flex;
	justify-content: center;
	overflow: hidden;
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
