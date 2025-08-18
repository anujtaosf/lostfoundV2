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
				<ToggleWrap role="tablist" aria-label="Location">
					<Toggle $active={currentLocation === "frb"} onClick={() => setCurrentLocation("frb")} role="tab" aria-selected={currentLocation === "frb"}>
						FRB Makerspace
					</Toggle>
					<Toggle $active={currentLocation === "wilson"} onClick={() => setCurrentLocation("wilson")} role="tab" aria-selected={currentLocation === "wilson"}>
						Wilson Center
					</Toggle>
				</ToggleWrap>
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

const ToggleWrap = styled.div`
	display: inline-flex;
	background: #e9edf8;
	border-radius: 999px;
	padding: 4px;
	gap: 4px;
	margin-top: 10px;
	margin-bottom: 25px;
`;

const Toggle = styled.button`
	appearance: none;
	border: none;
	cursor: pointer;
	padding: 6px 12px;
	border-radius: 999px;
	font-weight: 700;
	background: ${(p) => (p.$active ? "#ffffff" : "transparent")};
	color: ${(p) => (p.$active ? "#0d2a44" : "#4b5563")};
	box-shadow: ${(p) => (p.$active ? "0 1px 2px rgba(0,0,0,.08)" : "none")};
	&:hover {
		background: ${(p) => (p.$active ? "#ffffff" : "rgba(255, 255, 255, 0.6)")};
	}
`;