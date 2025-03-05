import { Stack } from "@mui/material";
import { Outlet } from "react-router";
import Bottom from "./main/bottom";
import Top from "./main/top";
import "./main/main.css";
export default function Main() {
    return (

        <div className="main-div">
            <Top />
            <div className="main-container">
                <Outlet />
            </div>
            <Bottom />
        </div>

    );
}