// CheckoutForm.jsx  (only relevant diffs shown)
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllTools, getTool } from "../firebase/tools";
import { createTicket } from "../firebase/ticket";
import styled from "styled-components";
import UniqnameForm from "./UniqnameForm";
import { Formlabel, Description, Fieldlabel, Select, StatusMessage, SubmitButton, SignOutButton } from "../styles/form-styles";
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
    const info = await getTool(selectedTool); // by name
    await createTicket({
      created_at: new Date(),
      location: site,                 // <-- location from toggle
      tool: selectedTool,
      tool_rating: info?.rating || 1,
      user: uniqname,
      open: true,
    });
    setSelectedTool("");
    setStatusMessage(`Successfully signed out ${selectedTool} from ${site.toUpperCase()}`);
  };

  const handleSignOut = useCallback(() => {
    setSelectedTool(""); setStatusMessage(""); setUniqname("");
    navigate("/tool"); // back to home
  }, [navigate]);

  useIdleAutoSignout({ enabled: Boolean(uniqname), delay: 5000, onSignOut: handleSignOut });

  return (
    <Container>
      {!uniqname ? (
        <UniqnameForm setUniqname={setUniqname} setTrainings={setTrainings} />
      ) : (
        <Checkout onSubmit={handleSubmit}>
          <Formlabel>Tool Borrowing Form</Formlabel>
          <SiteRow>Location: <SiteBadge>{site.toUpperCase()}</SiteBadge></SiteRow>
          <Description>Choose the tool you’re checking out.</Description>

          <Fieldlabel htmlFor="tool">Tool:</Fieldlabel>
          <Select id="tool" value={selectedTool} onChange={(e)=>setSelectedTool(e.target.value)}>
            <option value="">-- Please choose an option --</option>
            {tools.map(t => <option key={t.id ?? t.name} value={t.name}>{t.name}</option>)}
          </Select>

          {statusMessage && (
            <>
              <StatusMessage>{statusMessage}</StatusMessage>
              <StatusMessage>Check out another tool above or sign out below</StatusMessage>
            </>
          )}

          <SubmitButton type="submit" disabled={!selectedTool}>Submit</SubmitButton>
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

export default CheckoutForm;
