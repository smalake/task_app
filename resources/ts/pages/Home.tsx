import React from "react";
import { useRecoilValue } from "recoil";
import { useCookies } from "react-cookie";

const Home = () => {
    const [cookie] = useCookies([""]);
    if ("XSRF-TOKEN" in cookie) {
        console.log("has!");
    } else {
        console.log("not!");
    }
    console.log(cookie);
    return <div>Home</div>;
};

export default Home;
