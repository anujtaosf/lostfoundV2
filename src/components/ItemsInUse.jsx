import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getOpenTickets } from "../firebase/ticket";
import ItemInUseCard from "./ItemInUseCard";
import { isTimestampToday } from "../lib/time";
import {
	ColumnContainer,
	SectionHeader,
	SectionTitle,
	ItemList,
	ScrollContainer,
} from "../styles/dashboard-column-styles";
import { useDashboard } from "../context/dashboardContext";

const ItemsInUse = () => {
	const [tickets, setTickets] = useState([]);
	const { currentLocation } = useDashboard();

	useEffect(() => {
		refreshTickets();
	}, [currentLocation]);

	const refreshTickets = async () => {
		const tx = await getOpenTickets();
		const todayTickets = tx.filter(
			(ticket) => isTimestampToday(ticket.created_at) && ticket.location === currentLocation
		);
		setTickets(todayTickets);
	};

	return (
		<ColumnContainer>
			<SectionHeader>
				<SectionTitle>ITEMS IN USE</SectionTitle>
			</SectionHeader>
			<ItemList>
				<ScrollContainer>
					{tickets.map((ticket, index) => (
						<ItemInUseCard key={index} ticket={ticket} />
					))}
				</ScrollContainer>
			</ItemList>
		</ColumnContainer>
	);
};

export default ItemsInUse;
