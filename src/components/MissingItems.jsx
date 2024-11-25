import React, {useState, useEffect} from 'react';
import MissingItemCard from './MissingItemCard';
import { isTimestampToday } from '../lib/time';
import { getOpenTickets } from '../firebase/ticket';
import { ColumnContainer, SectionHeader, SectionTitle, ItemList, ScrollContainer } from '../styles/dashboard-column-styles';

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
    <ColumnContainer>
      <SectionHeader>
        <SectionTitle>MISSING ITEMS</SectionTitle>
      </SectionHeader>
      <ItemList>
        <ScrollContainer>
          {tickets.map((ticket, index) => (
            <MissingItemCard key={index} ticket={ticket} refreshTickets={refreshTickets} />
          ))}
        </ScrollContainer>
      </ItemList>
    </ColumnContainer>
  );
};

export default MissingItems;