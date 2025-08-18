import React, { useState } from "react";
import styled from "styled-components";
import { createTool } from "../firebase/tools";
import {Formlabel, Description, Fieldlabel, Input, Select, SubmitButton} from "../styles/form-styles"
const trainings = ["none", "frb-basic2", "wilson-basic2", "welding"];
const LOCATIONS = ["frb", "wilson"];

const AddToolForm = () => {
	const [nameInput, setNameInput] = useState("");
	const [amountInput, setAmountInput] = useState(0);
	const [selectedTraining, setSelectedTraining] = useState("");
	const [location, setLocation] = useState("frb");


	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent page reload

		const tool = {
			name: nameInput,
			amount: amountInput,
			training: selectedTraining,
			location,
		};

		setNameInput("");
		setAmountInput("");
		setSelectedTraining("");
		setLocation("frb");
		await createTool(tool);
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Formlabel>Add a Tool</Formlabel>
				<Description></Description>
				<Fieldlabel htmlFor="name">Tool Name:</Fieldlabel>
				<Input
					type="text"
					id="name"
					value={nameInput}
					onChange={(e) => {
						setNameInput(e.target.value);
					}}
				/>

				<Fieldlabel htmlFor="amount">Amount:</Fieldlabel>
				<Input
					type="number"
					id="dropdown"
					value={amountInput}
					onChange={(e) => {
						setAmountInput(e.target.value);
					}}
				/>

				<Fieldlabel htmlFor="location">Location:</Fieldlabel>
				<Select
				id="location"
				value={location}
				onChange={(e) => setLocation(e.target.value)}
				>
				{LOCATIONS.map((loc) => (
					<option key={loc} value={loc}>
					{loc.toUpperCase()}
					</option>
				))}
				</Select>
	
				<Fieldlabel htmlFor="dropdown">Training:</Fieldlabel>
				<Select
					id="dropdown"
					value={selectedTraining}
					onChange={(e) => {
						setSelectedTraining(e.target.value);
					}}
				>
					<option value="">-- Please choose an option --</option>
					{trainings.map((item, index) => (
						<option key={index} value={item}>
							{item}
						</option>
					))}
				</Select>

				<SubmitButton
					type="submit"
					disabled={!nameInput || !amountInput || !selectedTraining || !location}
					>
					Submit
				</SubmitButton>
			</Form>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	min-width: 240px;
	flex-direction: column;
	justify-content: flex-start;
	padding: 0px 20px 20px 20px;
	width: 325px;

	@media (max-width: 991px) {
		max-width: 100%;
	}
`;

const Form = styled.form`
	width: 100%;
	max-width: 480px;
	padding: 32px;
	background-color: white;
	border-radius: 12px;
	display: flex;
	flex-direction: column;
	gap: 4px;
`;


export default AddToolForm;
