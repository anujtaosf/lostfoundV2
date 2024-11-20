import React from "react";
import styled from "styled-components";
import { SignIn, SignOut } from "./Auth";
import { Link, useLocation} from "react-router-dom";
import { useAuth } from "../context/authContext";

const Header = () => {
	const { currentUser, userLoggedIn, userRole} = useAuth();
	const location = useLocation();

	return (
		<HeaderContainer>
			<Logo>LostAndFound+</Logo>
			{
				userLoggedIn ?
				<NavbarContainer>
					{userRole === "admin" ? <NavItem to="/dashboard" isActive={location.pathname === "/dashboard"} >Dashboard</NavItem> : <></>}

					<NavItem to="/checkout" isActive={location.pathname === "/checkout"}>Checkout</NavItem>
					<NavItem to="/checkin" isActive={location.pathname === "/checkin"}>Checkin</NavItem>
				</NavbarContainer>
				:
				<NavbarContainer></NavbarContainer>
			}
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
	width: 100%;
	align-items: center;
	gap: 40px 100px;
	justify-content: space-between;
	flex-direction: row;
	background-color: #f0f0f0;

	@media (max-width: 991px) {
		max-width: 100%;
	}
`;

const Logo = styled.div`
	color: #000;
	align-self: stretch;
	margin: auto 20px;
	font: 550 24px SansSerifBldFLF, sans-serif;
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 25px;
	justify-content: center;
	margin: auto 20px;
`;

const UserIcon = styled.img`
	aspect-ratio: 1;
	object-position: center;
	width: 40px;
	margin: 10px 20px 10px 0px;
	border-radius: 100px;
`;

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  text-decoration: none;

  @media (max-width: 991px) {
		max-width: 60%;
		padding: 12px;
  	}
`;

const NavItem = styled(Link)`
	text-decoration: none;
	color: #C0C0C0;
	padding: 10px 20px;
	border-radius: 8px;
	background-color: none;

	&:hover{
		color: #C1930B;
	}
	
	${({ isActive }) =>
		isActive &&
		`
		color: #C1930B;
		background-color: #FFF7DF;
		box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.05);
	`}
`;

export default Header;
