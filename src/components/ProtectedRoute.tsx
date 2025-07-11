import { useAuthStore } from "../stores/authStore";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuthStore();
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token || !isAuthenticated) {
        if (!["/login", "/register"].includes(location.pathname)) {
            localStorage.setItem("prevPath", location.pathname);
        }

        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
