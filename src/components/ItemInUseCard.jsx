import React from 'react';
import styled from 'styled-components';
import { formatTimestampToTime } from '../lib/time';

const icons = {
  1: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5e1094353031181efb52d82028fde08ee899ccb0e1d1514432e522e0e4807562?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208',
  2: 'https://cdn.builder.io/api/v1/image/assets/TEMP/869847049170febd1cbe668074b2ab2c025bb63aeb60e7b949205b9f0d9e0e52?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208',
  3: 'https://cdn.builder.io/api/v1/image/assets/TEMP/75ed8eaf3767cf4017c612551ed700799f398e667cba11c1d94dfb8518504b09?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208'
}

const ItemInUseCard = ({ ticket }) => {
  const icon = icons[ticket.tool_rating]
  const name = ticket.tool
  const time = formatTimestampToTime(ticket.created_at);
  const user = ticket.user

  return (
    <CardContainer>
      <ItemInfo>
        <ItemName>{name}</ItemName>
        <ItemIcon src={icon} alt={`${name} icon`} />
      </ItemInfo>
      <ItemDetails>
        <DetailGroup>
          <DetailIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f80d02229bbae59b3d3e8a0234eecc643adc9a7fd40819d77223ca79f4ee3a7?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Time icon" />
          <DetailText>{time}</DetailText>
        </DetailGroup>
        <DetailGroup>
          <DetailIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/586330f2e470d2582ebf12aca71e4594cb414acf92a2a1705f81fd5def553b80?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="User icon" />
          <DetailText>{user}</DetailText>
        </DetailGroup>
      </ItemDetails>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.7);
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
  margin-top: 15px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  justify-content: center;
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
  color: ${props => props.color || '#000'};
  font-size: 18px;
`;

export default ItemInUseCard;