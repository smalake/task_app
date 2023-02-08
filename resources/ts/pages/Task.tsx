import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
import { allTaskState } from "../recoil/allTask";

export const Task = () => {
    const { taskId } = useParams();
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);
    const [day31, setDay31] = useState(true); //日付の表示制御用
    const [day29, setDay29] = useState(false); //日付の表示制御用
    const [content, setContent] = useState("");
    const [scheduleBefore, setScheduleBefore] = useState("");
    const [scheduleAfter, setScheduleAfter] = useState("");
    const [remaingBefore, setRemaingBefore] = useState("");
    const [remaingAfter, setRemaingAfter] = useState("");
    const [impression, setImpression] = useState("");
    const [tabIndex, setTabIndex] = useState(0); //タブ切り替え用
    const [displayMode, setDisplayMode] = useState("block"); //表示モードの表示・非表示の制御用
    const [displayEditMode, setDisplayEditMode] = useState("none"); //編集モードの表示・非表示の制御用
    const [disableTabBefore, setDisableTabBefore] = useState(false);
    const [disableTabAfter, setDisableTabAfter] = useState(false);
    const [tasks, setTasks] = useRecoilState(allTaskState);

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
                setMonth(res.data.month);
                setDay(res.data.day);
                setContent(res.data.content);
                setScheduleBefore(res.data.scheduleBefore);
                setScheduleAfter(res.data.scheduleAfter);
                setRemaingBefore(res.data.remaingTaskBefore);
                setRemaingAfter(res.data.remaingTaskAfter);
                setImpression(res.data.impression);
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
    const saveBefore = async () => {
        // 表示・非表示の切り替え
        setDisplayMode("block");
        setDisplayEditMode("none");
        setDisableTabAfter(false);
        try {
            // 作業内容が空欄だったら作業予定をコピーする
            if (content === "") {
                setContent(scheduleBefore);
            }
            // 明日の予定が空欄だったら今日の予定をコピーする
            if (remaingAfter === "") {
                setRemaingAfter(remaingBefore);
            }
            // 内容をDBへと保存
            await taskApi.update(taskId, {
                month: month,
                day: day,
                scheduleBefore: scheduleBefore,
                remaingBefore: remaingBefore,
                remaingAfter: remaingAfter,
                content: content,
                timing: "before",
            });
        } catch (err) {
            alert("更新に失敗しました");
            console.log(err);
        }
    };
    // 作業前のタスクを編集
    const editBefore = () => {
        // 表示・非表示の切り替え
        setDisplayMode("none");
        setDisplayEditMode("flex");
        setDisableTabAfter(true);
    };
    // 作業後の入力を保存
    const saveAfter = async () => {
        // 表示・非表示の切り替え
        setDisplayMode("block");
        setDisplayEditMode("none");
        setDisableTabBefore(false);
        // 内容をDBへと保存
        try {
            await taskApi.update(taskId, {
                month: month,
                day: day,
                scheduleAfter: scheduleAfter,
                remaingAfter: remaingAfter,
                content: content,
                impression: impression,
                timing: "after",
            });
        } catch (err) {
            alert("更新に失敗しました");
            console.log(err);
        }
    };
    // 作業後のタスクを編集
    const editAfter = () => {
        // 表示・非表示の切り替え
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
                    <FormControl sx={{ margin: "10px 5px" }}>
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
                    <FormControl sx={{ margin: "10px 5px" }}>
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
                        {/* 表示モード */}
                        <Box display={displayMode}>
                            <Box component="p">
                                日付:{month}月{day}日
                            </Box>
                            <Box component="p" sx={{ whiteSpace: "pre" }}>
                                作業予定:
                                <br />
                                {scheduleBefore}
                            </Box>
                            <Box component="p" sx={{ whiteSpace: "pre" }}>
                                残タスク:
                                <br />
                                {remaingBefore}
                            </Box>
                            <Button onClick={editBefore} variant="outlined">
                                編集
                            </Button>
                            <Button
                                onClick={editBefore}
                                variant="outlined"
                                color="error"
                                sx={{ marginLeft: "50px" }}
                            >
                                削除
                            </Button>
                        </Box>
                        {/* 編集モード */}
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
                                sx={{ margin: "10px 5px" }}
                            ></TextField>
                            <TextField
                                label="残タスク"
                                multiline
                                rows={5}
                                value={remaingBefore}
                                onChange={updateRemaingBefore}
                                sx={{ margin: "10px 5px" }}
                            ></TextField>
                            <Button
                                sx={{ width: "20%" }}
                                onClick={saveBefore}
                                variant="outlined"
                            >
                                保存
                            </Button>
                        </Box>
                    </Box>
                )}
                {/* 夕が選択された場合 */}
                {tabIndex === 1 && (
                    <Box>
                        {/* 表示モード */}
                        <Box display={displayMode}>
                            <Box component="p">
                                日付:{month}月{day}日
                            </Box>
                            <Box component="p">
                                作業内容:
                                <br />
                                {content}
                            </Box>
                            <Box component="p" sx={{ whiteSpace: "pre" }}>
                                作業予定:
                                <br />
                                {scheduleAfter}
                            </Box>
                            <Box component="p" sx={{ whiteSpace: "pre" }}>
                                残タスク:
                                <br />
                                {remaingAfter}
                            </Box>
                            <Box component="p" sx={{ whiteSpace: "pre" }}>
                                所感:
                                <br />
                                {impression}
                            </Box>
                            <Button onClick={editAfter} variant="outlined">
                                編集
                            </Button>
                        </Box>
                        {/* 編集モード */}
                        <Box
                            sx={{ flexDirection: "column" }}
                            display={displayEditMode}
                        >
                            <TextField
                                label="作業内容"
                                multiline
                                rows={5}
                                value={content}
                                onChange={updateContent}
                                sx={{ margin: "10px 5px" }}
                            ></TextField>
                            <TextField
                                label="作業予定"
                                multiline
                                rows={5}
                                value={scheduleAfter}
                                onChange={updateScheduleAfter}
                                sx={{ margin: "10px 5px" }}
                            ></TextField>
                            <TextField
                                label="残タスク"
                                multiline
                                rows={5}
                                value={remaingAfter}
                                onChange={updateRemaingAfter}
                                sx={{ margin: "10px 5px" }}
                            ></TextField>
                            <TextField
                                label="所感"
                                multiline
                                rows={5}
                                value={impression}
                                onChange={updateImpression}
                                sx={{ margin: "10px 5px" }}
                            ></TextField>
                            <Button
                                sx={{ width: "20%" }}
                                onClick={saveAfter}
                                variant="outlined"
                            >
                                保存
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
