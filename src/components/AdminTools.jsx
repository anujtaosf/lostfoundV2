import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllTools } from "../firebase/tools";
import AdminToolCard from "./AdminToolCard";
import { getInventory } from "../lib/inventory";
import {ColumnContainer, SectionHeader, SectionTitle, ItemList, ScrollContainer} from "../styles/dashboard-column-styles"
const AdminTools = ({handleFormStateChange}) => {
	const [tools, setTools] = useState([]);
    const [inventory, setInventory] = useState({});

	useEffect(() => {
		const handleGetTools = async () => {
			const tls = await getAllTools();
			tls.sort((a, b) => a.name.localeCompare(b.name));
			setTools(tls);
		};

        const handleGetInventory = async () => {
            const inv = await getInventory();
            setInventory(inv);
        }

		handleGetTools();
        handleGetInventory();
	}, []);

	

	return (
		<ColumnContainer>
			<SectionHeader>
				<SectionTitle>TOOLS</SectionTitle>
                <ActionButton onClick={() => {handleFormStateChange("tool")}}>Add Tool</ActionButton>
			</SectionHeader>
			<ItemList>
				<ScrollContainer>
					{tools.map((tool, idx) => {
						return <AdminToolCard key={idx} tool={tool} inventory={inventory[tool.name]} />
					})}
				</ScrollContainer>
			</ItemList>
		</ColumnContainer>
	);
};
export default AdminTools;

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