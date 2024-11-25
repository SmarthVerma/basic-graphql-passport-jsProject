import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Signup, Home, Dashboard, AddRoom } from "./pages";
import { DashboardLayout } from "./components";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />

                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout> <Dashboard /> </DashboardLayout>} />
                <Route path="/dashboard/add-rooms" element={<DashboardLayout> <AddRoom /> </DashboardLayout>} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;