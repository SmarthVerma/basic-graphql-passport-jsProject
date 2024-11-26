/* eslint-disable react/prop-types */
import { Navbar } from "./index";

export const DashboardLayout = ({ children }) => {
    return (
        <div className="flex flex-col">
            {/* Navbar for all screens */}
            <Navbar />

            {/* Main content (children) */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};