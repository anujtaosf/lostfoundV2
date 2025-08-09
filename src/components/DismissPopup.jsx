import React from "react";
import styled from "styled-components";

const DismissPopup = ({ onClose, onMissing, onReturned }) => {
  return (
    <Popup>
      <Content>
        <Title>Close ticket as…</Title>

        <Buttons>
          <Missing onClick={onMissing}>Missing</Missing>
          <Returned onClick={onReturned}>Returned</Returned>
        </Buttons>

        <Hint>
          Missing: ticket closes, tool stays missing.<br/>
          Returned: ticket closes, tool returns to inventory.
        </Hint>

        <Close onClick={onClose}>Cancel</Close>
      </Content>
    </Popup>
  );
};

export default DismissPopup;

const Popup = styled.div`
  position: fixed; inset: 0; z-index: 50;
  background: rgba(0,0,0,.45);
  display: flex; align-items: center; justify-content: center; padding: 12px;
`;
const Content = styled.div`
  background: #fff; width: 100%; max-width: 360px;
  border-radius: 12px; padding: 18px; text-align: center;
  box-shadow: 0 10px 24px rgba(0,0,0,.12);
`;
const Title = styled.h3` margin: 4px 0 8px; color: #00274c; `;
const Buttons = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0; `;
const Btn = styled.button`
  border: none; padding: 10px 12px; border-radius: 10px; font-weight: 700; cursor: pointer;
`;
const Missing = styled(Btn)` background: #ffe4e4; color: #b42318; `;
const Returned = styled(Btn)` background: #e8f5ee; color: #0f6b3a; `;
const Hint = styled.div` font-size: 12px; color: #667085; margin-top: 6px; `;
const Close = styled.button`
  margin-top: 10px; border: none; background: #eef2f7; color: #0d2a44;
  padding: 8px 12px; border-radius: 8px; font-weight: 600; cursor: pointer;
`;
