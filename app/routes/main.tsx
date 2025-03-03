import { Outlet } from "react-router";

export default function Main() {
    return (
        <div>
            <h1>Main</h1>
            <Outlet />
        </div>
    );
}