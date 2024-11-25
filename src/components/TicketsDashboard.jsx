import React from "react";
import ItemsInUse from "./ItemsInUse";
import MissingItems from "./MissingItems";
import Notifications from "./Notifications";
import styled from "styled-components";
import {
	DashboardContainer,
	DashboardHeader,
	DashboardTitle,
	Column,
	MainContent,
} from "../styles/dashboard-styles";
import { useDashboard } from "../context/dashboardContext";

const TicketsDashboard = () => {
	const { currentLocation, setCurrentLocation } = useDashboard();

	return (
		<DashboardContainer>
			<DashboardHeader>
				<DashboardTitle>Tickets Dashboard</DashboardTitle>
				<Select id="location" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)}>
					<option value="frb">FRB Makerspace</option>
					<option value="wilson">Wilson Center</option>
				</Select>
			</DashboardHeader>
			<MainContent>
				<Column>
					<ItemsInUse />
				</Column>
				<Column>
					<MissingItems />
				</Column>
				<Column>
					<Notifications />
				</Column>
			</MainContent>
		</DashboardContainer>
	);
};

export default TicketsDashboard;

export const Select = styled.select`
	padding: 8px;
	margin: 10px;
	margin-bottom: 25px;
	display: center;
	border-radius: 6px;

	&:focus {
		outline: none;
		box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
	}
`;