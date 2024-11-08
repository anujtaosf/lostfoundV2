import React from 'react';
import styled from 'styled-components';
import ItemsInUse from './ItemsInUse';
import MissingItems from './MissingItems';
import Notifications from './Notifications';

const InventoryDashboard = () => {
  return (
    <DashboardContainer>
      <MainContent>
        <ItemsInUse />
        <MissingItems />
        <Notifications />
      </MainContent>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.main`
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 264px;
  min-height: 832px;
  width: 100%;
  padding: 44px 32px 0;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const MainContent = styled.div`
  display: flex;
  margin-top: 65px;
  align-items: flex-start;
  gap: 30px;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

export default InventoryDashboard;