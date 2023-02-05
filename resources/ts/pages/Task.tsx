import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import { taskApi } from "../api/taskApi";

export const Task = () => {
    const { taskId } = useParams();
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);
    const [day31, setDay31] = useState(true);
    const [day29, setDay29] = useState(false);
    const [content, setContent] = useState("");
    const [scheduleBefore, setScheduleBefore] = useState("");
    const [scheduleAfter, setScheduleAfter] = useState("");
    const [remaingBefore, setRemaingBefore] = useState("");
    const [remaingAfter, setRemaingAfter] = useState("");
    const [impression, setImpression] = useState("");
    const [tabIndex, setTabIndex] = useState(0); //タブ切り替え用
    const [displayMode, setDisplayMode] = useState("none"); //表示モードの表示・非表示の制御用
    const [displayEditMode, setDisplayEditMode] = useState("flex"); //編集モードの表示・非表示の制御用
    const [disableTabBefore, setDisableTabBefore] = useState(false);
    const [disableTabAfter, setDisableTabAfter] = useState(true);

    // 選択された月に応じて選択できる日を制限する
    useEffect(() => {
        const optionDay = () => {
            switch (month) {
                case 1:
                    setDay31(false);
                    setDay29(false);
                    break;
                case 2:
                    setDay31(true);
                    setDay29(true);
                    break;
                case 3:
                    setDay31(false);
                    setDay29(false);
                    break;
                case 4:
                    setDay31(true);
                    setDay29(false);
                    break;
                case 5:
                    setDay31(false);
                    setDay29(false);
                    break;
                case 6:
                    setDay31(true);
                    setDay29(false);
                    break;
                case 7:
                    setDay31(false);
                    setDay29(false);
                    break;
                case 8:
                    setDay31(false);
                    setDay29(false);
                    break;
                case 9:
                    setDay31(true);
                    setDay29(false);
                    break;
                case 10:
                    setDay31(false);
                    setDay29(false);
                    break;
                case 11:
                    setDay31(true);
                    setDay29(false);
                    break;
                case 12:
                    setDay31(false);
                    setDay29(false);
                    break;
            }
        };
        optionDay();
    }, [month]);

    useEffect(() => {
        const getTask = async () => {
            try {
                const res = await taskApi.getOne(taskId);
            } catch (err) {}
        };
        getTask();
    }, [taskId]);

    // タブの切り替え処理
    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    // 月の入力
    const updateMonth = (event) => {
        const newMonth = event.target.value;
        setMonth(newMonth);
    };
    // 日の入力
    const updateDay = (event) => {
        const newDay = event.target.value;
        setDay(newDay);
    };
    // 作業内容の入力
    const updateContent = (event) => {
        const newContent = event.target.value;
        setContent(newContent);
    };
    // 今日の作業予定の入力
    const updateScheduleBefore = (event) => {
        const newSchedule = event.target.value;
        setScheduleBefore(newSchedule);
    };
    // 明日の作業予定の入力
    const updateScheduleAfter = (event) => {
        const newSchedule = event.target.value;
        setScheduleAfter(newSchedule);
    };
    // 作業前時点での残タスクの入力
    const updateRemaingBefore = (event) => {
        const newRemaing = event.target.value;
        setRemaingBefore(newRemaing);
    };
    // 作業後時点での残タスクの入力
    const updateRemaingAfter = (event) => {
        const newRemaing = event.target.value;
        setRemaingAfter(newRemaing);
    };
    // 所感の入力
    const updateImpression = (event) => {
        const newImpression = event.target.value;
        setImpression(newImpression);
    };
    // 作業前の入力を保存
    const saveBefore = () => {
        setDisplayMode("block");
        setDisplayEditMode("none");
        setDisableTabAfter(false);
    };
    // 作業前のタスクを編集
    const editBefore = () => {
        setDisplayMode("none");
        setDisplayEditMode("flex");
        setDisableTabAfter(true);
    };
    // 作業後の入力を保存
    const saveAfter = () => {
        setDisplayMode("block");
        setDisplayEditMode("none");
        setDisableTabBefore(false);
    };
    // 作業後のタスクを編集
    const editAfter = () => {
        setDisplayMode("none");
        setDisplayEditMode("flex");
        setDisableTabBefore(true);
    };
    return (
        <Box>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="朝" disabled={disableTabBefore} />
                <Tab label="夕" disabled={disableTabAfter} />
            </Tabs>
            <Box sx={{ padding: 2 }}>
                <Box display={displayEditMode}>
                    <FormControl>
                        <InputLabel id="select-month">月</InputLabel>
                        <Select
                            value={month}
                            labelId="select-month"
                            label="月"
                            onChange={updateMonth}
                        >
                            <MenuItem value={1}>1月</MenuItem>
                            <MenuItem value={2}>2月</MenuItem>
                            <MenuItem value={3}>3月</MenuItem>
                            <MenuItem value={4}>4月</MenuItem>
                            <MenuItem value={5}>5月</MenuItem>
                            <MenuItem value={6}>6月</MenuItem>
                            <MenuItem value={7}>7月</MenuItem>
                            <MenuItem value={8}>8月</MenuItem>
                            <MenuItem value={9}>9月</MenuItem>
                            <MenuItem value={10}>10月</MenuItem>
                            <MenuItem value={11}>11月</MenuItem>
                            <MenuItem value={12}>12月</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="select-day">日</InputLabel>
                        <Select
                            value={day}
                            labelId="select-day"
                            label="日"
                            onChange={updateDay}
                        >
                            <MenuItem value={1}>1日</MenuItem>
                            <MenuItem value={2}>2日</MenuItem>
                            <MenuItem value={3}>3日</MenuItem>
                            <MenuItem value={4}>4日</MenuItem>
                            <MenuItem value={5}>5日</MenuItem>
                            <MenuItem value={6}>6日</MenuItem>
                            <MenuItem value={7}>7日</MenuItem>
                            <MenuItem value={8}>8日</MenuItem>
                            <MenuItem value={9}>9日</MenuItem>
                            <MenuItem value={10}>10日</MenuItem>
                            <MenuItem value={11}>11日</MenuItem>
                            <MenuItem value={12}>12日</MenuItem>
                            <MenuItem value={13}>13日</MenuItem>
                            <MenuItem value={14}>14日</MenuItem>
                            <MenuItem value={15}>15日</MenuItem>
                            <MenuItem value={16}>16日</MenuItem>
                            <MenuItem value={17}>17日</MenuItem>
                            <MenuItem value={18}>18日</MenuItem>
                            <MenuItem value={19}>19日</MenuItem>
                            <MenuItem value={20}>20日</MenuItem>
                            <MenuItem value={21}>21日</MenuItem>
                            <MenuItem value={22}>22日</MenuItem>
                            <MenuItem value={23}>23日</MenuItem>
                            <MenuItem value={24}>24日</MenuItem>
                            <MenuItem value={25}>25日</MenuItem>
                            <MenuItem value={26}>26日</MenuItem>
                            <MenuItem value={27}>27日</MenuItem>
                            <MenuItem value={28}>28日</MenuItem>
                            <MenuItem value={29}>29日</MenuItem>
                            <MenuItem value={30} disabled={day29}>
                                30日
                            </MenuItem>
                            <MenuItem value={31} disabled={day31}>
                                31日
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {/* 朝が選択された場合 */}
                {tabIndex === 0 && (
                    <Box>
                        <Box display={displayMode}>
                            <Box component="p">
                                日付:{month}月{day}日
                            </Box>
                            <Box component="p">作業予定:{scheduleBefore}</Box>
                            <Box component="p">残タスク:{remaingBefore}</Box>
                            <Button onClick={editBefore}>編集</Button>
                        </Box>
                        <Box
                            sx={{ flexDirection: "column" }}
                            display={displayEditMode}
                        >
                            <TextField
                                label="作業予定"
                                multiline
                                rows={5}
                                value={scheduleBefore}
                                onChange={updateScheduleBefore}
                            ></TextField>
                            <TextField
                                label="残タスク"
                                multiline
                                rows={5}
                                value={remaingBefore}
                                onChange={updateRemaingBefore}
                            ></TextField>
                            <Button onClick={saveBefore}>保存</Button>
                        </Box>
                    </Box>
                )}
                {/* 夕が選択された場合 */}
                {tabIndex === 1 && (
                    <Box>
                        <Box component="p">
                            日付:{month}月{day}日
                        </Box>
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
