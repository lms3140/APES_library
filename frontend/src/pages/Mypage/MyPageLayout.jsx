import myPageStyle from "./MyPageLayout.module.css";
import { MyPageSidebar } from "./MyPageSidebar.jsx";
import { Outlet } from "react-router-dom";

export function MyPageLayout() {
  return (
    <div className={myPageStyle.container}>
      <MyPageSidebar />
      <Outlet />
    </div>
  );
}
