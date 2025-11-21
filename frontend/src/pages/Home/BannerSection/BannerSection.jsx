import styles from "./BannerSection.module.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useMemo, useState } from "react";
import { SwiperBanner } from "../../../components/SwiperWrapper/SwiperBanner";

const bannerImgNames = [
  { url: "./images/bannerImg/ad1.png" },
  { url: "./images/bannerImg/ad2.png" },
  { url: "./images/bannerImg/ad3.png" },
];
const eventBanner = [
  { url: "./images/bannerImg/eb1.png", msg: "시원한 생수" },
  { url: "./images/bannerImg/eb2.png", msg: "이어폰!" },
  { url: "./images/bannerImg/eb3.png", msg: "노트북" },
  { url: "./images/bannerImg/eb4.png", msg: "볼펜" },
];

const mainSwiperOptions = {
  className: styles.swiper,
  slidesPerView: 1,
  navigation: true,
  pagination: { clickable: true },
  modules: [Navigation, Pagination, Autoplay],
  loop: true,
  autoplay: {
    delay: 2500,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
  },
};

export function BannerSection() {
  // index를 끌어와 알맞는 msg를 띄워주기
  const [eventBannerIdx, setEventBannerIdx] = useState(0);

  // props 참조변경을 막기위해 memo
  const sideSwiperOptions = useMemo(() => {
    return {
      slidesPerView: 1,
      pagination: { clickable: true },
      onSlideChange: (swiper) => {
        setEventBannerIdx(swiper.realIndex);
      },
      onSwiper: (swiper) => {
        setEventBannerIdx(swiper.realIndex);
      },
      modules: [Navigation, Pagination],
      loop: true,
    };
  }, []);

  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerWrapper}>
        <SwiperBanner
          swiperOptions={mainSwiperOptions}
          imgList={bannerImgNames}
          width={890}
          height={380}
        />
      </div>
      <div className={styles.eventBannerWrapper}>
        <div style={{ height: 274 }}>
          <SwiperBanner
            swiperOptions={sideSwiperOptions}
            imgList={eventBanner}
          />
        </div>
        <div className={styles.eBannerMsg}>
          <a href="#">
            <span>{eventBanner[eventBannerIdx].msg}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
