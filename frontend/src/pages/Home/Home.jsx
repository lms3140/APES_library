import styles from "./Home.module.css";
import { BannerSection } from "./BannerSection/BannerSection";
import { ShortcutSection } from "./ShortcutSection/ShortcutSection";
import { HomeColContent } from "./HomeCollectionContent/HomeColContent";

export function Home() {
  return (
    <div className={styles.homeContainer}>
      <BannerSection />
      <ShortcutSection />
      <HomeColContent />
    </div>
  );
}
