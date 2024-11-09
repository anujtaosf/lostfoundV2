import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import MissingItemCard from './MissingItemCard';
import { isTimestampToday } from '../lib/time';
import { getOpenTickets } from '../firebase/ticket';

const missingItemsData = [
  { name: 'Hacksaw', time: '30 hours', user: 'Faye', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/869847049170febd1cbe668074b2ab2c025bb63aeb60e7b949205b9f0d9e0e52?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
  { name: 'Drill', time: '32 hours', user: 'Sumedha', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/75ed8eaf3767cf4017c612551ed700799f398e667cba11c1d94dfb8518504b09?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
  { name: 'Tweezer', time: '34 hours', user: 'Anu', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5e1094353031181efb52d82028fde08ee899ccb0e1d1514432e522e0e4807562?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
  { name: 'Solderer', time: '40 hours', user: 'Anu', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/75ed8eaf3767cf4017c612551ed700799f398e667cba11c1d94dfb8518504b09?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
];

const MissingItems = () => {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    refreshTickets();
  }, [])

  const refreshTickets = async () => {
    const tx = await getOpenTickets();
    const todayTickets = tx.filter((ticket) => {
      return !isTimestampToday(ticket.created_at)
    })
    setTickets(todayTickets);
  }

  return (
    <MissingItemsContainer>
      <SectionHeader>
        <Title>MISSING ITEMS</Title>
      </SectionHeader>
      <ItemList>
        {tickets.map((ticket, index) => (
          <MissingItemCard key={index} ticket={ticket} />
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
  padding: 0px 0px 20px 20px;
  width: 325px;

  @media (max-width: 991px) {
    max-width: 100%;
  }
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

export default MissingItems;