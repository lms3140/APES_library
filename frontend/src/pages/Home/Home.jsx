import styles from "./Home.module.css";
import { SwiperBook } from "../../components/SwiperWrapper/SwiperBook";
import { BannerSection } from "./BannerSection/BannerSection";
import { ShortcutSection } from "./ShortcutSection/ShortcutSection";

const mainSwiperOptions = {
  slidesPerView: 6,
};

const bookList = [
  {
    url: "/images/bookImg/b1.webp",
    bookName: "2025 노벨문학상 크러스너 호르커이 라슬로 세트",
  },
  { url: "/images/bookImg/b2.webp", bookName: "사탄탱고" },
  { url: "/images/bookImg/b3.webp", bookName: "저항의 멜랑콜리" },
  { url: "/images/bookImg/b4.webp", bookName: "서왕모의 강림" },
  { url: "/images/bookImg/b5.webp", bookName: "라스트 울프" },
  { url: "/images/bookImg/b6.webp", bookName: "좀비가 사라지다" },
  { url: "/images/bookImg/b7.webp", bookName: "벵크하임 남작의 귀향" },
  { url: "/images/bookImg/b8.webp", bookName: "세계는 계속된다" },
];

export function Home() {
  return (
    <div className={styles.homeContainer}>
      <BannerSection />
      <ShortcutSection />

      <section
        style={{ maxWidth: 1328, marginInline: "auto", overflow: "visible" }}
      >
        <div style={{ maxWidth: 1200, marginInline: "auto" }}>
          <h2>타이틀</h2>
        </div>
        <SwiperBook swiperOptions={mainSwiperOptions} bookList={bookList} />
      </section>
    </div>
  );
}
