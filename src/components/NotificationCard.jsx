import React from 'react';
import styled from 'styled-components';

const NotificationCard = ({ message, action, icon}) => {
    return (
      <CardContainer>
        <ItemInfo>
            <NotificationTitle>{message}</NotificationTitle>
        </ItemInfo>
        <ActionButton>
            <ButtonIcon src={icon} alt={`${action} icon`} />
            {action}
        </ActionButton>
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

const NotificationTitle = styled.div`
  font-size: 18px;
`;

const ActionButton = styled.button`
border-radius: 100px;
background-color: rgba(255, 194, 15, 0.3);
display: flex;
align-items: center;
gap: 7px;
font-size: 12px;
color: #ffc20f;
font-weight: 400;
text-align: center;
justify-content: center;
width: 125px;
padding: 5px 0;
border: none;
cursor: pointer;
margin-top: 15px;
`;

const ButtonIcon = styled.img`
aspect-ratio: 1;
object-fit: contain;
width: 11px;
`;

export default NotificationCard;


