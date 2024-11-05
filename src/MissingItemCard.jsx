import React from 'react';
import styled from 'styled-components';

const MissingItemCard = ({ name, time, user, icon }) => {
  return (
    <CardContainer>
      <ItemInfo>
        <ItemName>{name}</ItemName>
        <ItemIcon src={icon} alt={`${name} icon`} />
      </ItemInfo>
      <ActionButtons>
        <ActionButton color="#E07B7B">
          <ButtonIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/e59ad9e6f2ce0204f143d5e1d323a093335b061c0c2a8e996f1af784f18cbddf?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Dismiss icon" />
          DISMISS
        </ActionButton>
        <ActionButton color="#69B984">
          <ButtonIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ef5d023992f3dcd56c5ca590a6975bbc4bbace83c6f2e5238a132929db165e0?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Contact icon" />
          CONTACT
        </ActionButton>
      </ActionButtons>
      <ItemDetails>
        <DetailGroup>
          <DetailIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/2978a3e3fd74e3d25968f47abcb5308d762f64b6cea9ede331bceaa5cc678b37?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Time icon" />
          <DetailText>{time}</DetailText>
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