import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login, Signup, Home, Dashboard, AddRoom } from "./pages";
import { DashboardLayout } from "./components";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "./graphql/query";

function AppRoutes() {
    const { data, loading } = useQuery(GET_AUTH_USER);
    console.log(`this is data`, data)

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while fetching user data
    }

    const isAuthenticated = !!data?.getAuthUser;

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />} />
                <Route path="/" element={<Home />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <DashboardLayout data={data}>
                                <Dashboard />
                            </DashboardLayout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/dashboard/add-rooms"
                    element={
                        isAuthenticated ? (
                            <DashboardLayout data={data} >
                                <AddRoom />
                            </DashboardLayout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default AppRoutes;