import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { getAllTools, updateTool, deleteTool } from "../firebase/tools";
import AdminToolCard from "./AdminToolCard";
import { getInventory } from "../lib/inventory";
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
    const left = Number(inventory?.[t.name] ?? 0);
    const amount = Number(t.amount ?? 0);
    return { ...t, left, missing: left < amount };
  });
}, [tools, inventory]);

// search + sort (missing first, then alpha)
const visibleTools = useMemo(() => {
  const q = query.trim().toLowerCase();
  let list = merged;
  if (q) list = list.filter(t => t.name.toLowerCase().includes(q));

  return list.sort((a, b) => {
    if (a.missing !== b.missing) return a.missing ? -1 : 1; // missing first
    return a.name.localeCompare(b.name);
  });
}, [merged, query]);

  // --- handlers passed to cards ---
 
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

  padding: 0;                 /* tight like Tools */
  background: transparent;    /* no banner box */
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




/** small spacer so first card isn’t tucked under sticky bar shadows */
const ListSpacer = styled.div`
  height: 6px;
`;

const EmptyState = styled.div`
  font-size: 14px;
  color: #667085;
  padding: 12px;
`;
