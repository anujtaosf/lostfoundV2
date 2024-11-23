import { getOpenTickets } from "../firebase/ticket.js";
import { getAllTools } from "../firebase/tools";

export const getInventory = async () => {
	const tickets = await getOpenTickets();
	const tools = await getAllTools();

	let inventory = {};

	tools.forEach((tool) => {
		inventory[tool.name] = tool.amount;
	});

	tickets.forEach((ticket) => {
		inventory[ticket.tool] -= 1;
	});

	return inventory;
};
