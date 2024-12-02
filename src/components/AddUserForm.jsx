import React, { useState } from "react";
import styled from "styled-components";
import { createUserNoAuth } from "../firebase/users";
import {Formlabel, Description, Fieldlabel, Input, Select, SubmitButton} from "../styles/form-styles"
const trainings = ["none", "frb-basic2", "wilson-basic2"];

const AddUserForm = () => {
	const [nameInput, setNameInput] = useState("");
	const [roleInput, setRoleInput] = useState("");
	const [selectedTraining, setSelectedTraining] = useState("");

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent page reload

		setNameInput("");
		setRoleInput("");
		setSelectedTraining("");
		await createUserNoAuth(nameInput, roleInput, selectedTraining);
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Formlabel>Add a User</Formlabel>
				<Description></Description>
				<Fieldlabel htmlFor="name">Uniqname:</Fieldlabel>
				<Input
					type="text"
					id="name"
					value={nameInput}
					onChange={(e) => {
						setNameInput(e.target.value);
					}}
				/>

				<Fieldlabel htmlFor="role">Role:</Fieldlabel>
				<Select
					id="dropdown"
					value={roleInput}
					onChange={(e) => {
						setRoleInput(e.target.value);
					}}
                >
                    <option value="">-- Please choose an option --</option>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
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
					disabled={!nameInput | !roleInput | !selectedTraining}
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


export default AddUserForm;