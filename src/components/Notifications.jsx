import React from 'react';
import styled from 'styled-components';

const Notifications = () => {
  return (
    <NotificationsContainer>
      <SectionHeader>
        <Title>NOTIFICATIONS</Title>
        <IconGroup>
          <IconWrapper>
            <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/f95ef0a56f1fb70e728da1a5a1db5bd9ebc69fbc27ce247804cc8cc5fe610898?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Filter icon" />
          </IconWrapper>
          <IconWrapper>
            <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/137ef5c016491be442199a4246ef29a5128917888772892061f6ee96209f3fcf?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Sort icon" />
          </IconWrapper>
        </IconGroup>
      </SectionHeader>
      <NotificationList>
        <NotificationItem>
          <NotificationTitle>Item Detected</NotificationTitle>
          <NotificationIcon />
          <ClassifyButton>
            <ButtonIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5745de82f165d279cb9340db157938c52efe244a95bb11921988bf95ffbf418?placeholderIfAbsent=true&apiKey=74fbfc420745470bbcfc2ad34496c208" alt="Classify icon" />
            Classify
          </ClassifyButton>
        </NotificationItem>
      </NotificationList>
    </NotificationsContainer>
  );
};

const NotificationsContainer = styled.section`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: flex-start;
  width: 349px;
`;

const SectionHeader = styled.div`
  border-radius: 12px 12px 0 0;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  width: 100%;
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

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconWrapper = styled.div`
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 41px;
  height: 41px;
  padding: 8px;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const NotificationList = styled.div`
  border-radius: 0 0 12px 12px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  padding: 20px 25px;

  @media (max-width: 991px) {
    padding: 20px;
  }
`;

const NotificationItem = styled.div`
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const NotificationTitle = styled.div`
  font-size: 18px;
  color: #00274c;
  font-weight: 600;
`;

const NotificationIcon = styled.div`
  width: 18px;
  height: 22px;
  margin-top: 15px;
  background-image: url('http://b.io/ext_vector-');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ClassifyButton = styled.button`
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

export default Notifications;