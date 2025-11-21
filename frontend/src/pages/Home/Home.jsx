import styles from "./Home.module.css";
import { BannerSection } from "./BannerSection/BannerSection";
import { HomeColContent } from "./HomeCollectionContent/HomeColContent";

export function Home() {
  return (
    <div className={styles.homeContainer}>
      <BannerSection />
      <HomeColContent />
    </div>
  );
}
