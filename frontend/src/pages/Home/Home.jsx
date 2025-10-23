import { BannerSection } from "../../components/Home/BannerSection/BannerSection";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.homeContainer}>
      <BannerSection />
      <section className={styles.shortcutSection}>
        <div className={styles.shortcutWrapper}>
          <ul>
            <li>
              <a href="#">
                <div></div>
                <span>할인혜택</span>
              </a>
            </li>
            <li>
              <a href="#">
                <div></div>
                <span>할인혜택</span>
              </a>
            </li>
            <li>
              <a href="#">
                <div></div>
                <span>할인혜택</span>
              </a>
            </li>
            <li>
              <a href="">
                <div></div>
                <span>할혜</span>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.adBannerWrapper}></div>
      </section>
    </div>
  );
}
