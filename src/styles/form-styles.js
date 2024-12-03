import styled from "styled-components";

export const Formlabel = styled.label`
	font-size: 32px;
	font-weight: bold;
	margin: 10px 0px 0px 0px;
`;

export const Description = styled.label`
	font-size: 18px;
	margin: 0px 10px 10px 0px;
	border-style: hidden hidden dotted hidden;
	border-width: 4px;
	border-color: rgba(0, 0, 0, 0.3);
	padding-bottom: 8px;
`;

export const Fieldlabel = styled.label`
	font-size: 24px;
	font-weight: bold;
	margin: 0px 10px 0px 0px;
`;

export const Select = styled.select`
	padding: 8px;
	margin: 10px;
	margin-bottom: 25px;
	display: center;
	border-radius: 6px;

	&:focus {
		outline: none;
		box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
	}
`;

export const ReactSelectStyles = {
	control: (base, state) => ({
		...base,
		padding: "2px", // react-select wraps this differently
		margin: "0px 10px 10px 10px",
		borderRadius: "6px",
		boxShadow: state.isFocused ? "0 0 2px 2px rgba(0, 0, 0, 0.1)" : "none",
		borderColor: state.isFocused ? "#ccc" : base.borderColor,
		"&:hover": {
			borderColor: "#ccc",
		},
	}),
	menu: (base) => ({
		...base,
		width: "96%",
		marginLeft: "10px",
		padding: "0px",
		borderRadius: "6px",
	})
};

export const SubmitButton = styled.button`
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

export const SignOutButton = styled.button`
	padding: 10px 20px;
	font-size: 14px;
	background-color: #ff0000;
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

export const StatusMessage = styled.div`
	color: green;
`;

export const Input = styled.input`
	padding: 8px;
	margin: 10px;
	margin-bottom: 25px;
	display: center;
	border-radius: 6px;

	&:focus {
		outline: none;
		box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
	}
`;

export const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
	padding: 8px;
	margin: 10px;
	display: center;
	border-radius: 6px;

	&:focus {
		outline: none;
		box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
	}
`;
