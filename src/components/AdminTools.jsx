import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { getAllTools, updateTool, deleteTool } from "../firebase/tools";
import AdminToolCard from "./AdminToolCard";
import { getInventory, makeInvKey } from "../lib/inventory";
import {
  ColumnContainer,
  SectionHeader,
  SectionTitle,
  ItemList,
  ScrollContainer as BaseScrollContainer,
} from "../styles/dashboard-column-styles";

const AdminTools = ({ handleFormStateChange }) => {
  const [tools, setTools] = useState([]);
  const [inventory, setInventory] = useState({});
  const [query, setQuery] = useState("");
  const [site, setSite] = useState("frb");
  

  useEffect(() => {
    const load = async () => {
      const tls = await getAllTools();
      tls.sort((a, b) => a.name.localeCompare(b.name));
      setTools(tls);

      const inv = await getInventory();
      setInventory(inv);
    };
    load();
  }, []);

const merged = useMemo(() => {
  return tools.map(t => {
    const key = makeInvKey(t.name, t.location || "frb");
    const left = Number(inventory?.[key] ?? t.amount ?? 0);
    const amount = Number(t.amount ?? 0);
    return { ...t, left, missing: left < amount };
  });
}, [tools, inventory]);

const visibleTools = useMemo(() => {
  const q = query.trim().toLowerCase();

  let list = merged.filter(t => (t.location || "frb").toLowerCase() === site);

  if (q) list = list.filter(t => t.name.toLowerCase().includes(q));

  return list.sort((a, b) => {
    if (a.missing !== b.missing) return a.missing ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}, [merged, query, site]);


 
const handleSave = async (id, updates, originalName) => {
await updateTool(id, updates);

setTools(prev =>
	prev
	.map(t => (t.id === id ? { ...t, ...updates } : t))
	.sort((a, b) => a.name.localeCompare(b.name))
);

	// refresh computed "left" from tickets + tools
	const inv = await getInventory();
	setInventory(inv);
};

  const handleDelete = async (id, name) => {
    await deleteTool(id);
    setTools((prev) => prev.filter((t) => t.id !== id));
    setInventory((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  return (
    <ColumnContainer>
      <SectionHeader>
        <SectionTitle>TOOLS</SectionTitle>
        <ActionButton onClick={() => handleFormStateChange("tool")}>
          Add Tool
        </ActionButton>
      </SectionHeader>

      <ItemList>
        {/* Scrollable column with a sticky search at the top */}
        <ScrollContainer>
          <StickySearch>
            <SearchInput
              placeholder="Search tools…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ToggleWrap role="tablist" aria-label="Tool location">
              <Toggle $active={site === "frb"} onClick={() => setSite("frb")} role="tab" aria-selected={site === "frb"}>
                FRB
              </Toggle>
              <Toggle $active={site === "wilson"} onClick={() => setSite("wilson")} role="tab" aria-selected={site === "wilson"}>
                Wilson
              </Toggle>
            </ToggleWrap>
          </StickySearch>

          

          <ListSpacer /> {/* spacing under sticky bar */}
          {visibleTools.map((tool) => (
			<AdminToolCard
				key={tool.id ?? tool.name}
				tool={tool}
				inventory={tool.left}
				isMissing={tool.missing}
				onSave={(updates) => handleSave(tool.id, updates, tool.name)}
				onDelete={() => handleDelete(tool.id, tool.name)}
			/>
		  ))}

          {visibleTools.length === 0 && (
            <EmptyState>No tools match “{query}”.</EmptyState>
          )}
        </ScrollContainer>
      </ItemList>
    </ColumnContainer>
  );
};

export default AdminTools;

const ActionButton = styled.button`
  border-radius: 100px;
  background-color: ${(props) => `${props.color || "#00274c"}14`};
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.color || "#00274c"};
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  justify-content: center;
  width: 125px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { transform: scale(1.05); }
`;

/** make sure your ScrollContainer can host a sticky child */
const ScrollContainer = styled(BaseScrollContainer)`
  position: relative;
  overflow-y: auto;
`;
const StickySearch = styled.div`
  position: sticky;
  top: 0;
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  padding: 0;                
  background: transparent;  
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;           /* match Tools */
  height: 32px;
  border-radius: 16px;
  border: 1px solid rgba(0, 39, 76, 0.25);
  background-color: #fff;
  outline: none;
  padding: 0 24px;

  /* use Users’ font everywhere */
  font: inherit;              /* inherits the Users column font */
  font-size: 14px;
  line-height: 32px;

  &::placeholder {
    color: rgba(0, 39, 76, 0.45);
  }

  &:focus {
    border-color: rgba(0, 39, 76, 0.5);
    box-shadow: 0 0 0 3px rgba(0, 39, 76, 0.1);
  }
`;


const ToggleWrap = styled.div`
  display: inline-flex;
  background: #e9edf8;          /* softer than tools' wrap, same family */
  border-radius: 999px;
  padding: 4px;
  gap: 4px;
  margin-left: auto;
  margin-right: 10px;
`;

const Toggle = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 700;
  background: ${(p) => (p.$active ? "#ffffff" : "transparent")};
  color: ${(p) => (p.$active ? "#0d2a44" : "#4b5563")};
  box-shadow: ${(p) => (p.$active ? "0 1px 2px rgba(0,0,0,.08)" : "none")};
  &:hover {
    background: ${(p) => (p.$active ? "#ffffff" : "rgba(255, 255, 255, 0.6)")};
  }
`;

const ListSpacer = styled.div`
  height: 6px;
`;

const EmptyState = styled.div`
  font-size: 14px;
  color: #667085;
  padding: 12px;
`;
