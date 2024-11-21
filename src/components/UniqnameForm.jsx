import { useState } from "react";
import { getUserData } from "../firebase/users";
import styled from "styled-components";

const UniqnameForm = ({setUniqname, setTrainings}) => {
    const [uniqnameInput, setUniqnameInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleUniqnameSubmit = async (e) => {
		e.preventDefault();

		const data = await getUserData(uniqnameInput);
		if (!data) {
			setErrorMessage(
				"Error: You have no trainings for this location, please talk to staff if this is a mistake"
			);
		} else {
			setUniqname(uniqnameInput);    
			setTrainings(data.trainings);
            setErrorMessage("");
		}

		setUniqnameInput("");
	};

	return (
		<Checkout onSubmit={handleUniqnameSubmit}>
			<Formlabel>Sign In</Formlabel>
			<Description>Please sign in with your uniqname</Description>
			<Fieldlabel htmlFor="uniqname">Uniqname:</Fieldlabel>
			<input
				type="text"
				id="uniqname"
				value={uniqnameInput}
				onChange={(e) => setUniqnameInput(e.target.value)}
				required
			/>
			<SubmitButton>Next</SubmitButton>
			{errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : <></>}
		</Checkout>
	);
};

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

const ErrorMessage = styled.div`

	color: red
`

export default UniqnameForm;
