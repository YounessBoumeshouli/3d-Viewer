import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {applyNextWorkerFixture} from "next/dist/experimental/testmode/playwright/next-worker-fixture.js";

const PrivateRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/home" replace />;

    try {
        const { role } = jwtDecode(token);
        if (allowedRoles.includes(role)) {
            return children;
        } else {
            return <Navigate to="/unauthorized" replace />;
        }
    } catch (error) {
        console.error("Invalid token:", error);
        return <Navigate to="/home" replace />;
    }
};

export default PrivateRoute;