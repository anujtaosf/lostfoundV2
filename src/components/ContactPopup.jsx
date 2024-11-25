import React from 'react';
import styled from 'styled-components';

const ContactPopup = ({ onClose }) => {
  return (
    <Popup>
      <Content>
        <Words>Email sent!</Words>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Content>
    </Popup>
  );
};

const Popup = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    z-index: 50;
    animation: fadeIn 0.2s ease-out;
`;

const Content = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    padding: 10px;
    position: relative;
    width: 100%;
    max-width: 200px;
    text-align: center;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    animation: scaleIn 0.2s ease-out;
`;

const CloseButton = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    color: #9CA3AF;
    border: none;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;

    &:hover {
        color: #4B5563;
        background-color: rgba(0, 0, 0, 0.15);
    }
`;

const Words = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin: 30px;
`;

export default ContactPopup;