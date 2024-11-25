import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getOpenTickets } from "../firebase/ticket";
import ItemInUseCard from "./ItemInUseCard";
import { isTimestampToday } from "../lib/time";
import { ColumnContainer, SectionHeader, SectionTitle, ItemList, ScrollContainer} from "../styles/dashboard-column-styles"
/*
const itemsInUseData = [
  { name: 'Scissors', time: '5:06 pm', user: 'Anu Tao', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/15f671324f37bfc292a1b3f7d57741fd37e5bc3a6166b230097c9d54ac3e673b?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
  { name: 'Scissors', time: '5:06 pm', user: 'Anu Tao', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/15f671324f37bfc292a1b3f7d57741fd37e5bc3a6166b230097c9d54ac3e673b?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
  { name: 'Mouse', time: '5:10 pm', user: 'Anu Tao', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/79de4503c893c14b45a4f49044969b7007bb5b80c65508fcdad176a9a02ddff2?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208' },
];
*/

const ItemsInUse = () => {
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		refreshTickets();
	}, []);

	const refreshTickets = async () => {
		const tx = await getOpenTickets();
		const todayTickets = tx.filter(ticket => isTimestampToday(ticket.created_at))
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
