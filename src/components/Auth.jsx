import React from "react";
import { useNavigate } from "react-router-dom";
import { doSignInWithGoogle, doSignOut } from "../firebase/auth";
import { useAuth } from "../context/authContext";
import styled from "styled-components";
export const SignIn = () => {
	const { userLoggedIn } = useAuth();

	const signInWithGoogle = () => {
		doSignInWithGoogle();
	};

	return !userLoggedIn && <Button onClick={signInWithGoogle}>Admin Sign In</Button>;
};

export const SignOut = () => {
	const { userLoggedIn } = useAuth();
	const navigate = useNavigate();

	return (
		userLoggedIn && (
			<Button
				onClick={() => {
					doSignOut().then(() => {
						navigate("/");
					});
				}}
			>
				Sign Out
			</Button>
		)
	);
};

const Button = styled.button`
	padding: 10px 20px;
	font-size: 14px;
	border: 1px solid black;
	color: black;
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
