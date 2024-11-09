import React, { useEffect, useState } from "react";
import { getAllTools, getTool } from "../firebase/tools";
import { getUniqname } from "../firebase/users";
import { useAuth } from "../context/authContext";
import { createTicket } from "../firebase/ticket";


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
	// Handle change in dropdown
	const handleChange = (event) => {
		setSelectedTool(event.target.value);
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
		<form onSubmit={handleSubmit}>
			<label htmlFor="dropdown">Location:</label>
			<select id="dropdown" value={selectedLocation} onChange={(e) => {setSelectedLocation(e.target.value)}}>
				<option value="">-- Please choose an location --</option>
				<option value="wilson">Wilson Center</option>
				<option value="frb">FRB Makerspace</option>
			</select>
			<br/>

			<label htmlFor="dropdown">Tool:</label>
			<select id="dropdown" value={selectedTool} onChange={(e) => {setSelectedTool(e.target.value)}}>
				<option value="">-- Please choose an option --</option>
				{tools.map((item, index) => (
					<option key={index} value={item}>
						{item}
					</option>
				))}
			</select>
			<br/>
			<button type="submit" disabled={!selectedTool || !selectedLocation}>
				Submit
			</button>
		</form>
	);
};

export default CheckoutForm;
