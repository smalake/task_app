import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export const AuthLayout = () => {
    const navigate = useNavigate();
    // ページ遷移が発生するたびCookieチェック
    useEffect(() => {
        const checkCookie = async () => {};
        checkCookie();
    }, [navigate]);
    return (
        <div>
            <Outlet />
        </div>
    );
};
