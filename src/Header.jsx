import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>LostAndFound+</Logo>
      <UserInfo>
        <UserIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/1394bf55adad9bce9b5db46599eb47259925b3b28609188c86776a691a908cdd?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="User avatar" />
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

export default Header;