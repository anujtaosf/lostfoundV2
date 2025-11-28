// CheckoutForm.jsx  (only relevant diffs shown)
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllTools, getTool, createTool } from "../firebase/tools";
import { createTicket } from "../firebase/ticket";
import styled from "styled-components";
import UniqnameForm from "./UniqnameForm";
import { Formlabel, Description, Fieldlabel, Select, StatusMessage, SubmitButton, SignOutButton, Input } from "../styles/form-styles";
import useIdleAutoSignout from "../hooks/useIdleAutoSignout";

const CheckoutForm = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const site = (loc.state?.site || localStorage.getItem("toolSite") || "frb").toLowerCase();

  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState("");
  const [uniqname, setUniqname] = useState("");
  const [, setTrainings] = useState([]); // silence warning
  const [statusMessage, setStatusMessage] = useState("");
  const [isCustomTool, setIsCustomTool] = useState(false);
  const [customToolName, setCustomToolName] = useState("");

  useEffect(() => {
    (async () => {
      const all = await getAllTools();
      const filtered = all.filter(t => (t.location || "frb").toLowerCase() === site);
      filtered.sort((a,b) => a.name.localeCompare(b.name));
      setTools(filtered);
    })();
  }, [site]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let toolName = selectedTool;
    let toolRating = 1;

    if (isCustomTool) {
      // Create custom tool in Firebase
      toolName = customToolName.trim();
      await createTool({
        name: toolName,
        amount: 1,
        rating: 1,
        location: site,
        isCustom: true,
      });
      toolRating = 1;
    } else {
      // Get existing tool info
      const info = await getTool(selectedTool);
      toolRating = info?.rating || 1;
    }

    await createTicket({
      created_at: new Date(),
      location: site,
      tool: toolName,
      tool_rating: toolRating,
      user: uniqname,
      open: true,
    });

    setSelectedTool("");
    setCustomToolName("");
    setStatusMessage(`Successfully signed out ${toolName} from ${site.toUpperCase()}`);
  };

  const handleSignOut = useCallback(() => {
    setSelectedTool(""); setStatusMessage(""); setUniqname("");
    setIsCustomTool(false); setCustomToolName("");
    navigate("/tool"); // back to home
  }, [navigate]);

  useIdleAutoSignout({ enabled: Boolean(uniqname), onSignOut: handleSignOut });

  return (
    <Container>
      {!uniqname ? (
        <UniqnameForm setUniqname={setUniqname} setTrainings={setTrainings} />
      ) : (
        <Checkout onSubmit={handleSubmit}>
          <Formlabel>Tool Borrowing Form</Formlabel>
          <SiteRow>Location: <SiteBadge>{site.toUpperCase()}</SiteBadge></SiteRow>
          <Description>Choose the tool you're checking out.</Description>

          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                checked={!isCustomTool}
                onChange={() => setIsCustomTool(false)}
              />
              Select from existing tools
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                checked={isCustomTool}
                onChange={() => setIsCustomTool(true)}
              />
              Checkout a different tool
            </RadioLabel>
          </RadioGroup>

          {!isCustomTool ? (
            <>
              <Fieldlabel htmlFor="tool">Tool:</Fieldlabel>
              <Select id="tool" value={selectedTool} onChange={(e)=>setSelectedTool(e.target.value)}>
                <option value="">-- Please choose an option --</option>
                {tools.map(t => <option key={t.id ?? t.name} value={t.name}>{t.name}</option>)}
              </Select>
            </>
          ) : (
            <>
              <Fieldlabel htmlFor="customTool">Custom Tool Name:</Fieldlabel>
              <Input
                id="customTool"
                type="text"
                value={customToolName}
                onChange={(e) => setCustomToolName(e.target.value)}
                placeholder="Enter tool name"
              />
            </>
          )}

          {statusMessage && (
            <>
              <StatusMessage>{statusMessage}</StatusMessage>
              <StatusMessage>Check out another tool above or sign out below</StatusMessage>
            </>
          )}

          <SubmitButton type="submit" disabled={isCustomTool ? !customToolName.trim() : !selectedTool}>Submit</SubmitButton>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </Checkout>
      )}
    </Container>
  );
};

const Container = styled.div`width:100%;padding:40px 20px;display:flex;justify-content:center;`;
const Checkout = styled.form`width:100%;max-width:480px;padding:32px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.4);display:flex;flex-direction:column;gap:4px;`;
const SiteRow = styled.div`margin:6px 0 8px;color:#58677a;`;
const SiteBadge = styled.span`background:#eef2f7;color:#0d2a44;border-radius:999px;padding:2px 10px;font-weight:700;`;
const RadioGroup = styled.div`display:flex;flex-direction:column;gap:8px;margin:12px 0;`;
const RadioLabel = styled.label`display:flex;align-items:center;gap:8px;font-size:14px;color:#0d2a44;cursor:pointer;
  input[type="radio"] { cursor:pointer; }
`;

export default CheckoutForm;
