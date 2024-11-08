import React from 'react';
import styled from 'styled-components';
import MissingItemCard from './MissingItemCard';

const missingItemsData = [
  { name: 'Hacksaw', time: '30 hours', user: 'Faye', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/869847049170febd1cbe668074b2ab2c025bb63aeb60e7b949205b9f0d9e0e52?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
  { name: 'Drill', time: '32 hours', user: 'Sumedha', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/75ed8eaf3767cf4017c612551ed700799f398e667cba11c1d94dfb8518504b09?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
  { name: 'Tweezer', time: '34 hours', user: 'Anu', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5e1094353031181efb52d82028fde08ee899ccb0e1d1514432e522e0e4807562?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
  { name: 'Solderer', time: '40 hours', user: 'Anu', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/75ed8eaf3767cf4017c612551ed700799f398e667cba11c1d94dfb8518504b09?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
];

const MissingItems = () => {
  return (
    <MissingItemsContainer>
      <SectionHeader>
        <Title>MISSING ITEMS</Title>
        <IconGroup>
          <IconWrapper>
            <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/43c114a7d7c29a0f540f96ffab94249a561d4fba881afaa3f3eb29836aef55ea?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Filter icon" />
          </IconWrapper>
          <IconWrapper>
            <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/46d1f61e1ec0728f381ea00e0b78972b0ec941c6a42b6953a013f4b0a0872d43?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Sort icon" />
          </IconWrapper>
        </IconGroup>
      </SectionHeader>
      <ItemList>
        {missingItemsData.map((item, index) => (
          <MissingItemCard key={index} {...item} />
        ))}
      </ItemList>
    </MissingItemsContainer>
  );
};

const MissingItemsContainer = styled.section`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: flex-start;
  width: 439px;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const SectionHeader = styled.div`
  border-radius: 12px 12px 0 0;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px;

  @media (max-width: 991px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  color: #000;
  text-align: center;
  font: 700 22px Inter, sans-serif;
  margin: 0;
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconWrapper = styled.div`
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 41px;
  height: 41px;
  padding: 8px;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ItemList = styled.div`
  border-radius: 0 0 12px 12px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 25px;

  @media (max-width: 991px) {
    padding: 20px;
  }
`;

export default MissingItems;