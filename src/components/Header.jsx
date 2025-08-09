// Header.jsx
import React from "react";
import styled from "styled-components";
import { SignIn, SignOut } from "./Auth";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Header = () => {
  const { currentUser, userLoggedIn, userRole } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  const isToolFlow =
    path === "/tool" || path === "/checkout" || path === "/checkin";

  return (
    <HeaderContainer>
      <Logo>LostAndFound+</Logo>

      <NavbarContainer>
        {userRole === "admin" && (
          <>
            <NavItem to="/dashboard" isActive={path === "/dashboard"}>
              Dashboard
            </NavItem>
            <NavItem to="/admin" isActive={path === "/admin"}>
              Inventory
            </NavItem>
          </>
        )}

        {/* Single entry for the whole borrow/return flow */}
        <NavItem to="/tool" isActive={isToolFlow}>
          Tool Checkout
        </NavItem>
      </NavbarContainer>

      <UserInfo>
        <SignIn />
        <SignOut />
        {userLoggedIn && <UserIcon src={currentUser.photoURL} alt="User" />}
      </UserInfo>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex; width: 100vw; align-items: center; justify-content: space-between;
  gap: 40px 100px; background-color: #f0f0f0; height: 10vh;
`;
const Logo = styled.div` color:#000; margin: auto 20px; font: 550 24px SansSerifBldFLF, sans-serif; `;
const UserInfo = styled.div` display:flex; align-items:center; gap:25px; margin: auto 20px; `;
const UserIcon = styled.img` width:40px; aspect-ratio:1; border-radius:100px; margin:10px 20px 10px 0; `;
const NavbarContainer = styled.div` display:flex; align-items:center; gap:40px; `;
const NavItem = styled(Link)`
  text-decoration:none; color:#C0C0C0; padding:10px 20px; border-radius:8px;
  &:hover { color:#C1930B; }
  ${({ isActive }) =>
    isActive &&
    `color:#C1930B; background:#FFF7DF; box-shadow:0 0 2px 2px rgba(0,0,0,.05);`}
`;

export default Header;
