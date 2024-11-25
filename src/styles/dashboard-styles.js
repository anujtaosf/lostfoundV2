import styled from "styled-components";

export const DashboardContainer = styled.main`
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 0px;
  align: center;
  min-height: 832px;
  align-items: center;
  height: 90vh; 
  width: 100vw;
  padding: 0;    /* padding: 44px 32px 0; */

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 30px;
  align-items: flex-start;
  gap: 30px;
  height: 100vh;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

export const Column = styled.div`
  flex: 1;
  min-width: 240px; /* Prevent columns from getting too narrow */
`;

export const DashboardHeader = styled.div`
  display: flex;
  margin-top: 20px;
  width: 95%;
  flex-direction: row;
  color: #000;
  justify-content: center;
  font: 700 22px Inter, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export const DashboardTitle = styled.h1`
  font-size: 40px;
  margin: 0;
`;

export const DashboardInfo = styled.p`
  font-weight: 500;
  margin: 15px 0 0;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

