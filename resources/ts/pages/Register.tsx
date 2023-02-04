import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { axiosClient } from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginUserState } from "../recoil/loginUser";
import { useCookies } from "react-cookie";
import { createExpireDate } from "../lib/createExpire";

export const Register = () => {
    const navigate = useNavigate();
    const [usernameErrText, setUsernameErrText] = useState<string>("");
    const [emailErrText, setEmailErrText] = useState<string>("");
    const [passwordErrText, setPasswordErrText] = useState<string>("");
    const [confirmErrText, setConfirmErrText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [loginUser, setLoginUser] = useRecoilState(loginUserState);
    const [cookies, setCookie] = useCookies(["isLogin"]);
    const expireDate: Date = createExpireDate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setUsernameErrText("");
        setEmailErrText("");
        setPasswordErrText("");
        setConfirmErrText("");
        // 入力欄の文字列を取得
        const username: string = event.target.username.value;
        const email: string = event.target.email.value;
        const password: string = event.target.password.value;
        const confirmPassword: string = event.target.confirmPassword.value;

        let error: boolean = false;

        if (username === "") {
            error = true;
            setUsernameErrText("名前を入力してください");
        }
        if (email === "") {
            error = true;
            setEmailErrText("メールアドレスを入力してください");
        }
        if (password === "") {
            error = true;
            setPasswordErrText("パスワードを入力してください");
        }
        if (confirmPassword === "") {
            error = true;
            setConfirmErrText("確認用パスワードを入力してください");
        }
        if (password !== confirmPassword) {
            error = true;
            setConfirmErrText("パスワードと確認用パスワードが一致しません");
        }

        if (error) {
            return;
        }
        setLoading(true);

        // 新規登録APIを実行する
        try {
            await axiosClient.get("/sanctum/csrf-cookie");
            const registerRes = await axiosClient.post("/api/register", {
                username,
                email,
                password,
            });
            // Recoilにユーザ情報を保存する
            setLoginUser({
                id: registerRes.data.id,
                username: username,
            });
            console.log(registerRes);
            // ログイン用のCookieを保存する
            setCookie("isLogin", "cookie-set", { expires: expireDate });
            // 新規登録に成功したらトップページへ
            navigate("/task");
        } catch (error: any) {
            // 新規登録に失敗
            setLoading(false);
            const errors = error.response.data.errors;
            console.log(errors);
            if (errors.username) {
                setUsernameErrText(errors.username);
            }
            if (errors.email) {
                setEmailErrText(errors.email);
            }
            if (errors.password) {
                setPasswordErrText(errors.password);
            }
        }
    };
    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    fullWidth
                    id="username"
                    label="名前"
                    margin="normal"
                    name="username"
                    required
                    helperText={usernameErrText}
                    error={usernameErrText !== ""}
                    disabled={loading}
                />
                <TextField
                    fullWidth
                    id="email"
                    label="メールアドレス"
                    margin="normal"
                    name="email"
                    required
                    helperText={emailErrText}
                    error={emailErrText !== ""}
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
                <TextField
                    fullWidth
                    id="confirmPassword"
                    label="確認用パスワード"
                    margin="normal"
                    name="confirmPassword"
                    type="password"
                    required
                    helperText={confirmErrText}
                    error={confirmErrText !== ""}
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
                    新規登録
                </LoadingButton>
            </Box>
            <Button onClick={() => navigate("/login")}>
                すでにアカウントをお持ちの方はこちらからログイン
            </Button>
        </>
    );
};
