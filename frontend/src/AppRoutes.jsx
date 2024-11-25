import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./pages";

function AppRoutes() {


    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRoutes