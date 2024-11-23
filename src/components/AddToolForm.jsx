import React, { useState } from "react";
import styled from "styled-components";
import { createTool } from "../firebase/tools";

const trainings = ["none", "frb-basic2", "wilson-basic2"];

const AddToolForm = () => {
	const [nameInput, setNameInput] = useState("");
	const [amountInput, setAmountInput] = useState(0);
	const [selectedTraining, setSelectedTraining] = useState("");

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent page reload

		const tool = {
			name: nameInput,
			amount: amountInput,
			training: selectedTraining,
		};

		setNameInput("");
		setAmountInput("");
		setSelectedTraining("");
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

				<br />
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
				<br />

				<SubmitButton
					type="submit"
					disabled={!nameInput | !amountInput | !selectedTraining}
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
	padding: 0px 0px 20px 20px;
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

const Input = styled.input`
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
	background-color: #4caf50;
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

export default AddToolForm;
