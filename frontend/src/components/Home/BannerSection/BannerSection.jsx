import styles from "./BannerSection.module.css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { useState } from "react";
import { SwiperBanner } from "../SwiperWrapper/SwiperBanner";

const bannerImgNames = [
  { fileName: "ad1.png" },
  { fileName: "ad2.png" },
  { fileName: "ad3.png" },
  { fileName: "ad4.png" },
];
const eventBanner = [
  { url: "eb1.jpg", msg: "깊이 생각하면 다칩니다." },
  { url: "eb2.jpg", msg: "안녕하세요" },
  { url: "eb3.jpg", msg: "안녕하세요ㅎㅎ" },
];

const swiperOptions = {
  className: styles.swiper,
  slidesPerView: 1,
  navigation: true,
  pagination: { clickable: true },
  onSlideChange: () => console.log("slide change"),
  onSwiper: (swiper) => console.log(swiper),
  modules: [Navigation, Pagination],
  loop: true,
};

export function BannerSection() {
  const [eventBannerIdx, setEventBannerIdx] = useState(0);
  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerWrapper}>
        {/* <Swiper
          className={styles.swiper}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Navigation, Pagination]}
          loop
        >
          {bannerImgNames.map((name) => {
            return (
              <SwiperSlide>
                <img src={`./images/bannerImg/${name}`} alt={name} />
              </SwiperSlide>
            );
          })}
        </Swiper> */}
        <SwiperBanner
          swiperOptions={swiperOptions}
          imgNameList={bannerImgNames}
        />
      </div>
      <div className={styles.eventBannerWrapper}>
        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setEventBannerIdx(swiper.activeIndex)}
          onSwiper={(swiper) => {
            console.log(swiper);
            setEventBannerIdx(swiper.activeIndex);
          }}
          modules={[Navigation, Pagination]}
          loop
        >
          {eventBanner.map((name) => {
            return (
              <SwiperSlide>
                <div>
                  <img src={`./images/bannerImg/${name.url}`} alt={name} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div>{eventBanner[eventBannerIdx].msg}</div>
      </div>
    </section>
  );
}
