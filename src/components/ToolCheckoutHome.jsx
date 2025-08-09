import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function ToolCheckoutHome() {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Card>
        <H1>Tool Checkout</H1>
        <P>Select what you’d like to do.</P>

        <Buttons>
          <Primary onClick={() => navigate("/checkout")}>
            Borrow a Tool
          </Primary>
          <Secondary onClick={() => navigate("/checkin")}>
            Return a Tool
          </Secondary>
        </Buttons>
      </Card>
    </Wrap>
  );
}

const Wrap = styled.div`
  width:100%; display:flex; justify-content:center; padding:40px 20px;
`;
const Card = styled.div`
  width:100%; max-width:520px; background:#fff; border-radius:12px; padding:28px;
  box-shadow:0 2px 8px rgba(0,0,0,.4); text-align:center;
`;
const H1 = styled.h1` margin:0 0 8px; `;
const P = styled.p` color:#58677a; margin:0 0 20px; `;
const Buttons = styled.div` display:flex; gap:12px; justify-content:center; flex-wrap:wrap; `;
const BaseBtn = styled.button`
  border:none; cursor:pointer; font-weight:700; padding:12px 16px; border-radius:10px; min-width:180px;
`;
const Primary = styled(BaseBtn)` background:#00274c; color:#fff; `;
const Secondary = styled(BaseBtn)` background:#eef2f7; color:#00274c; `;
