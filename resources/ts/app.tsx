import "../css/app.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Home from "./pages/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthLayout } from "./components/layout/AuthLayout";
import { Main } from "./pages/Main";

const App = () => {
    const theme = createTheme({
        palette: { primary: blue },
    });
    return (
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <CookiesProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<AuthLayout />}>
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />
                            </Route>
                            <Route path="/" element={<AppLayout />}>
                                <Route path="home" element={<Home />} />
                                <Route path="main" element={<Main />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </CookiesProvider>
            </RecoilRoot>
        </ThemeProvider>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
