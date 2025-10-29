import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import styles from "./Layout.module.css";
export function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
