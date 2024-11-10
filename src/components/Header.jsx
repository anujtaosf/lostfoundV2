import React from "react";
import styled from "styled-components";
import { SignIn, SignOut } from "./Auth";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Header = () => {
	const { currentUser, userLoggedIn } = useAuth();

	return (
		<HeaderContainer>
			<Logo>LostAndFound+</Logo>
			<NavbarContainer>
				<Link to="/dashboard">Dashboard</Link>
				<Link to="/checkout">Checkout</Link>
				<Link to="/checkin">Checkin</Link>
			</NavbarContainer>

			<UserInfo>
				<SignIn />
				<SignOut />
				{userLoggedIn ? <UserIcon src={currentUser.photoURL} alt="User avatar" /> : <></>}
			</UserInfo>
		</HeaderContainer>
	);
};

const HeaderContainer = styled.header`
	display: flex;
	width: 95%;
	align-items: center;
	gap: 40px 100px;
	justify-content: space-between;
	flex-wrap: wrap;

	@media (max-width: 991px) {
		max-width: 100%;
	}
`;

const Logo = styled.div`
	color: #000;
	align-self: stretch;
	margin: auto 0;
	font: 550 24px SansSerifBldFLF, sans-serif;
`;

const UserInfo = styled.div`
	align-self: stretch;
	display: flex;
	align-items: flex-start;
	gap: 25px;
	justify-content: center;
	margin: auto 0;
`;

const UserIcon = styled.img`
	aspect-ratio: 1;
	object-fit: contain;
	object-position: center;
	width: 75px;
	border-radius: 136px;
`;

const NavbarContainer = styled.div`
  display: flex;
  gap: 40px;
  text-decoration: none;
`

export default Header;
