import React from "react";
import { useNavigate } from "react-router-dom";
import { doSignInWithGoogle, doSignOut } from "../firebase/auth";
import { useAuth } from "../context/authContext";

export const SignIn = () => {
	const { userLoggedIn } = useAuth();

	const signInWithGoogle = () => {
		doSignInWithGoogle();
	};

	return !userLoggedIn && <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

export const SignOut = () => {
	const { userLoggedIn } = useAuth();
	const navigate = useNavigate();

	return (
		userLoggedIn && (
			<button
				onClick={() => {
					doSignOut().then(() => {
						navigate("/");
					});
				}}
			>
				Sign Out
			</button>
		)
	);
};
