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
  const [roleView, setRoleView] = useState("user"); // "user" | "admin"

  useEffect(() => {
    (async () => {
      const usr = await getAllUsers();
      usr.sort((a, b) => a.uniqname.localeCompare(b.uniqname));
      setUsers(usr);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    // role filter (treat anything not 'admin' as 'user')
    const byRole = users.filter((u) => {
      const role = (u.role || "user").toLowerCase();
      return roleView === "admin" ? role === "admin" : role !== "admin";
    });

    if (!q) return byRole;
    return byRole.filter((u) => u.uniqname.toLowerCase().includes(q));
  }, [users, query, roleView]);

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
            <ToggleWrap role="tablist" aria-label="Role filter">
              <Toggle
                role="tab"
                aria-selected={roleView === "user"}
                $active={roleView === "user"}
                onClick={() => setRoleView("user")}
              >
                Users
              </Toggle>
              <Toggle
                role="tab"
                aria-selected={roleView === "admin"}
                $active={roleView === "admin"}
                onClick={() => setRoleView("admin")}
              >
                Admins
              </Toggle>
            </ToggleWrap>
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
          {filtered.length === 0 && (
            <EmptyState>No {roleView}s match “{query}”.</EmptyState>
          )}
        </ScrollContainer>
      </ItemList>
    </ColumnContainer>
  );
};
export default AdminUsers;

/* -------- styles (mirrors Tools toggle, different tint) -------- */

const ActionButton = styled.button`
  border-radius: 100px;
  background-color: ${(p) => `${p.color || "#00274c"}14`};
  display: flex; align-items: center; gap: 10px;
  color: ${(p) => p.color || "#00274c"};
  font-size: 12px; font-weight: 600; text-align: center; justify-content: center;
  width: 125px; padding: 5px 10px; border: none; cursor: pointer; transition: all .2s;
  &:hover { transform: scale(1.05); }
`;

const ScrollContainer = styled(BaseScrollContainer)`
  position: relative;
  overflow-y: auto;
  font-family: inherit;
  color: #00274c;
`;

const StickySearch = styled.div`
  position: sticky; top: 0; z-index: 3;
  display: flex; align-items: center; gap: 6px;
  padding: 0; background: transparent;
`;

const SearchInput = styled.input`
  width: 100%; max-width: 500px; height: 32px;
  border-radius: 16px; border: 1px solid rgba(0,39,76,0.25);
  background-color: #fff; outline: none; padding: 0 24px;
  font: inherit; font-size: 14px; line-height: 32px;
  &::placeholder { color: rgba(0,39,76,0.45); }
  &:focus { border-color: rgba(0,39,76,0.5); box-shadow: 0 0 0 3px rgba(0,39,76,0.1); }
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

const ListSpacer = styled.div` height: 4px; `;
const EmptyState = styled.div` font-size: 14px; color: #667085; padding: 12px; `;
