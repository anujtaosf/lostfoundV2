import { useEffect, useState } from "react";
import { createUserNoAuth, getUserData } from "../firebase/users";
import { getOpenTickets } from "../firebase/ticket";
import styled from "styled-components";
import { Description, Fieldlabel, SubmitButton } from "../styles/form-styles";

const UniqnameFormReturn = ({ setUniqname, setTrainings }) => {
	const [uniqnameInput, setUniqnameInput] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [uniqnameOptions, setUniqnameOptions] = useState([]);

	useEffect(() => {
		const fetchUniqnames = async () => {
			const tx = await getOpenTickets();
			const uniqnames = tx.map(ticket => ticket.user.toLowerCase());
			const uniqueUniqnames = [...new Set(uniqnames)].sort();
			setUniqnameOptions(uniqueUniqnames);
		};
		fetchUniqnames();
	}, []);

	const handleUniqnameSubmit = async (e) => {
		e.preventDefault();

		const uniqnameLowerCase = uniqnameInput.toLowerCase();
		const data = await getUserData(uniqnameLowerCase);
		if (!data) {
			createUserNoAuth(uniqnameLowerCase, "user", ["none"]);
			setTrainings(["none"]);
		} else {
			setTrainings(data.trainings);
		}

		setUniqname(uniqnameLowerCase);
		setErrorMessage("");
		setUniqnameInput("");
	};

	return (
		<Checkout onSubmit={handleUniqnameSubmit}>
			<Formlabel>Sign In</Formlabel>
			<Description><span>Please sign in with your uniqname</span><br /><br />
			<span style={{ color: "gray", fontStyle: "italic"}}>If you don't see your uniqname, then you do not have any tools to return</span>
			</Description>
			<Fieldlabel htmlFor="dropdown">Uniqname:</Fieldlabel>
			<Select
				id="uniqname"
				value={uniqnameInput}
				onChange={(e) => setUniqnameInput(e.target.value)}
			>
				<option value="">-- Please choose an option --</option>
				{uniqnameOptions.map((name, index) => (
					<option key={index} value={name}>
						{name}
					</option>
				))}
			</Select>

			<SubmitButton disabled={!uniqnameInput}>Next</SubmitButton>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</Checkout>
	);
};

// 🔧 Styling
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

const ErrorMessage = styled.div`
	color: red;
`;

const Select = styled.select`
	padding: 8px;
	margin: 12px 0;
	font-size: 16px;
	border-radius: 4px;
`;

export default UniqnameFormReturn;
