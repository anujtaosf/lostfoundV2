// lib/inventory.js
import { getOpenTickets } from "../firebase/ticket";
import { getAllTools } from "../firebase/tools";

export const makeInvKey = (name, location) =>
  `${String(name).toLowerCase()}__${String(location || "").toLowerCase()}`;

export const getInventory = async () => {
  const [tickets, tools] = await Promise.all([
    getOpenTickets(),
    getAllTools(),
  ]);

  const leftByKey = {};
  tools.forEach(t=>{
    const key = makeInvKey(t.name, t.location || "frb");
    leftByKey[key]=Number(t.amount ?? 0);
  })

  tickets.forEach((tx) => {
    const key = makeInvKey(tx.tool, tx.location || "frb");
    if (key in leftByKey) {
      leftByKey[key] = Math.max(0, leftByKey[key] - 1);
    }
  });

  return leftByKey;
};

export const getInventoryForSite = async (site) => {
  const all = await getInventory();
  const out = {};
  const needle = `__${String(site).toLowerCase()}`;
  Object.entries(all).forEach(([k, v]) => {
    if (k.endsWith(needle)) {
      const name = k.slice(0, -needle.length);
      out[name] = v;
    }
  });
  return out;
};