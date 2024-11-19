import React from "react";
import styled from 'styled-components';

const Landing = () => {
    return (
        <LandingContainer>
            <h1>Welcome to LostandFound+</h1>
            <h3>Our tool to help you keep track of your tools</h3>
        </LandingContainer>
    );
};

const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
    align-items: center;
    height: 100vh; 
    width: 100vw;
`;

export default Landing