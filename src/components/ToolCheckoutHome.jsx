// ToolCheckoutHome.jsx
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ToolCheckoutHome() {
  const navigate = useNavigate();
  const [site, setSite] = useState("frb"); // "frb" | "wilson"

  useEffect(() => {
    const s = (localStorage.getItem("toolSite") || "frb").toLowerCase();
    setSite(s === "wilson" ? "wilson" : "frb");
  }, []);

  const choose = (s) => {
    setSite(s);
    localStorage.setItem("toolSite", s);
  };

  return (
    <Wrap>
      <Card>
        <Header>
          <H1>Tool Checkout</H1>
          <Sub>Choose a location and what you’d like to do.</Sub>
        </Header>

        <Controls>
          <ToggleWrap role="tablist" aria-label="Location">
            <Toggle
              role="tab"
              aria-selected={site === "frb"}
              $active={site === "frb"}
              onClick={() => choose("frb")}
            >
              FRB
            </Toggle>
            <Toggle
              role="tab"
              aria-selected={site === "wilson"}
              $active={site === "wilson"}
              onClick={() => choose("wilson")}
            >
              WILSON
            </Toggle>
          </ToggleWrap>

          <SiteNote>
            Current location: <Badge>{site.toUpperCase()}</Badge>
          </SiteNote>
        </Controls>

        <Buttons>
          <Primary onClick={() => navigate("/checkout", { state: { site } })}>
            Borrow a Tool
          </Primary>
          <Secondary onClick={() => navigate("/checkin", { state: { site } })}>
            Return a Tool
          </Secondary>
        </Buttons>
      </Card>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 56px 20px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 680px;
  background: #ffffff;
  border-radius: 16px;
  padding: 36px 32px 32px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.10);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 22px;
`;

const H1 = styled.h1`
  margin: 0 0 8px;
  font-size: 34px;
  line-height: 1.2;
  color: #0d2a44;
`;

const Sub = styled.p`
  margin: 0;
  color: #5e6b7a;
  font-size: 16px;
`;

const Controls = styled.div`
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 18px 0 6px;
  border-top: 1px dashed rgba(13, 42, 68, 0.18);
  border-bottom: 1px dashed rgba(13, 42, 68, 0.18);
  margin: 18px 0 24px;
`;

const ToggleWrap = styled.div`
  display: inline-flex;
  background: #e8edf6;
  border-radius: 999px;
  padding: 6px;
  gap: 6px;
`;

const Toggle = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 800;
  letter-spacing: 0.2px;
  background: ${(p) => (p.$active ? "#ffffff" : "transparent")};
  color: ${(p) => (p.$active ? "#0d2a44" : "#475569")};
  box-shadow: ${(p) => (p.$active ? "0 2px 6px rgba(0,0,0,0.08)" : "none")};
  transition: background 120ms ease, transform 120ms ease;

  &:hover {
    background: ${(p) => (p.$active ? "#ffffff" : "rgba(255,255,255,0.65)")};
    transform: translateY(-1px);
  }
`;

const SiteNote = styled.div`
  color: #5e6b7a;
  font-size: 14px;
`;

const Badge = styled.span`
  background: #eff3f9;
  color: #0d2a44;
  border-radius: 999px;
  padding: 4px 12px;
  font-weight: 800;
  display: inline-block;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 8px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const BaseBtn = styled.button`
  border: none;
  cursor: pointer;
  font-weight: 800;
  padding: 14px 18px;
  border-radius: 12px;
  min-height: 48px;
  transition: transform 120ms ease, box-shadow 120ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
`;

const Primary = styled(BaseBtn)`
  background: #00274c;
  color: #ffffff;
`;

const Secondary = styled(BaseBtn)`
  background: #eef2f7;
  color: #0d2a44;
`;
