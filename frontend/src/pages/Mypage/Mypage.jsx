import myPageStyle from "./Mypage.module.css";
import { MyPageSidebar } from "./MyPageSide/MyPageSidebar";
import { Outlet } from "react-router-dom";

export function Mypage() {
  return (
    <div className={myPageStyle.container}>
      <MyPageSidebar />
      <Outlet />
    </div>
  );
}
