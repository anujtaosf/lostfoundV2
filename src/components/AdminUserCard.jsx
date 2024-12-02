import styled from "styled-components";

const AdminUserCard = ({ user }) => {
	return (
		<CardContainer>
			<ItemInfo>
				<ItemName>{user.uniqname}</ItemName>
			</ItemInfo>
			<ItemDetails>
				<DetailGroup>
					<DetailText>{user.role}</DetailText>
				</DetailGroup>
			</ItemDetails>
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

const ItemName = styled.div`
	font-size: 18px;
`;

const ItemDetails = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: 400;
	justify-content: space-between;
`;

const DetailGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	justify-content: flex-end;
	margin-top: ${(props) => props.marginTop || "0"};
`;

const DetailText = styled.div`
	color: #00274c;
	font-size: 18px;
`;

export default AdminUserCard;
