import React from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';

const itemsInUseData = [
  { name: 'Scissors', time: '5:06 pm', user: 'Anu Tao', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/15f671324f37bfc292a1b3f7d57741fd37e5bc3a6166b230097c9d54ac3e673b?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
  { name: 'Scissors', time: '5:06 pm', user: 'Anu Tao', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/15f671324f37bfc292a1b3f7d57741fd37e5bc3a6166b230097c9d54ac3e673b?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
  { name: 'Mouse', time: '5:10 pm', user: 'Anu Tao', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/79de4503c893c14b45a4f49044969b7007bb5b80c65508fcdad176a9a02ddff2?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
];

const ItemsInUse = () => {
  return (
    <ItemsInUseContainer>
      <SectionHeader>
        <Title>ITEMS IN USE</Title>
        <IconGroup>
          <IconWrapper>
            <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/31e3796dcbe4cc463c90f0b547822b0e5de78f68a0815b53aa4727ef0235adf9?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Filter icon" />
          </IconWrapper>
          <IconWrapper>
            <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/46d1f61e1ec0728f381ea00e0b78972b0ec941c6a42b6953a013f4b0a0872d43?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Sort icon" />
          </IconWrapper>
        </IconGroup>
      </SectionHeader>
      <ItemList>
        {itemsInUseData.map((item, index) => (
          <ItemCard key={index} {...item} />
        ))}
      </ItemList>
    </ItemsInUseContainer>
  );
};

const ItemsInUseContainer = styled.section`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 369px;
`;

const SectionHeader = styled.div`
  border-radius: 12px 12px 0 0;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  width: 100%;
  max-width: 369px;
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
  width: 100%;
  padding: 20px 25px;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 991px) {
    padding: 20px;
  }
`;

export default ItemsInUse;