import AdminTools from "./AdminTools";
import { useState } from "react";
import AddToolForm from "./AddToolForm";
import { DashboardContainer, MainContent, Column, DashboardHeader, DashboardTitle } from "../styles/dashboard-styles";
const AdminPage = () => {
	const [formState, setFormState] = useState("");

	return (
		<>
			<DashboardContainer>
				<DashboardHeader>
					<DashboardTitle>Inventory and Staff Dashboard</DashboardTitle>
				</DashboardHeader>
				<MainContent>
					<Column>
						<AdminTools setFormState={setFormState} />
					</Column>
					{formState === "tool" ? (
						<Column>
							<AddToolForm />
						</Column>
					) : (
						<></>
					)}
				</MainContent>
			</DashboardContainer>
		</>
	);
};
export default AdminPage;
