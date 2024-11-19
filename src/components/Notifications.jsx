import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NotificationCard from "./NotificationCard";
import { getOpenNotifications } from "../firebase/notifications";

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
		<NotificationsContainer>
			<SectionHeader>
				<Title>NOTIFICATIONS</Title>
			</SectionHeader>
			<ItemList>
				{notifications.map((notif, index) => (
					<NotificationCard key={index} notif={notif} handleGetNotifications={handleGetNotifications} />
				))}
			</ItemList>
		</NotificationsContainer>
	);
};

const NotificationsContainer = styled.section`
	display: flex;
	min-width: 240px;
	flex-direction: column;
	justify-content: flex-start;
	width: 325px;
	padding: 0px 0px 20px 20px;
`;

const SectionHeader = styled.div`
	border-radius: 12px 12px 0 0;
	background-color: rgba(255, 255, 255, 0.9);
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
export default Notifications;
