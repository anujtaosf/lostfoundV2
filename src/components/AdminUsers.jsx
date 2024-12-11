import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllUsers } from "../firebase/users";
import AdminUserCard from "./AdminUserCard";
import {ColumnContainer, SectionHeader, SectionTitle, ItemList, ScrollContainer} from "../styles/dashboard-column-styles"
const AdminUsers = ({handleFormStateChange}) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const handleGetUsers = async () => {
			const usr = await getAllUsers();
            console.log(usr);
			setUsers(usr);
		};

		handleGetUsers();
	}, []);

	return (
		<ColumnContainer>
			<SectionHeader>
				<SectionTitle>USERS</SectionTitle>
                <ActionButton onClick={() => {handleFormStateChange("user")}}>Add User</ActionButton>
			</SectionHeader>
			<ItemList>
				<ScrollContainer>
					{users.map((user, idx) => {
						return <AdminUserCard key={idx} user={user}/>
					})}
				</ScrollContainer>
			</ItemList>
		</ColumnContainer>
	);
};
export default AdminUsers;

const ActionButton = styled.button`
	border-radius: 100px;
	background-color: ${(props) => `${props.color}4D`};
	display: flex;
	align-items: center;
	gap: 10px;
	color: ${(props) => props.color};
	font-size: 12px;
	font-weight: 600;
	text-align: center;
	justify-content: center;
	width: 125px;
	padding: 5px 10px;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		transform: scale(1.05);
	}
`;