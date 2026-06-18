import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const PublicRoute: React.FC = () => {
    const accessToken = useSelector((state: RootState) => state.token.accessToken);

    if (accessToken) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
