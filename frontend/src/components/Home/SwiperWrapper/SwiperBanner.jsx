/**
 * Swiper를 한번 래핑한 컴포넌트
 */

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

/**
 *
 * @typedef {object} SwiperWrapperProps
 * @property {import("swiper/types").SwiperOptions} swiperOptions Swiper의 속성값입니다.
 * @property {string} url 사진파일 경로
 * @property {{fileName:string}[]} imgNameList 사진파일 이름이 들어간 배열
 *
 * @param {SwiperWrapperProps} props Props
 *
 * @returns {import("react").JSX.Element}
 */
export function SwiperBanner({ swiperOptions, url, imgNameList }) {
  return (
    <Swiper {...swiperOptions}>
      {imgNameList.map((name) => {
        return (
          <SwiperSlide>
            <div>
              <img src={`${url}/${name.fileName}`} alt={name.fileName} />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
