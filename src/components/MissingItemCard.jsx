import React, { useState } from "react";
import styled from 'styled-components';
import { formatTimestampToDuration } from '../lib/time';
import { closeTicket, getOpenTicketsFromUser } from "../firebase/ticket";

const icons = {
  1: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5e1094353031181efb52d82028fde08ee899ccb0e1d1514432e522e0e4807562?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208',
  2: 'https://cdn.builder.io/api/v1/image/assets/TEMP/869847049170febd1cbe668074b2ab2c025bb63aeb60e7b949205b9f0d9e0e52?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208',
  3: 'https://cdn.builder.io/api/v1/image/assets/TEMP/75ed8eaf3767cf4017c612551ed700799f398e667cba11c1d94dfb8518504b09?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208'
}

const MissingItemCard = ({ ticket }) => {
  const icon = icons[ticket.tool_rating]
  const name = ticket.tool
  const time = formatTimestampToDuration(ticket.created_at);
  const user = ticket.user

  const [selectedTicket] = useState("");


  const DismissClick = async (e) =>{
    e.preventDefault(); // Prevent page reload
    closeTicket("9y5CoDPAi7ZykVOIStb5"); // TODO:  Need to figure out how to get id
  };

  const ContactClick = () =>{
    const email = user + "@umich.edu"
    console.log(email)
  };

  return (
    <CardContainer>
      <ItemInfo>
        <ItemName>{name}</ItemName>
        <ItemIcon src={icon} alt={`${name} icon`} />
      </ItemInfo>
      <ActionButtons>
        <ActionButton onClick={DismissClick} color="#E07B7B">
          <ButtonIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/e59ad9e6f2ce0204f143d5e1d323a093335b061c0c2a8e996f1af784f18cbddf?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Dismiss icon" />
          DISMISS
        </ActionButton>
        <ActionButton onClick={ContactClick} color="#69B984">
          <ButtonIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ef5d023992f3dcd56c5ca590a6975bbc4bbace83c6f2e5238a132929db165e0?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Contact icon" />
          CONTACT
        </ActionButton>
      </ActionButtons>
      <ItemDetails>
        <DetailGroup>
          <DetailIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/2978a3e3fd74e3d25968f47abcb5308d762f64b6cea9ede331bceaa5cc678b37?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Time icon" />
          <DetailText>{time} hrs</DetailText>
        </DetailGroup>
        <DetailGroup marginTop="21px">
          <DetailIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/27fb37158bb14cafed6d3137657c9e85e27b1a9eafd4da3b78dbe895d02651ad?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="User icon" />
          <DetailText>{user}</DetailText>
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

const ItemIcon = styled.img`
  aspect-ratio: 0.82;
  object-fit: contain;
  width: 18px;
  margin-top: 21px;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ActionButton = styled.button`
  border-radius: 100px;
  background-color: ${props => `${props.color}4D`};
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${props => props.color};
  font-size: 12px;
  font-weight: 400;
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

const ButtonIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  width: 11px;
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
  margin-top: ${props => props.marginTop || '0'};
`;

const DetailIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  width: 20px;
`;

const DetailText = styled.div`
  color: #00274c;
  font-size: 18px;
`;

export default MissingItemCard;