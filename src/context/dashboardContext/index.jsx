import React, { createContext, useContext, useState } from "react"

const DashboardContext = createContext();

export const useDashboard = () => {
    return useContext(DashboardContext);
}

export const DashboardProvider = ({ children }) => {
    const [currentLocation, setCurrentLocation] = useState("frb");

    const value = {
        currentLocation,
        setCurrentLocation
    }

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}