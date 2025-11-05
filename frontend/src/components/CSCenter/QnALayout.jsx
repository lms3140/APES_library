import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";

export function QnALayout() {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  );
}
