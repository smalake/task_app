import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useRecoilState } from "recoil";
import { Sidebar } from "../common/Sidebar";

export const AppLayout = () => {
    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <Sidebar />
                <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
                    <Outlet />
                </Box>
            </Box>
        </div>
    );
};
