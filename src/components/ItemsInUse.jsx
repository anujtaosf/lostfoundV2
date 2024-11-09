import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { getOpenTickets } from '../firebase/ticket';
import ItemInUseCard from './ItemInUseCard';


const itemsInUseData = [
  { name: 'Scissors', time: '5:06 pm', user: 'Anu Tao', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/15f671324f37bfc292a1b3f7d57741fd37e5bc3a6166b230097c9d54ac3e673b?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
  { name: 'Scissors', time: '5:06 pm', user: 'Anu Tao', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/15f671324f37bfc292a1b3f7d57741fd37e5bc3a6166b230097c9d54ac3e673b?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
  { name: 'Mouse', time: '5:10 pm', user: 'Anu Tao', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/79de4503c893c14b45a4f49044969b7007bb5b80c65508fcdad176a9a02ddff2?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
];

const ItemsInUse = () => {
  const [tickets, setTickets] = useState([])

  const refresh = async () => {
    const tx = await getOpenTickets();
    console.log(tx);
    setTickets(tx);
  }

  return (
    <ItemsInUseContainer>
      <SectionHeader>
        <Title>ITEMS IN USE</Title>
      </SectionHeader>
      <ItemList>
        {itemsInUseData.map((item, index) => (
          <ItemInUseCard key={index} {...item} />
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
  background-color: rgba(255, 255, 255, 0.9);
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

const ItemList = styled.div`
  border-radius: 0 0 12px 12px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  width: 100%;
  padding: 20px 25px;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  @media (max-width: 991px) {
    padding: 20px;
  }
`;

export default ItemsInUse;