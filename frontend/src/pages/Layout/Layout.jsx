import { Outlet } from "react-router-dom";
import { MainHeader } from "./Header/HeaderVariant/MainHeader";
import { Footer } from "./Footer/Footer";
import styles from "./Layout.module.css";
import { FixedHeader } from "./Header/HeaderVariant/FixedHeader";
import { UserMenu } from "./Header/UserMenu/UserMenu";
import { HeaderLayout } from "./HeaderLayout";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Layout() {
  return (
    <div className={styles.layout}>
      <UserMenu />
      <HeaderLayout mainHeader={MainHeader} stickyHeader={FixedHeader} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Flip}
      />
      <Outlet />
      <Footer />
    </div>
  );
}
