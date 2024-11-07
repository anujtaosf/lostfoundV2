import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import ItemsInUse from './ItemsInUse';
import MissingItems from './MissingItems';
import Notifications from './Notifications';

const TicketsDashboard = () => {
  return (
    <DashboardContainer>
      <Header />
      <WelcomeMessage>
        <Greeting>Hello Blake,</Greeting>
        <DashboardInfo>
          Here's your Tickets Dashboard. Click{' '}
          <HomeLink href="/">here</HomeLink> to go back home
        </DashboardInfo>
      </WelcomeMessage>
      <MainContent>
        <Column><ItemsInUse /></Column>
        <Column><MissingItems /></Column>
        <Column><Notifications /></Column>
      </MainContent>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.main`
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 0px;
  align: center;
  min-height: 832px;
  align-items: center;
  height: 100vh; 
  width: 100vw;
  padding: 0;    /* padding: 44px 32px 0; */

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 65px;
  align-items: flex-start;
  gap: 30px;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 240px; /* Prevent columns from getting too narrow */
`;

const WelcomeMessage = styled.div`
  display: flex;
  width: 95%;
  flex-direction: column;
  color: #000;
  justify-content: center;
  font: 700 22px Inter, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Greeting = styled.h1`
  font-size: 40px;
  margin: 0;
`;

const DashboardInfo = styled.p`
  font-weight: 500;
  margin: 15px 0 0;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const HomeLink = styled.a`
  font-weight: 700;
  color: #000;
  text-decoration: none;
`;


export default TicketsDashboard;