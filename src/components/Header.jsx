import React from 'react';
import styled from 'styled-components';
import { SignIn, SignOut } from './Auth';
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { currentUser, userLoggedIn } = useAuth();
  
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo>LostAndFound+</Logo>
      </Link>
      <UserInfo>
        <UserIcon src={"https://cdn.builder.io/api/v1/image/assets/TEMP/1394bf55adad9bce9b5db46599eb47259925b3b28609188c86776a691a908cdd?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208"} alt="User avatar" />
      </UserInfo>
      <WelcomeMessage>
        <Greeting>Good Morning{userLoggedIn ? `, ${currentUser.displayName}` : ""}</Greeting>
        <DashboardInfo>
          Here's your Inventory Dashboard. Click{' '}
          <HomeLink href="/">here</HomeLink> to go back home
        </DashboardInfo>
      </WelcomeMessage>
      <Link to="/dashboard">
        Dashboard
      </Link>
      <SignIn />
      <SignOut />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
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

const WelcomeMessage = styled.div`
  align-self: flex-start;
  display: flex;
  margin-top: 8px;
  flex-direction: column;
  color: #000;
  justify-content: center;
  font: 700 22px Inter, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Greeting = styled.h1`
  font-size: 40px;
  margin: 0;
`;

const DashboardInfo = styled.p`
  font-weight: 500;
  margin: 15px 0 0;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const HomeLink = styled.a`
  font-weight: 700;
  color: #000;
  text-decoration: none;
`;

export default Header;