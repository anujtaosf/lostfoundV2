import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { getAllUsers, updateUser, deleteUser } from "../firebase/users";
import AdminUserCard from "./AdminUserCard";
import {
  ColumnContainer,
  SectionHeader,
  SectionTitle,
  ItemList,
  ScrollContainer as BaseScrollContainer,
} from "../styles/dashboard-column-styles";

const AdminUsers = ({ handleFormStateChange }) => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      const usr = await getAllUsers();
      usr.sort((a, b) => a.uniqname.localeCompare(b.uniqname));
      setUsers(usr);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => u.uniqname.toLowerCase().includes(q));
  }, [users, query]);

  const handleSave = async (uniqname, updates) => {
    await updateUser(uniqname, updates);
    setUsers((prev) =>
      prev
        .map((u) => (u.uniqname === uniqname ? { ...u, ...updates } : u))
        .sort((a, b) => a.uniqname.localeCompare(b.uniqname))
    );
  };

  const handleDelete = async (uniqname) => {
    await deleteUser(uniqname);
    setUsers((prev) => prev.filter((u) => u.uniqname !== uniqname));
  };

  return (
    <ColumnContainer>
      <SectionHeader>
        <SectionTitle>USERS</SectionTitle>
        <ActionButton onClick={() => handleFormStateChange("user")}>
          Add User
        </ActionButton>
      </SectionHeader>

      <ItemList>
        <ScrollContainer>
          <StickySearch>
            <SearchInput
              placeholder="Search users…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </StickySearch>

          <ListSpacer />
          {filtered.map((user) => (
            <AdminUserCard
              key={user.uniqname}
              user={user}
              onSave={(updates) => handleSave(user.uniqname, updates)}
              onDelete={() => handleDelete(user.uniqname)}
            />
          ))}
          {filtered.length === 0 && <EmptyState>No users match “{query}”.</EmptyState>}
        </ScrollContainer>
      </ItemList>
    </ColumnContainer>
  );
};
export default AdminUsers;

const ActionButton = styled.button`
  border-radius: 100px;
  background-color: ${(p) => `${p.color || "#00274c"}14`};
  display: flex; align-items: center; gap: 10px;
  color: ${(p) => p.color || "#00274c"};
  font-size: 12px; font-weight: 600; text-align: center; justify-content: center;
  width: 125px; padding: 5px 10px; border: none; cursor: pointer; transition: all .2s;
  &:hover { transform: scale(1.05); }
`;

/* match tools column search styling */
const ScrollContainer = styled(BaseScrollContainer)`
  position: relative;
  overflow-y: auto;
  font-family: inherit;
  color: #00274c;
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

const ListSpacer = styled.div` height: 4px; `;
const EmptyState = styled.div` font-size: 14px; color: #667085; padding: 12px; `;
