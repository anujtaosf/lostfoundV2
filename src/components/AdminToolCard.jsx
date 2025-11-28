// AdminToolCard.jsx (core changes)
import { useState, useEffect } from "react";
import styled from "styled-components";

const AdminToolCard = ({ tool, inventory, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localName, setLocalName] = useState(tool.name);
  const [localAmount, setLocalAmount] = useState(String(tool.amount));
  const [localLeft, setLocalLeft] = useState(String(inventory ?? 0));

  // keep form in sync when opened / when props change
  useEffect(() => {
    if (isEditing) {
      setLocalName(tool.name);
      setLocalAmount(String(tool.amount));
      setLocalLeft(String(inventory ?? 0));
    }
  }, [isEditing, tool.name, tool.amount, inventory]);

  const reset = () => {
    setLocalName(tool.name);
    setLocalAmount(String(tool.amount));
    setLocalLeft(String(inventory ?? 0));
  };

  const handleSave = async () => {
    const updates = {};
    const trimmed = localName.trim();

    if (trimmed && trimmed !== tool.name) updates.name = trimmed;

    const amountNum = Number(localAmount || 0);
    if (amountNum !== Number(tool.amount)) updates.amount = amountNum;

    // write manualLeft only if it actually changed
    const leftNum = Number(localLeft || 0);
    if (leftNum !== Number(inventory ?? 0)) {
      updates.manualLeft = leftNum;
    }

    await onSave(updates);
    setIsEditing(false);
  };

  return (
    <CardContainer $editing={isEditing} $missing={(inventory ?? 0) < (tool.amount ?? 0)}>
      <Left>
        {!isEditing ? (
          <>
            <NameRow>
              <ItemName>{tool.name}</ItemName>
              {tool.isCustom && <CustomBadge>Custom Tool</CustomBadge>}
            </NameRow>
            <Totals>
              <DetailText>{tool.amount} total</DetailText>
              <DetailDot />
              <DetailText $danger={(inventory ?? 0) < (tool.amount ?? 0)}>
                {inventory ?? 0} left
              </DetailText>
            </Totals>
          </>
        ) : (
          <EditForm onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <EditRow>
              <Label>Name</Label>
              <Input value={localName} onChange={(e) => setLocalName(e.target.value)} />
            </EditRow>

            <EditRow>
              <Label>Quantity</Label>
              <NumberInput
                value={localAmount}
                onChange={(e) => setLocalAmount(e.target.value)}
              />
            </EditRow>

            <EditRow>
              <Label>Left</Label>
              <NumberInput
                value={localLeft}
                onChange={(e) => setLocalLeft(e.target.value)}
              />
            </EditRow>

            <Buttons>
              <SaveButton type="submit">Save</SaveButton>
              <CancelButton type="button" onClick={() => { reset(); setIsEditing(false); }}>
                Cancel
              </CancelButton>
              <DeleteButton type="button" onClick={onDelete}>Delete</DeleteButton>
            </Buttons>
          </EditForm>
        )}
      </Left>

      {!isEditing && (
        <Right>
          <HoverActions className="hover-actions">
            <EditPill onClick={() => setIsEditing(true)}>Edit</EditPill>
          </HoverActions>
        </Right>
      )}
    </CardContainer>
  );
};

export default AdminToolCard;


const CardContainer = styled.div`
  border-radius: 12px;
  background-color: ${({ $editing, $missing }) =>
    $editing
      ? "white"
      : $missing
      ? "rgba(220, 38, 38, 0.08)"   /* soft red tint */
      : "rgba(255, 255, 255, 0.5)"};
  border: ${({ $missing, $editing }) =>
    !$editing && $missing ? "1px solid rgba(220, 38, 38, 0.25)" : "none"};
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px;
  position: relative;
  &:hover .hover-actions { opacity: 1; transform: translateY(0); }
  ${(p) => p.$editing && `background: white; box-shadow: 0 6px 16px rgba(0,0,0,.08);`}
`;

const Left = styled.div` display:flex; flex-direction:column; color:#00274c; gap:6px; `;
const NameRow = styled.div` display:flex; align-items:center; gap:8px; `;
const ItemName = styled.div` font-size:18px; font-weight:700; color:#00274c; `;
const CustomBadge = styled.span` background:#fbbf24; color:#78350f; font-size:11px; font-weight:700; padding:2px 8px; border-radius:999px; text-transform:uppercase; `;
const Totals = styled.div` display:flex; align-items:center; gap:8px; `;
const DetailText = styled.div` color: ${({ $danger }) => ($danger ? "#b42318" : "#00274c")};
  font-size: 14px;
  font-weight: 500;
`;
const DetailDot = styled.span` width:4px; height:4px; background:#00274c; border-radius:999px; opacity:.5; display:inline-block; `;
const Right = styled.div` display:flex; align-items:center; `;
const HoverActions = styled.div` opacity:0; transform:translateY(-2px); transition:all .15s ease; `;
const EditPill = styled.button` border:none; background:#00274c0f; color:#00274c; font-weight:600; border-radius:16px; padding:6px 12px; cursor:pointer; &:hover{background:#00274c1a;} `;
const EditForm = styled.form` display:flex; flex-direction:column; gap:10px; `;
const EditRow = styled.label` display:grid; grid-template-columns:90px 1fr; align-items:center; gap:10px; `;
const Label = styled.span` font-size:13px; color:#29445e; `;
const Input = styled.input` height:34px; border-radius:8px; border:1px solid rgba(0,0,0,.12); padding:0 10px; font-size:14px; outline:none; &:focus{ box-shadow:0 0 0 3px rgba(0,39,76,.12);} `;
const NumberInput = styled(Input).attrs({ type: "number" })``;
const Buttons = styled.div` display:flex; gap:10px; margin-top:4px; `;
const SaveButton = styled.button` border:none; background:#00274c; color:#fff; font-weight:700; padding:8px 12px; border-radius:10px; cursor:pointer; `;
const CancelButton = styled.button` border:none; background:#e9eef3; color:#00274c; font-weight:700; padding:8px 12px; border-radius:10px; cursor:pointer; `;
const DeleteButton = styled.button` margin-left:auto; border:none; background:#ffe8e8; color:#b42318; font-weight:700; padding:8px 12px; border-radius:10px; cursor:pointer; `;
