import {
    List,
    ListSubheader,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../recoil/loginUser";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosClient } from "../../api/axiosClient";
import { LoadingButton } from "@mui/lab";
import { taskApi } from "../../api/taskApi";
import { allTaskState } from "../../recoil/allTask";

export const Sidebar = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const [tasks, setTasks] = useRecoilState(allTaskState);
    const { taskId } = useParams();

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
            } catch (err) {
                console.log(err);
            }
        };
        getTasks();
    }, [navigate]);

    // 選択されているタスクに色を付ける
    useEffect(() => {
        const targetIndex = tasks.findIndex(
            (item: TaskList) => item.id === Number(taskId)
        );
        setActiveIndex(targetIndex);
    }, [navigate]);

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
            >
                新規作成
            </LoadingButton>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary="2月" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {tasks.map((item: TaskList, index: Number) => (
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
            </Collapse>
        </List>
    );
};
