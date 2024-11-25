import styled from "styled-components";

export const ColumnContainer = styled.section`
	display: flex;
	min-width: 240px;
	flex-direction: column;
	justify-content: flex-start;
	padding: 0px 20px 20px 20px;
	width: 325px;
	height: 100%;

	@media (max-width: 991px) {
		max-width: 100%;
	}
`;

export const SectionHeader = styled.div`
	border-radius: 12px 12px 0 0;
	background-color: rgba(255, 255, 255, 0.9);
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	padding: 20px;

	@media (max-width: 991px) {
	}
`;

export const SectionTitle = styled.h2`
	color: #000;
	text-align: center;
	font: 700 22px Inter, sans-serif;
	margin: 0;
`;

export const ItemList = styled.div`
	border-radius: 0 0 12px 12px;
	background-color: rgba(255, 255, 255, 0.4);
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	padding: 20px;

	@media (max-width: 991px) {
		padding: 20px;
	}
`;

export const ScrollContainer = styled.div`
	border-radius: 0 0 12px 12px;
	display: flex;
	width: 100%;
	height: 60vh;
	overflow-y: scroll;
	overflow-x: hidden;
	padding: 20px 25px;
	flex-direction: column;
	gap: 20px;
	align-items: center;

	&::-webkit-scrollbar {
  		display: none;
	}
`;