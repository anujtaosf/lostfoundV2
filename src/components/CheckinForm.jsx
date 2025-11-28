// CheckinForm.jsx (a.k.a. your "return" form)
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  closeTicket,
  getOpenTicketsFromUserAtLocation,
} from "../firebase/ticket";
import { createNotification } from "../firebase/notifications";
import { getTool, deleteToolByName } from "../firebase/tools";
import UniqnameFormReturn from "./UniqnameFormReturn";
import {
  Formlabel,
  Description,
  Fieldlabel,
  Select,
  StatusMessage,
  SubmitButton,
  SignOutButton,
  Input,
  CheckboxInput,
} from "../styles/form-styles";
import useIdleAutoSignout from "../hooks/useIdleAutoSignout";

const CheckinForm = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const site = (
    loc.state?.site || localStorage.getItem("toolSite") || "frb"
  ).toLowerCase(); // "frb" | "wilson"

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState("");
  const [isBroken, setIsBroken] = useState(false);
  const [brokenDescription, setBrokenDescription] = useState("");
  const [uniqname, setUniqname] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!uniqname) return;
    (async () => {
      const ts = await getOpenTicketsFromUserAtLocation(uniqname, site);
      setTickets(ts);
    })();
  }, [uniqname, site]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticket = tickets.find((t) => t.id === selectedTicket);
    if (!ticket) return;

    await closeTicket(selectedTicket);

    if (isBroken) {
      await createNotification({
        created_at: new Date(),
        description: brokenDescription,
        user: uniqname,
        type: "broken",
        ticket: selectedTicket,
        open: true,
      });
    }

    // Check if the tool is custom and delete it from Firebase
    const toolInfo = await getTool(ticket.tool);
    if (toolInfo && toolInfo.isCustom) {
      await deleteToolByName(ticket.tool);
    }

    // refresh only this user's tickets at this site
    const ts = await getOpenTicketsFromUserAtLocation(uniqname, site);
    setTickets(ts);
    setSelectedTicket("");
    setIsBroken(false);
    setBrokenDescription("");
    setStatusMessage(`Successfully checked in ${ticket.tool} (${site.toUpperCase()})`);
  };

  // Clear and route to /tool
  const handleSignOut = useCallback(
    (e) => {
      e?.preventDefault?.();
      setSelectedTicket("");
      setIsBroken(false);
      setBrokenDescription("");
      setTickets([]);
      setUniqname("");
      navigate("/tool");
    },
    [navigate]
  );

  useIdleAutoSignout({
    enabled: Boolean(uniqname),
    onSignOut: handleSignOut,
  });

  return (
    <Container>
      {!uniqname ? (
        <UniqnameFormReturn setUniqname={setUniqname} setTrainings={() => {}} />
      ) : (
        <Checkin onSubmit={handleSubmit}>
          <Formlabel>Tool Return Form</Formlabel>
          <SiteRow>
            Location: <SiteBadge>{site.toUpperCase()}</SiteBadge>
          </SiteRow>
          <Description>
            Thank you for returning the tool! Please choose the tool you are checking in below.
          </Description>

          <Fieldlabel htmlFor="dropdown">Tool:</Fieldlabel>
          <Select
            id="dropdown"
            value={selectedTicket}
            onChange={(e) => setSelectedTicket(e.target.value)}
          >
            <option value="">-- Please choose an option --</option>
            {tickets.map((t) => (
              <option key={t.id} value={t.id}>
                {t.tool}
              </option>
            ))}
          </Select>

          <Fieldlabel htmlFor="isBroken">
            Is the tool broken:
            <CheckboxInput
              id="isBroken"
              checked={isBroken}
              onChange={(e) => setIsBroken(e.target.checked)}
            />
          </Fieldlabel>

          {isBroken && (
            <>
              <Fieldlabel htmlFor="brokenDescription">Description:</Fieldlabel>
              <Input
                id="brokenDescription"
                value={brokenDescription}
                placeholder="Describe how the item broke"
                onChange={(e) => setBrokenDescription(e.target.value)}
              />
            </>
          )}

          {statusMessage && (
            <>
              <StatusMessage>{statusMessage}</StatusMessage>
              <StatusMessage>
                Check in another tool above or please sign out below
              </StatusMessage>
            </>
          )}

          <SubmitButton type="submit" disabled={!selectedTicket}>
            Submit
          </SubmitButton>
          <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </Checkin>
      )}
    </Container>
  );
};

export default CheckinForm;

const Container = styled.div`
  width: 100%;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  @media (max-width: 991px) { width: 100%; padding: 40px 40px; justify-content: center; }
`;

const Checkin = styled.form`
  width: 100%;
  max-width: 480px;
  padding: 32px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  gap: 4px;
  @media (max-width: 991px) { max-width: 70%; padding: 12px; }
`;

const SiteRow = styled.div` margin: 6px 0 8px; color: #58677a; `;
const SiteBadge = styled.span`
  background:#eef2f7; color:#0d2a44; border-radius:999px; padding:2px 10px; font-weight:700;
`;
