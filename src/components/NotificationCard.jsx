import React from "react";
import styled from "styled-components";
import { closeNotification } from "../firebase/notifications";

const NOTIFICATION_MAP = {
	broken: {
		message: "Broken Tool",
		action: "DISMISS",
		icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e59ad9e6f2ce0204f143d5e1d323a093335b061c0c2a8e996f1af784f18cbddf?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208",
		color: "#E07B7B"
	},
	classify: {
		message: "Item Detected",
		action: "CLASSIFY",
		icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c5745de82f165d279cb9340db157938c52efe244a95bb11921988bf95ffbf418?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208",
		color: "#ffc20f"
	}
}


const NotificationCard = ({ notif,  handleGetNotifications }) => {
	const {message, action, icon, color} = NOTIFICATION_MAP[notif.type];

	const handleAction = () => {
		closeNotification(notif.id);
		handleGetNotifications();
	}

	return (
		<CardContainer>
			<ItemInfo>
				<NotificationTitle>{message}</NotificationTitle>
			</ItemInfo>
			<ActionButton onClick={() => {handleAction()}} color={color}>
				<ButtonIcon src={icon} alt={`${action} icon`} />
				{action}
			</ActionButton>
		</CardContainer>
	);
};

const CardContainer = styled.div`
	border-radius: 12px;
	background-color: rgba(255, 255, 255, 0.5);
	display: flex;
	width: 100%;
	justify-content: space-between;
	padding: 10px;
`;

const ItemInfo = styled.div`
	display: flex;
	flex-direction: column;
	color: #00274c;
	font-weight: 600;
`;

const NotificationTitle = styled.div`
	font-size: 18px;
`;

const ActionButton = styled.button`
	border-radius: 100px;
	background-color: ${props => `${props.color}4D`};
	display: flex;
	align-items: center;
	gap: 7px;
	font-size: 12px;
	color: ${props => props.color};
	font-weight: 400;
	text-align: center;
	justify-content: center;
	width: 125px;
	padding: 5px 0;
	border: none;
	cursor: pointer;
	margin-top: 15px;
`;

const ButtonIcon = styled.img`
	aspect-ratio: 1;
	object-fit: contain;
	width: 11px;
`;

export default NotificationCard;
