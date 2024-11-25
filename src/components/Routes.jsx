import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Landing from "./Landing";
import { DashboardProvider } from "../context/dashboardContext";

export const AdminRoutes = () => {
	const { userRole } = useAuth();

	return userRole === "admin" ? (
		<DashboardProvider>
			<Outlet />
		</DashboardProvider>
	) : (
		<Landing />
	);
};

export const UserRoutes = () => {
	const { userLoggedIn } = useAuth();

	return userLoggedIn ? <Outlet /> : <Landing />;
};
