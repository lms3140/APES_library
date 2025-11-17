/**
 * Swiper를 배너 형식에 맞게 래핑한 컴포넌트
 */

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

/**
 * 배너를 쉽게 사용하기 위해 swiper 라이브러리를 래핑해 구현한 컴포넌트입니다.
 *
 *
 * @typedef {object} SwiperWrapperProps
 * @property {import("swiper/types").SwiperOptions} swiperOptions Swiper의 속성값입니다.
 * @property {{url:string}[]} imgList 사진url 리스트
 * @param {SwiperWrapperProps} props Props
 *
 * @returns {import("react").JSX.Element}
 *
 * @example
 * // img 배열
 * const imgNameList = [{url:"cake.jpg"},{url:"iceTea"}];
 * // 옵션을 별도로 선언
 * const swiperOptions = {
 *    slidesPerView:1,
 *    navigation: true,
 *    ...
 * }
 * <SwiperBanner
 *    swiperOptions={swiperOptions}
 *    imgList={imgNameList}
 *  />
 */
export function SwiperBanner({ swiperOptions, imgList, width, height }) {
  return (
    <Swiper {...swiperOptions}>
      {imgList.map((img) => {
        return (
          <SwiperSlide>
            <div>
              <img
                src={`${img.url}`}
                alt={img.url}
                width={width}
                height={height}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
