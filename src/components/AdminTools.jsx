import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllTools } from "../firebase/tools";
import AdminToolCard from "./AdminToolCard";
import { getInventory } from "../lib/inventory";

const AdminTools = ({setFormState}) => {
	const [tools, setTools] = useState([]);
    const [inventory, setInventory] = useState({});

	useEffect(() => {
		const handleGetTools = async () => {
			const tls = await getAllTools();
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
				<Title>TOOLS</Title>
                <ActionButton onClick={() => {setFormState("tool")}}>Add Tool</ActionButton>
			</SectionHeader>
			<ItemList>
				{tools.map((tool, idx) => {
					return <AdminToolCard key={idx} tool={tool} inventory={inventory[tool.name]} />
				})}
			</ItemList>
		</ColumnContainer>
	);
};
export default AdminTools;

const ColumnContainer = styled.section`
	display: flex;
	min-width: 240px;
	flex-direction: column;
	justify-content: flex-start;
	padding: 0px 0px 20px 20px;
	width: 325px;

	@media (max-width: 991px) {
		max-width: 100%;
	}
`;

const SectionHeader = styled.div`
	border-radius: 12px 12px 0 0;
	background-color: rgba(255, 255, 255, 0.9);
	display: flex;
	width: 100%;
	max-width: 369px;
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