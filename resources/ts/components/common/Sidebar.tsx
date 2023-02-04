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
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axiosClient";

export const Sidebar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);

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

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <List
            sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    {loginUser.username}
                </ListSubheader>
            }
        >
            <ListItemButton onClick={handleClick}>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
};
