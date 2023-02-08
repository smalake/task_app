import {
    List,
    ListSubheader,
    ListItemButton,
    ListItemText,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginUserState } from "../../recoil/loginUser";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../api/axiosClient";
import { LoadingButton } from "@mui/lab";
import { taskApi } from "../../api/taskApi";
import { allTaskState } from "../../recoil/allTask";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TaskList } from "../../types/TaskList";

export const Sidebar = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const [tasks, setTasks] = useRecoilState(allTaskState);
    const { taskId } = useParams();
    const [JanTask, setJanTask] = useState([]);
    const [FebTask, setFebTask] = useState([]);
    const [MarTask, setMarTask] = useState([]);
    const [AprTask, setAprTask] = useState([]);
    const [MayTask, setMayTask] = useState([]);
    const [JunTask, setJunTask] = useState([]);
    const [JulTask, setJulTask] = useState([]);
    const [AugTask, setAugTask] = useState([]);
    const [SepTask, setSepTask] = useState([]);
    const [OctTask, setOctTask] = useState([]);
    const [NovTask, setNovTask] = useState([]);
    const [DecTask, setDecTask] = useState([]);

    useEffect(() => {
        const userCheck = async () => {
            // ユーザ情報が入っていなければ取得してAtomに保存
            if (loginUser.username === "") {
                try {
                    const userRes = await axiosClient.get("/api/get-user");
                    console.log(userRes);
                    setLoginUser({
                        id: userRes.data.id,
                        username: userRes.data.username,
                    });
                } catch (err) {
                    console.log(err);
                    if (err.status === 401) {
                        alert("認証エラー\n再度ログインしてください。");
                        navigate("/login");
                    }
                }
            }
        };
        userCheck();
    }, [navigate]);

    // タスク一覧を取得
    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await taskApi.getAll();
                setTasks(res.data);
                setJanTask(tasks.Jan);
                setFebTask(tasks.Feb);
                setMarTask(tasks.Mar);
                setAprTask(tasks.Apr);
                setMayTask(tasks.May);
                setJunTask(tasks.Jun);
                setJulTask(tasks.Jul);
                setAugTask(tasks.Aug);
                setSepTask(tasks.Sep);
                setOctTask(tasks.Oct);
                setNovTask(tasks.Nov);
                setDecTask(tasks.Dec);
            } catch (err) {
                console.log(err);
            }
        };
        getTasks();
        console.log(tasks);
    }, [navigate]);

    // // 選択されているタスクに色を付ける
    // useEffect(() => {
    //     const targetIndex = tasks.findIndex(
    //         (item: TaskList) => item.id === Number(taskId)
    //     );
    //     setActiveIndex(targetIndex);
    // }, [navigate, tasks]);

    // リストを開閉する
    const handleClick = () => {
        setOpen(!open);
    };
    // タスクの新規作成
    const createTask = async () => {
        try {
            setLoading(true);
            const res = await taskApi.create();
            console.log(res);
            navigate(`/task/${res.data.id}`);
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <List
            sx={{
                width: "100%",
                maxWidth: 200,
                bgcolor: "background.paper",
                padding: "10px 20px",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    {loginUser.username}
                </ListSubheader>
            }
        >
            <LoadingButton
                fullWidth
                variant="outlined"
                onClick={() => createTask()}
                loading={loading}
                sx={{ margin: "20px 0" }}
            >
                新規作成
            </LoadingButton>
            <Accordion
                disableGutters={true}
                disabled={JanTask.length === 0 ? true : false}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>1月</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {JanTask.map((item: TaskList, index: Number) => (
                        <ListItemButton
                            sx={{ pl: "20px" }}
                            selected={index === activeIndex}
                            component={Link}
                            to={`/task/${item.id}`}
                            key={item.id}
                        >
                            {item.month}月{item.day}日
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion
                disableGutters={true}
                disabled={FebTask.length === 0 ? true : false}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>2月</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {FebTask.map((item: TaskList, index: Number) => (
                        <ListItemButton
                            sx={{ pl: "20px" }}
                            selected={index === activeIndex}
                            component={Link}
                            to={`/task/${item.id}`}
                            key={item.id}
                        >
                            {item.month}月{item.day}日
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion
                disableGutters={true}
                disabled={MarTask.length === 0 ? true : false}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>3月</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {MarTask.map((item: TaskList, index: Number) => (
                        <ListItemButton
                            sx={{ pl: "20px" }}
                            selected={index === activeIndex}
                            component={Link}
                            to={`/task/${item.id}`}
                            key={item.id}
                        >
                            {item.month}月{item.day}日
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion
                disableGutters={true}
                disabled={AprTask.length === 0 ? true : false}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>4月</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {AprTask.map((item: TaskList, index: Number) => (
                        <ListItemButton
                            sx={{ pl: "20px" }}
                            selected={index === activeIndex}
                            component={Link}
                            to={`/task/${item.id}`}
                            key={item.id}
                        >
                            {item.month}月{item.day}日
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion
                disableGutters={true}
                disabled={MayTask.length === 0 ? true : false}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>5月</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {MayTask.map((item: TaskList, index: Number) => (
                        <ListItemButton
                            sx={{ pl: "20px" }}
                            selected={index === activeIndex}
                            component={Link}
                            to={`/task/${item.id}`}
                            key={item.id}
                        >
                            {item.month}月{item.day}日
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion
                disableGutters={true}
                disabled={JunTask.length === 0 ? true : false}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>6月</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {JunTask.map((item: TaskList, index: Number) => (
                        <ListItemButton
                            sx={{ pl: "20px" }}
                            selected={index === activeIndex}
                            component={Link}
                            to={`/task/${item.id}`}
                            key={item.id}
                        >
                            {item.month}月{item.day}日
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion
                disableGutters={true}
                disabled={JulTask.length === 0 ? true : false}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>7月</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {JulTask.map((item: TaskList, index: Number) => (
                        <ListItemButton
                            sx={{ pl: "20px" }}
                            selected={index === activeIndex}
                            component={Link}
                            to={`/task/${item.id}`}
                            key={item.id}
                        >
                            {item.month}月{item.day}日
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion
                disableGutters={true}
                disabled={AugTask.length === 0 ? true : false}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>8月</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {AugTask.map((item: TaskList, index: Number) => (
                        <ListItemButton
                            sx={{ pl: "20px" }}
                            selected={index === activeIndex}
                            component={Link}
                            to={`/task/${item.id}`}
                            key={item.id}
                        >
                            {item.month}月{item.day}日
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion
                disableGutters={true}
                disabled={SepTask.length === 0 ? true : false}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>9月</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {SepTask.map((item: TaskList, index: Number) => (
                        <ListItemButton
                            sx={{ pl: "20px" }}
                            selected={index === activeIndex}
                            component={Link}
                            to={`/task/${item.id}`}
                            key={item.id}
                        >
                            {item.month}月{item.day}日
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion
                disableGutters={true}
                disabled={OctTask.length === 0 ? true : false}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>10月</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {OctTask.map((item: TaskList, index: Number) => (
                        <ListItemButton
                            sx={{ pl: "20px" }}
                            selected={index === activeIndex}
                            component={Link}
                            to={`/task/${item.id}`}
                            key={item.id}
                        >
                            {item.month}月{item.day}日
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion
                disableGutters={true}
                disabled={NovTask.length === 0 ? true : false}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>11月</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {NovTask.map((item: TaskList, index: Number) => (
                        <ListItemButton
                            sx={{ pl: "20px" }}
                            selected={index === activeIndex}
                            component={Link}
                            to={`/task/${item.id}`}
                            key={item.id}
                        >
                            {item.month}月{item.day}日
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion
                disableGutters={true}
                disabled={DecTask.length === 0 ? true : false}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>12月</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {DecTask.map((item: TaskList, index: Number) => (
                        <ListItemButton
                            sx={{ pl: "20px" }}
                            selected={index === activeIndex}
                            component={Link}
                            to={`/task/${item.id}`}
                            key={item.id}
                        >
                            {item.month}月{item.day}日
                        </ListItemButton>
                    ))}
                </AccordionDetails>
            </Accordion>
        </List>
    );
};
