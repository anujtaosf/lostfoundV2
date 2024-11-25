import styled from "styled-components";
import AdminTools from "./AdminTools";
import { useState } from "react";
import AddToolForm from "./AddToolForm";

const AdminPage = () => {
	const [formState, setFormState] = useState("");

	return (
		<>
			<DashboardContainer>
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

const DashboardContainer = styled.main`
	background-color: #f0f0f0;
	display: flex;
	flex-direction: column;
	overflow-y: hidden;
	border-radius: 0px;
	align: center;
	min-height: 832px;
	align-items: center;
	height: 90vh;
	width: 100vw;
	padding: 0; /* padding: 44px 32px 0; */

	@media (max-width: 991px) {
		max-width: 100%;
		padding: 0 20px;
	}
`;

const Column = styled.div`
	flex: 1;
	min-width: 240px; /* Prevent columns from getting too narrow */
`;

const MainContent = styled.div`
	display: flex;
	flex-direction: row;
	gap: 20px;

	align-items: flex-start;
	justify-content: space-between;
	flex-wrap: wrap;

	@media (max-width: 991px) {
		max-width: 100%;
		margin-top: 40px;
	}
`;
