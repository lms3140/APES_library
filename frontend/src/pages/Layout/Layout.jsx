import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import styles from "./Layout.module.css";
import { useEffect, useState } from "react";
import { FixedHeader } from "./Header/FixedHeader";
export function Layout() {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsSticky(window.scrollY > 113);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.layout}>
      {isSticky && <FixedHeader />}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
