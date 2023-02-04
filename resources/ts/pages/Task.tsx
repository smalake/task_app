import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Tab, Tabs, Typography } from "@mui/material";

export const Task = () => {
    const { taskId } = useParams();
    const [date, setDate] = useState("");
    const [content, setContent] = useState("");
    const [scheduleBefore, setScheduleBefore] = useState("");
    const [scheduleAfter, setScheduleAfter] = useState("");
    const [remaingBefore, setRemaingBefore] = useState("");
    const [remaingAfter, setRemaingAfter] = useState("");
    const [impression, setImpression] = useState("");
    const [tabIndex, setTabIndex] = useState(0); //タブ切り替え用

    useEffect(() => {
        const getTask = async () => {
            try {
            } catch (err) {}
        };
        getTask();
    }, [taskId]);

    // タブの切り替え処理
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };
    return (
        <Box>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="朝" />
                <Tab label="夕" />
            </Tabs>
            <Box sx={{ padding: 2 }}>
                {/* 朝が選択された場合 */}
                {tabIndex === 0 && (
                    <Box>
                        <Box component="p">日付:{date}</Box>
                        <Box component="p">作業予定:{scheduleBefore}</Box>
                        <Box component="p">残タスク:{remaingBefore}</Box>
                    </Box>
                )}
                {/* 夕が選択された場合 */}
                {tabIndex === 1 && (
                    <Box>
                        <Box component="p">日付:{date}</Box>
                        <Box component="p">作業内容:{content}</Box>
                        <Box component="p">作業予定:{scheduleAfter}</Box>
                        <Box component="p">残タスク:{remaingAfter}</Box>
                        <Box component="p">所感:{impression}</Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
