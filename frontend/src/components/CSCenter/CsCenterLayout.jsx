import styles from "./CsCenterLayout.module.css";
import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";

export function CsCenterLayout() {
  return (
    <div className={styles.layout}>
      <SideBar />
      <div className={styles.pageContent}>
        <Outlet />
      </div>
    </div>
  );
}
