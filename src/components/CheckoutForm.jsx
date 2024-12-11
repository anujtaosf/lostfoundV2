import React, { useEffect, useState } from "react";
import { getAllTools, getTool } from "../firebase/tools";
import { createTicket } from "../firebase/ticket";
import styled from "styled-components";
import UniqnameForm from "./UniqnameForm";
import { Formlabel, Description, Fieldlabel, Select, StatusMessage, SubmitButton, SignOutButton } from "../styles/form-styles";

const CheckoutForm = () => {
	const [tools, setTools] = useState([]);
	const [selectedTool, setSelectedTool] = useState("");
	const [selectedLocation, setSelectedLocation] = useState("");

	const [uniqname, setUniqname] = useState("");
	const [trainings, setTrainings] = useState([]);
	const [statusMessage, setStatusMessage] = useState("");

	useEffect(() => {
		handleToolUpdate();
	}, []);

	const handleToolUpdate = async () => {
		const tempTools = await getAllTools();
		setTools(tempTools.map((tool) => tool.name).sort());
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent page reload

		const created_at = new Date();
		const user = uniqname;
		const tool = selectedTool;
		const location = selectedLocation;
		const open = true;

		const toolInfo = await getTool(tool);
		const tool_rating = toolInfo?.rating || 1;

		const ticket = {
			created_at,
			location,
			tool,
			tool_rating,
			user,
			open,
		};

		createTicket(ticket);
		setSelectedTool("");
		setSelectedLocation("");
		setStatusMessage(`Successfully signed out ${tool} from the ${location}`);
		console.log(trainings);
	};

	const handleSignOut = (e) => {
		e.preventDefault();

		setSelectedTool("");
		setSelectedLocation("");
		setStatusMessage("");
		setUniqname("");
	}

	return (
		<Container>
			{!uniqname ? (
				<UniqnameForm setUniqname={setUniqname} setTrainings={setTrainings} />
			) : (
				<Checkout onSubmit={handleSubmit}>
					<Formlabel>Tool Check-out Form</Formlabel>
					<Description>
						Please choose the tool you are checking out and your location below
					</Description>
					<Fieldlabel htmlFor="dropdown">Location:</Fieldlabel>
					<Select
						id="dropdown"
						value={selectedLocation}
						onChange={(e) => {
							setSelectedLocation(e.target.value);
						}}
					>
						<option value="">-- Please choose an location --</option>
						<option value="wilson">Wilson Center</option>
						<option value="frb">FRB Makerspace</option>
					</Select>
					
					<Fieldlabel htmlFor="dropdown">Tool:</Fieldlabel>
					<Select
						id="dropdown"
						value={selectedTool}
						onChange={(e) => {
							setSelectedTool(e.target.value);
						}}
					>
						<option value="">-- Please choose an option --</option>
						{tools.map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</Select>
					
					{statusMessage ? (
						<>
							<StatusMessage>{statusMessage}</StatusMessage>
							<StatusMessage>Check-out another tool above or please sign out below</StatusMessage>
							
						</>
					) : (
						<></>
					)}

					<SubmitButton type="submit" disabled={!selectedTool || !selectedLocation}>
						Submit
					</SubmitButton>
					<SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
					
				</Checkout>
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

const Checkout = styled.form`
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
