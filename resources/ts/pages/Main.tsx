import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { taskApi } from "../api/taskApi";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const Main = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const createTask = async () => {
        try {
            setLoading(true);
            const res = await taskApi.create();
            console.log(res.data.todayDate);
            navigate(`/task/${res.data.id}`);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <LoadingButton
                variant="outlined"
                onClick={() => createTask()}
                loading={loading}
            >
                タスクを作成
            </LoadingButton>
        </Box>
    );
};
