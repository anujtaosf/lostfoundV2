import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import TicketsDashboard from "./components/TicketsDashboard";
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import CheckoutForm from "./components/CheckoutForm";
import { AdminRoutes, UserRoutes } from "./components/Routes";
import { AuthProvider } from "./context/authContext";
import CheckinForm from "./components/CheckinForm";

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Landing />} />

					<Route element={<AdminRoutes />}>
						<Route path="/dashboard" element={<TicketsDashboard />} />
					</Route>

					<Route element={<UserRoutes />}>
						<Route path="/checkout" element={<CheckoutForm />} />
						<Route path="/checkin" element={<CheckinForm />} />
					</Route>
				</Route>
			</Routes>
		</AuthProvider>
	);
}

export default App;
