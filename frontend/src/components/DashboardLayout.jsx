/* eslint-disable react/prop-types */
import { Navbar, Sidebar } from "./index";

export const DashboardLayout = ({ children }) => {
    return (
        <div className="flex">
            {/* Sidebar for larger screens */}
            <Sidebar />

            <div className="flex-1 ml-0 md:ml-64">
                {/* Navbar for smaller screens */}
                <Navbar />
                {children}
            </div>
        </div>
    );
};
