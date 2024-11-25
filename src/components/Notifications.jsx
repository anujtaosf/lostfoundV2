import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NotificationCard from "./NotificationCard";
import { getOpenNotifications } from "../firebase/notifications";
import { ColumnContainer, SectionTitle, SectionHeader, ItemList, ScrollContainer } from "../styles/dashboard-column-styles";

const Notifications = () => {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		handleGetNotifications();
	}, [])

	const handleGetNotifications = async () => {
		const notifications = await getOpenNotifications();
		setNotifications(notifications);
	}

	return (
		<ColumnContainer>
			<SectionHeader>
				<SectionTitle>NOTIFICATIONS</SectionTitle>
			</SectionHeader>
			<ItemList>
				<ScrollContainer>
					{notifications.map((notif, index) => (
						<NotificationCard key={index} notif={notif} handleGetNotifications={handleGetNotifications} />
					))}
				</ScrollContainer>
			</ItemList>
		</ColumnContainer>
	);
};

export default Notifications;
