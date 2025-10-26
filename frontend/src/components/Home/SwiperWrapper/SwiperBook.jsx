/**
 * Swiper를 bookList에 맞게 래핑한 컴포넌트
 */

import { Swiper, SwiperSlide } from "swiper/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import styles from "./SwiperBook.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { useState } from "react";

/**
 * 책 리스트를 쉽게 사용하기 위해 swiper 라이브러리를 래핑해 구현한 컴포넌트입니다.
 *
 *
 * @typedef {object} SwiperWrapperProps
 * @property {import("swiper/types").SwiperOptions} swiperOptions Swiper의 속성값입니다.
 * @property {{url:string,bookName:string}[]} bookList 책 리스트
 * @param {SwiperWrapperProps} props Props
 *
 * @returns {import("react").JSX.Element}
 *
 * @example
 * // img 배열
 * const bookList = [{url:"cake.jpg"},{url:"iceTea"}];
 * // 옵션을 별도로 선언
 * const swiperOptions = {
 *    slidesPerView:1,
 *    navigation: true,
 *    ...
 * }
 * <SwiperBook
 *    swiperOptions={swiperOptions}
 *    bookList={bookList}
 *  />
 */
export function SwiperBook({ swiperOptions, bookList }) {
  const [swiper, setSwiper] = useState();

  return (
    <div className={styles.swiperBook}>
      <button
        className={`${styles.slideControlButton} ${styles.slideControlPrevButton}`}
        onClick={() => {
          swiper && swiper.slidePrev();
        }}
      >
        <BsChevronLeft />
      </button>
      <button
        className={`${styles.slideControlNextButton} ${styles.slideControlButton}`}
        onClick={() => {
          swiper && swiper.slideNext();
        }}
      >
        <BsChevronRight />
      </button>
      <Swiper onSwiper={setSwiper} {...swiperOptions}>
        {bookList.map((book) => {
          return (
            <SwiperSlide key={book.url}>
              <div className={styles.bookSlide}>
                <img
                  width={180}
                  height={260}
                  src={`${book.url}`}
                  alt={book.bookName}
                />
                <span>{book.bookName}</span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
