
import React, { useState } from "react";
import styled from "styled-components";

const ContactPopup = ({ to, cc = [], subject, body, onClose }) => {
  const toStr = Array.isArray(to) ? to.join(", ") : to ?? "";
  const ccStr = (cc || []).join(", ");

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
    }
  };

  const copyAll = () => {
    const full = [
      `To: ${toStr}`,
      ccStr ? `Cc: ${ccStr}` : "",
      `Subject: ${subject}`,
      "",
      body,
    ].filter(Boolean).join("\n");
    copy(full);
  };

  return (
    <Overlay onClick={onClose}>
      <Card role="dialog" aria-modal="true" aria-label="Email draft" onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Email draft</Title>
          <CloseX onClick={onClose} aria-label="Close">✕</CloseX>
        </Header>

        <Content>
          <Row>
            <Label>To</Label>
            <Field>
              <BlockText>{toStr}</BlockText>
              <CopyButton onCopy={() => copy(toStr)} />
            </Field>
          </Row>

          {ccStr && (
            <Row>
              <Label>Cc</Label>
              <Field>
                <BlockText>{ccStr}</BlockText>
                <CopyButton onCopy={() => copy(ccStr)} />
              </Field>
            </Row>
          )}

          <Row>
            <Label>Subject</Label>
            <Field>
              <BlockText>{subject}</BlockText>
              <CopyButton onCopy={() => copy(subject)} />
            </Field>
          </Row>

          {/* Body row */}
          <RowBody>
            <Label>Body</Label>
            <BodyField>
              <TextArea readOnly value={body} />
              <CopyButton onCopy={() => copy(body)} className="body-copy" />
            </BodyField>
          </RowBody>
        </Content>

        <Actions>
          <Primary onClick={copyAll}>Copy entire email</Primary>
          <Ghost onClick={onClose}>Close</Ghost>
        </Actions>
      </Card>
    </Overlay>
  );
};

export default ContactPopup;


const CopyButton = ({ onCopy, className }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await onCopy?.();
    setCopied(true);
  };

  const handleMouseEnter = () => {
    if (copied) setCopied(false);
  };

  return (
    <Mini
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      aria-live="polite"
    >
      {copied ? "✓" : "Copy"}
    </Mini>
  );
};


const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 60;
  background: rgba(0,0,0,.55);
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
`;

const Card = styled.div`
  background: #fff; width: 100%; max-width: 720px;
  border-radius: 14px; box-shadow: 0 12px 28px rgba(0,0,0,.22);
  display: flex; flex-direction: column;
  max-height: 90vh;
`;

const Header = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 18px 8px;
`;
const Title = styled.h3` margin: 0; color: #0d2a44; font-size: 22px; `;
const CloseX = styled.button`
  border: none; background: transparent; color: #6b7280; font-size: 18px;
  padding: 8px; cursor: pointer; border-radius: 8px;
  &:hover { background: #eef2f7; color: #0d2a44; }
  &:active { transform: scale(0.98); }
`;

const Content = styled.div`
  padding: 10px 18px 0;
  overflow: auto;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr auto;
  align-items: start; gap: 10px; margin-bottom: 12px;
`;

const Label = styled.div` color: #58677a; font-weight: 700; padding-top: 10px; `;

const Field = styled.div`
  background: #f7f9fc; border: 1px solid #e6ecf2;
  border-radius: 10px; padding: 10px 12px; min-height: 42px;
  display: flex; align-items: center; gap: 8px; justify-content: space-between;
`;

const BlockText = styled.div`
  color: #0d2a44;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  line-height: 1.4;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  max-height: 120px; overflow: auto;
  margin-right: 6px;
`;

/* Body row uses 2 columns; the copy sits inside the right field */
const RowBody = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  align-items: start;
  gap: 10px;
  margin-bottom: 12px;
`;

const BodyField = styled.div`
  position: relative;
  background: #f7f9fc;
  border: 1px solid #e6ecf2;
  border-radius: 10px;
  overflow: hidden;

  /* Only the Body's copy button gets absolutely positioned */
  > .body-copy {
    position: absolute;
    top: 8px;
    right: 8px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 160px;
  resize: vertical;
  font: inherit;
  color: #0d2a44;
  background: transparent;
  border: none;
  padding: 12px 56px 12px 12px; /* leave room for the button */
  line-height: 1.5;
`;

const Mini = styled.button`
  /* Inline default (used by To/Cc/Subject), not absolute */
  border: 1px solid #cfd8e3;
  background: #eef2f7;
  color: #0d2a44;
  font-weight: 800;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background .12s ease, transform .06s ease, box-shadow .12s ease;
  white-space: nowrap;
  min-width: 58px;
  text-align: center;
  &:hover { background: #e6ebf3; box-shadow: 0 1px 0 rgba(0,0,0,.06); }
  &:active { transform: translateY(1px); }
  &:focus-visible { outline: 3px solid rgba(0,39,76,.25); outline-offset: 2px; }
`;

const Actions = styled.div`
  display: flex; gap: 10px; justify-content: flex-end;
  padding: 12px 18px 16px; border-top: 1px solid #eef2f7;
`;

const BaseBtn = styled.button`
  border: none; font-weight: 800; padding: 12px 16px; border-radius: 10px;
  cursor: pointer; transition: transform .06s ease, box-shadow .12s ease, background .12s ease;
  &:active { transform: translateY(1px); }
  &:focus-visible { outline: 3px solid rgba(0,39,76,.25); outline-offset: 2px; }
`;

const Primary = styled(BaseBtn)`
  background: #00274c; color: #fff;
  &:hover { box-shadow: 0 2px 0 rgba(0,0,0,.15); background: #01213f; }
`;
const Ghost = styled(BaseBtn)`
  background: #eef2f7; color: #0d2a44;
  &:hover { background: #e6ebf3; }
`;
