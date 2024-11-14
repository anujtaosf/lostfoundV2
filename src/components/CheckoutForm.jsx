import React, { useEffect, useState } from "react";
import { getAllTools, getTool } from "../firebase/tools";
import { getUniqname } from "../firebase/users";
import { useAuth } from "../context/authContext";
import { createTicket } from "../firebase/ticket";
import styled from 'styled-components';


const CheckoutForm = () => {
	const [tools, setTools] = useState([]);
	const [selectedTool, setSelectedTool] = useState("");
	const [selectedLocation, setSelectedLocation] = useState("");

	const { currentUser } = useAuth();

	useEffect(() => {
		handleToolUpdate();
	}, []);

	const handleToolUpdate = async () => {
		const tempTools = await getAllTools();
		setTools(tempTools.map((tool) => tool.name));
	};


	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent page reload

		const created_at = new Date();
		const user = getUniqname(currentUser);
		const tool = selectedTool;
		const location = selectedLocation;
		const open = true;

		const toolInfo = await getTool(tool);
		console.log(toolInfo)
		const tool_rating = toolInfo?.rating || 1;

		const ticket = {
			created_at,
			location,
			tool,
			tool_rating,
			user,
			open
		}

		createTicket(ticket);

	};

	return (
		<Container>
			<Checkout onSubmit={handleSubmit}>
				<Formlabel>Tool Check-out Form</Formlabel>
				<Description>Please choose the tool you are checking out and your location below</Description>
				<Fieldlabel htmlFor="dropdown">Location:</Fieldlabel>
				<Select id="dropdown" value={selectedLocation} onChange={(e) => {setSelectedLocation(e.target.value)}}>
					<option value="">-- Please choose an location --</option>
					<option value="wilson">Wilson Center</option>
					<option value="frb">FRB Makerspace</option>
				</Select>
				<br/>

				<Fieldlabel htmlFor="dropdown">Tool:</Fieldlabel>
				<Select id="dropdown" value={selectedTool} onChange={(e) => {setSelectedTool(e.target.value)}}>
					<option value="">-- Please choose an option --</option>
					{tools.map((item, index) => (
						<option key={index} value={item}>
							{item}
						</option>
					))}
				</Select>
				<br/>
				<SubmitButton type="submit" disabled={!selectedTool || !selectedLocation}>
					Submit
				</SubmitButton>
			</Checkout>
		</Container>
	);
};


const Container = styled.div`
	width: 100%;
	padding: 40px 20px;
	display: flex;
	justify-content: center;
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
`;

const Formlabel = styled.label`
	font-size: 32px;
	font-weight: bold;
	margin: 10px 0px 0px 0px;
	
`;

const Description = styled.label`
	font-size: 18px;
	margin: 0px 10px 0px 0px;
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
