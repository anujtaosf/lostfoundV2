import React, { useState } from "react";
import styled from "styled-components";
import { createUserNoAuth } from "../firebase/users";
import { Formlabel, Description, Fieldlabel, Input, Select, SubmitButton } from "../styles/form-styles";

// no "none" here
const trainings = ["frb-basic2", "wilson-basic2"];

const AddUserForm = () => {
  const [nameInput, setNameInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [selectedTrainings, setSelectedTrainings] = useState([]); // array

  const toggleTraining = (t) => {
    setSelectedTrainings((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if nothing is checked, store ["none"]
    const toSave = selectedTrainings.length ? selectedTrainings : ["none"];

    await createUserNoAuth(nameInput.trim(), roleInput, toSave);

    setNameInput("");
    setRoleInput("");
    setSelectedTrainings([]);
  };

  // allow submit even if no training is selected
  const disabled = !nameInput.trim() || !roleInput;

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Formlabel>Add a User</Formlabel>
        <Description></Description>

        <Fieldlabel htmlFor="name">Uniqname:</Fieldlabel>
        <Input
          type="text"
          id="name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <Fieldlabel htmlFor="role">Role:</Fieldlabel>
        <Select
          id="role"
          value={roleInput}
          onChange={(e) => setRoleInput(e.target.value)}
        >
          <option value="">-- Please choose an option --</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </Select>

        <Fieldlabel>Training:</Fieldlabel>
        <CheckboxGroup>
          {trainings.map((t) => (
            <CheckboxItem key={t}>
              <input
                type="checkbox"
                id={`t-${t}`}
                checked={selectedTrainings.includes(t)}
                onChange={() => toggleTraining(t)}
              />
              <label htmlFor={`t-${t}`}>{t}</label>
            </CheckboxItem>
          ))}
        </CheckboxGroup>

        <SubmitButton type="submit" disabled={disabled}>
          Submit
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default AddUserForm;

/* keep your originals; included here for completeness */
const Container = styled.div`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px 20px 20px 20px;
  width: 325px;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 480px;
  padding: 32px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 12px;
  padding: 6px 2px 10px 2px;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;
