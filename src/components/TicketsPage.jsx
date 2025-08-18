// src/components/TicketsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { getAllTickets, closeTicket } from "../firebase/ticket";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [site, setSite] = useState("all"); // "all" | "frb" | "wilson"

  const [closingId, setClosingId] = useState(null);

  const handleClose = async (id) => {
    if (closingId) return;
    setClosingId(id);
    try {
      await closeTicket(id);
      setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, open: false } : t)));
    } finally {
      setClosingId(null);
    }
  };

  useEffect(() => {
    (async () => {
      const all = await getAllTickets(); // already DESC by created_at
      setTickets(all);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (site === "all") return tickets;
    return tickets.filter((t) => (t.location || "").toLowerCase() === site);
  }, [tickets, site]);

  const fmt = (d) =>
    d instanceof Date
      ? d.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
      : "-";

  return (
    <PageWrap>
      <Card>
        <HeaderRow>
          <Title>Tickets</Title>
          <ToggleGroup role="tablist" aria-label="location filter">
            <Toggle
              role="tab"
              aria-selected={site === "frb"}
              $active={site === "frb"}
              onClick={() => setSite("frb")}
            >
              FRB
            </Toggle>
            <Toggle
              role="tab"
              aria-selected={site === "wilson"}
              $active={site === "wilson"}
              onClick={() => setSite("wilson")}
            >
              Wilson
            </Toggle>
          </ToggleGroup>
        </HeaderRow>

        <Table role="table" aria-label="tickets">
          <Thead role="rowgroup">
            <TrHead role="row">
              <Th role="columnheader">Date / Time</Th>
              <Th role="columnheader">User</Th>
              <Th role="columnheader">Tool</Th>
              <Th role="columnheader">Rating</Th>
              <Th role="columnheader">Status</Th>
              <Th role="columnheader" style={{ textAlign: "right" }}>Action</Th>
            </TrHead>
          </Thead>

          <Tbody role="rowgroup">
            {loading ? (
              <Tr role="row">
                <Td role="cell" colSpan={6}>Loading…</Td>
              </Tr>
            ) : filtered.length === 0 ? (
              <Tr role="row">
                <Td role="cell" colSpan={6}>No tickets found.</Td>
              </Tr>
            ) : (
              filtered.map((t, i) => (
                <Tr key={t.id} role="row" $alt={i % 2 === 1}>
                  <Td role="cell">{fmt(t.created_at)}</Td>
                  <Td role="cell">{t.user ?? "-"}</Td>
                  <Td role="cell">{t.tool ?? "-"}</Td>
                  <Td role="cell">{typeof t.tool_rating === "number" ? t.tool_rating : "-"}</Td>
                  <Td role="cell"><Status $open={t.open}>{t.open ? "open" : "closed"}</Status></Td>
                  <Td role="cell" style={{ textAlign: "right" }}>
                    {t.open ? (
                      <CloseButton
                        onClick={() => handleClose(t.id)}
                        disabled={closingId === t.id}
                        aria-busy={closingId === t.id}
                      >
                        {closingId === t.id ? "Closing…" : "Close"}
                      </CloseButton>
                    ) : (
                      <span style={{ color: "#94a3b8" }}>—</span>
                    )}
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Card>
    </PageWrap>
  );
};

export default TicketsPage;

/* ---------- styles ---------- */

const PageWrap = styled.div`
  width: 100%;
  padding: 24px 20px 40px;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 1100px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 18px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 26px;
  margin: 4px 0 2px;
  color: #0d2a44;
`;


const ToggleGroup = styled.div`
  background: #f1f5f9;
  border-radius: 999px;
  padding: 4px;
  display: inline-flex;
  gap: 4px;
`;

const Toggle = styled.button`
  appearance: none;
  border: none;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  background: ${(p) => (p.$active ? "#fff" : "transparent")};
  color: ${(p) => (p.$active ? "#0d2a44" : "#475569")};
  box-shadow: ${(p) => (p.$active ? "0 1px 2px rgba(0,0,0,.08)" : "none")};
  &:hover { background: ${(p) => (p.$active ? "#fff" : "rgba(255,255,255,.6)")}; }
`;

const Table = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 10px;
`;

const Thead = styled.div`
  background: #f7f9fc;
  border-bottom: 1px solid rgba(0,0,0,0.06);
`;

const Tbody = styled.div``;

const TrHead = styled.div`
  display: grid;
  grid-template-columns: 230px 1fr 1fr 100px 120px 110px; /* + Action */
  gap: 8px;
  padding: 10px 12px;
  font-weight: 700;
  color: #0d2a44;
`;

const Tr = styled.div`
  display: grid;
  grid-template-columns: 230px 1fr 1fr 100px 120px 110px; /* + Action */
  gap: 8px;
  padding: 10px 12px;
  background: ${(p) => (p.$alt ? "rgba(13, 42, 68, 0.03)" : "white")};
  &:not(:last-child) { border-bottom: 1px solid rgba(0,0,0,0.05); }
`;

const Th = styled.div``;
const Td = styled.div` color: #0d2a44; `;

const Status = styled.span`
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${(p) => (p.$open ? "#fff7ed" : "#ecfdf3")};
  color: ${(p) => (p.$open ? "#b45309" : "#047857")};
`;

const CloseButton = styled.button`
  background: #f87171;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  &:hover {
    background: #dc2626;
  }
`;
