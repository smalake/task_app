import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../api/axiosClient";
import { loginUserState } from "../recoil/loginUser";
import { useCookies } from "react-cookie";

export const Login = () => {
    const navigate = useNavigate();
    const [usernameErrText, setUsernameErrText] = useState<string>("");
    const [passwordErrText, setPasswordErrText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const [cookie] = useCookies([""]);

    useEffect(() => {
        // Sanctum認証用のトークンを持っていたら認証されているとみなしてログイン処理は省略
        if ("XSRF-TOKEN" in cookie) {
            navigate("/home");
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUsernameErrText("");
        setPasswordErrText("");
        // 入力欄の文字列を取得
        const username: string = event.target.username.value;
        const password: string = event.target.password.value;

        let error: boolean = false;

        if (username === "") {
            error = true;
            setUsernameErrText("名前を入力してください");
        }
        if (password === "") {
            error = true;
            setPasswordErrText("パスワードを入力してください");
        }

        if (error) {
            return;
        }
        setLoading(true);

        // ログインAPIを実行する
        try {
            await axiosClient.get("/sanctum/csrf-cookie");
            const loginRes = await axiosClient.post("/api/login", {
                username,
                password,
            });
            setLoginUser({
                id: loginRes.data.id,
                name: loginRes.data.username,
            });

            // ログイン成功したらトップページへ
            navigate("/home");
        } catch (error) {
            // ログイン失敗
            console.log(error);
            alert("ユーザ名かパスワードが間違っています");
            setLoading(false);
        }
    };
    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    fullWidth
                    id="username"
                    label="ユーザ名"
                    margin="normal"
                    name="username"
                    required
                    helperText={usernameErrText}
                    error={usernameErrText !== ""}
                    disabled={loading}
                />
                <TextField
                    fullWidth
                    id="password"
                    label="パスワード"
                    margin="normal"
                    name="password"
                    type="password"
                    required
                    helperText={passwordErrText}
                    error={passwordErrText !== ""}
                    disabled={loading}
                />
                <LoadingButton
                    sx={{ mt: 3, mb: 2 }}
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="outlined"
                    loading={loading}
                >
                    ログイン
                </LoadingButton>
            </Box>
            <Button onClick={() => navigate("/register")}>新規登録</Button>
        </>
    );
};
