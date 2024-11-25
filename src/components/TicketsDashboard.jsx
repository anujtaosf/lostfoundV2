import React from "react";
import ItemsInUse from "./ItemsInUse";
import MissingItems from "./MissingItems";
import Notifications from "./Notifications";

import {
	DashboardContainer,
	DashboardHeader,
	DashboardTitle,
	Column,
	MainContent,
} from "../styles/dashboard-styles";

const TicketsDashboard = () => {
	return (
		<DashboardContainer>
			<DashboardHeader>
				<DashboardTitle>Tickets Dashboard</DashboardTitle>
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
