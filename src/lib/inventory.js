// lib/inventory.js
import { getOpenTickets } from "../firebase/ticket";
import { getAllTools } from "../firebase/tools";

export const getInventory = async () => {
  const tickets = await getOpenTickets();
  const tools = await getAllTools();

  const byName = new Map(tools.map(t => [t.name, t]));
  const inventory = {};

  // base “left”: manualLeft if present, else amount
  tools.forEach(t => {
    inventory[t.name] = typeof t.manualLeft === "number"
      ? Number(t.manualLeft)
      : Number(t.amount);
  });

  // subtract open tickets only when there is no override
  tickets.forEach(tx => {
    const tool = byName.get(tx.tool);
    if (!tool) return;
    if (typeof tool.manualLeft !== "number") {
      inventory[tx.tool] = (inventory[tx.tool] ?? 0) - 1;
    }
  });

  return inventory;
};
