import { useState } from "react";
import styled from "styled-components";

// Removed "none" from the selectable list
const trainingsList = ["frb-basic2", "wilson-basic2"];

const AdminUserCard = ({ user, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState(user.role || "user");

  // normalize to array, removing "none" if stored in old data
  const initialTrainings = Array.isArray(user.trainings)
    ? user.trainings.filter(t => t !== "none")
    : user.trainings && user.trainings !== "none"
    ? [user.trainings]
    : [];
  const [trainings, setTrainings] = useState(initialTrainings);

  const toggleTraining = (t) => {
    setTrainings((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const save = async () => {
    const updates = {};
    if (role !== user.role) updates.role = role;

    let toSave = trainings.length === 0 ? ["none"] : trainings;

    const sameLen = toSave.length === (initialTrainings.length || 1);
    const sameSet =
      sameLen && toSave.every((t) => (initialTrainings.length ? initialTrainings : ["none"]).includes(t));
    if (!sameSet) updates.trainings = toSave;

    await onSave(updates);
    setIsEditing(false);
  };

  const reset = () => {
    setRole(user.role || "user");
    setTrainings(initialTrainings);
    setIsEditing(false);
  };

  return (
    <CardContainer $editing={isEditing}>
      <Left>
        {!isEditing ? (
          <>
            <ItemName>{user.uniqname}</ItemName>
            <Meta>
              <DetailText>{user.role}</DetailText>
              <Dot />
              <DetailText>
                {Array.isArray(user.trainings)
                  ? user.trainings.join(", ")
                  : user.trainings || "none"}
              </DetailText>
            </Meta>
          </>
        ) : (
          <EditForm
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <Row>
              <Label>Uniqname</Label>
              <ReadOnly>{user.uniqname}</ReadOnly>
            </Row>

            <Row>
              <Label>Role</Label>
              <Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </Select>
            </Row>

            <Row>
              <Label>Training</Label>
              <CheckboxCol>
                {trainingsList.map((t) => (
                  <Check key={t}>
                    <input
                      type="checkbox"
                      id={`edit-t-${user.uniqname}-${t}`}
                      checked={trainings.includes(t)}
                      onChange={() => toggleTraining(t)}
                    />
                    <label htmlFor={`edit-t-${user.uniqname}-${t}`}>{t}</label>
                  </Check>
                ))}
              </CheckboxCol>
            </Row>

            <Buttons>
              <SaveButton type="submit">Save</SaveButton>
              <CancelButton type="button" onClick={reset}>Cancel</CancelButton>
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

export default AdminUserCard;

/* --- styles unchanged from before --- */
const CardContainer = styled.div`
  border-radius: 12px;
  background-color: rgba(255,255,255,0.5);
  display: flex; width: 100%; justify-content: space-between; padding: 12px; position: relative;
  &:hover .hover-actions { opacity: 1; transform: translateY(0); }
  ${(p) => p.$editing && `background: #fff; box-shadow: 0 6px 16px rgba(0,0,0,.08);`}
`;

const Left = styled.div`
  display: flex; flex-direction: column; color: #00274c; gap: 6px;
`;

const ItemName = styled.div` font-size: 18px; font-weight: 700; color: #00274c; `;
const Meta = styled.div` display: flex; align-items: center; gap: 8px; `;
const DetailText = styled.div` color: #00274c; font-size: 14px; font-weight: 500; `;
const Dot = styled.span` width: 4px; height: 4px; background: #00274c; border-radius: 999px; opacity: .5; display: inline-block; `;

const Right = styled.div` display: flex; align-items: center; `;
const HoverActions = styled.div` opacity: 0; transform: translateY(-2px); transition: all .15s ease; `;
const EditPill = styled.button`
  border: none; background: #00274c0f; color: #00274c; font-weight: 600;
  border-radius: 16px; padding: 6px 12px; cursor: pointer; &:hover { background: #00274c1a; }
`;

const EditForm = styled.form` display: flex; flex-direction: column; gap: 10px; `;
const Row = styled.label` display: grid; grid-template-columns: 90px 1fr; align-items: center; gap: 10px; `;
const Label = styled.span` font-size: 13px; color: #29445e; `;
const ReadOnly = styled.span` font-size: 14px; color: #00274c; `;
const Select = styled.select`
  height: 34px; border-radius: 8px; border: 1px solid rgba(0,0,0,.12);
  padding: 0 10px; font-size: 14px; outline: none;
  &:focus { box-shadow: 0 0 0 3px rgba(0,39,76,.12); }
`;

const CheckboxCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 12px;
`;

const Check = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const Buttons = styled.div` display: flex; gap: 10px; margin-top: 4px; `;
const SaveButton = styled.button` border: none; background: #00274c; color: #fff; font-weight: 700; padding: 8px 12px; border-radius: 10px; cursor: pointer; `;
const CancelButton = styled.button` border: none; background: #e9eef3; color: #00274c; font-weight: 700; padding: 8px 12px; border-radius: 10px; cursor: pointer; `;
const DeleteButton = styled.button` margin-left: auto; border: none; background: #ffe8e8; color: #b42318; font-weight: 700; padding: 8px 12px; border-radius: 10px; cursor: pointer; `;
