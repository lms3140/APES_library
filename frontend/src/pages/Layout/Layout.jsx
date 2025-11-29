import { Outlet } from "react-router-dom";
import { MainHeader } from "./Header/HeaderVariant/MainHeader";
import { Footer } from "./Footer/Footer";
import styles from "./Layout.module.css";
import { FixedHeader } from "./Header/HeaderVariant/FixedHeader";
import { UserMenu } from "./Header/UserMenu/UserMenu";
import { HeaderLayout } from "./HeaderLayout";

export function Layout() {
  return (
    <div className={styles.layout}>
      <UserMenu />
      <HeaderLayout mainHeader={MainHeader} stickyHeader={FixedHeader} />
      <Outlet />
      <Footer />
    </div>
  );
}
