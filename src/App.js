import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { AdminRoutes } from "./components/Routes";
import { AuthProvider } from "./context/authContext";
import TicketsDashboard from "./components/TicketsDashboard";
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import CheckoutForm from "./components/CheckoutForm";
import CheckinForm from "./components/CheckinForm";
import AdminPage from "./components/AdminPage";
import ToolCheckoutHome from "./components/ToolCheckoutHome";
import TicketsPage from "./components/TicketsPage";

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Landing />} />

					<Route element={<AdminRoutes />}>
						<Route path="/dashboard" element={<TicketsDashboard />} />
						<Route path="/admin" element={<AdminPage />} />
					</Route>

					<Route path="/checkout" element={<CheckoutForm />} />
					<Route path="/checkin" element={<CheckinForm />} />

					<Route path="/tool" element={<ToolCheckoutHome />} />
					<Route path="/tickets" element={<TicketsPage />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default App;
