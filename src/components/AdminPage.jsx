import AdminTools from "./AdminTools";
import { useState } from "react";
import AddToolForm from "./AddToolForm";
import AdminUsers from "./AdminUsers";
import AddUserForm from "./AddUserForm";
import { DashboardContainer, MainContent, Column, DashboardHeader, DashboardTitle } from "../styles/dashboard-styles";

// ... inside your JSX near the Tools column:
const AdminPage = () => {
	const [formState, setFormState] = useState("");

	const handleFormStateChange = (state) => {
		let newState = state;

		if (formState === state) {
			newState = "";
		}
		
		setFormState(newState);
	}
	return (
		<>
			<DashboardContainer>
				<DashboardHeader>
					<DashboardTitle>Inventory and Staff Dashboard</DashboardTitle>
				</DashboardHeader>
				<MainContent>
					<Column>
						<AdminTools handleFormStateChange={handleFormStateChange} />
					</Column>
					<Column>
						<AdminUsers handleFormStateChange={handleFormStateChange} />
					</Column>
					{formState === "user" ? (
						<Column>
							<AddUserForm />
						</Column>
					) : (
						<></>
					)}
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
