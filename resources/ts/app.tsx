import "../css/app.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Home from "./pages/Home";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthLayout } from "./components/layout/AuthLayout";
import { Main } from "./pages/Main";
import { Task } from "./pages/Task";
import CircularProgress from "@mui/material/CircularProgress";

const App = () => {
    const theme = createTheme({
        palette: { primary: blue },
    });
    // 値取得中のローディング処理
    const Fallback = () => {
        return (
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        );
    };
    return (
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <Suspense fallback={<Fallback />}>
                    <CookiesProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<AuthLayout />}>
                                    <Route path="login" element={<Login />} />
                                    <Route
                                        path="register"
                                        element={<Register />}
                                    />
                                </Route>
                                <Route path="/" element={<AppLayout />}>
                                    <Route path="home" element={<Home />} />
                                    <Route path="task" element={<Main />} />
                                    <Route
                                        path="task/:taskId"
                                        element={<Task />}
                                    />
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </CookiesProvider>
                </Suspense>
            </RecoilRoot>
        </ThemeProvider>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
