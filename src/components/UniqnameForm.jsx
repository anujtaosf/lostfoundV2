import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createUserNoAuth, getUserData } from "../firebase/users";
import styled from "styled-components";
import { Description, Fieldlabel, Input, SubmitButton } from "../styles/form-styles";

const UniqnameForm = ({ setUniqname, setTrainings }) => {
  const [uniqnameInput, setUniqnameInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // --- Auto-timeout handler ---
  const handleTimeout = useCallback(() => {
    navigate("/tool");
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTimeout();
    }, 5000); // 5 seconds of inactivity

    return () => clearTimeout(timer);
  }, [uniqnameInput, handleTimeout]); // resets when user types

  const handleUniqnameSubmit = async (e) => {
    e.preventDefault();

    const uniqnameLowerCase = uniqnameInput.toLowerCase();
    const data = await getUserData(uniqnameLowerCase);
    if (!data) {
      createUserNoAuth(uniqnameLowerCase, "user", ["none"]);
      setTrainings(["none"]);
    } else {
      setTrainings(data.trainings);
    }

    setUniqname(uniqnameLowerCase);
    setErrorMessage("");
    setUniqnameInput("");
  };

  return (
    <Checkout onSubmit={handleUniqnameSubmit}>
      <Formlabel>Sign In</Formlabel>
      <Description>Please sign in with your uniqname</Description>
      <Fieldlabel htmlFor="uniqname">Uniqname:</Fieldlabel>
      <Input
        type="text"
        id="uniqname"
        value={uniqnameInput}
        onChange={(e) => setUniqnameInput(e.target.value)}
        required
      />
      <SubmitButton disabled={!uniqnameInput}>Next</SubmitButton>
      <BackButton type="button" onClick={() => navigate("/tool")}>
        Back
      </BackButton>
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : <></>}
    </Checkout>
  );
};

const Checkout = styled.form`
  width: 100%;
  max-width: 480px;
  padding: 32px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 991px) {
    max-width: 70%;
    padding: 12px;
  }
`;

const Formlabel = styled.label`
  font-size: 32px;
  font-weight: bold;
  margin: 10px 0px 0px 0px;
`;

const BackButton = styled.button`
  background: #eef2f7;
  color: #0d2a44;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default UniqnameForm;
