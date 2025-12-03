/**
 * Swiper를 bookList에 맞게 래핑한 컴포넌트
 */

import { Swiper, SwiperSlide } from "swiper/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

import styles from "./SwiperBook.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { useCallback, useEffect, useState } from "react";
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
  const { setSwiper, handlePrev, handleNext, isBeginning, isEnd } =
    useSwiperControl();
  return (
    <div className={styles.swiperBook}>
      <button
        className={`${styles.slideControlButton} ${
          styles.slideControlPrevButton
        } ${isBeginning ? styles.disabled : ""}`}
        onClick={handlePrev}
        disabled={isBeginning}
      >
        <BsChevronLeft />
      </button>
      <button
        className={`${styles.slideControlNextButton} ${
          styles.slideControlButton
        } ${isEnd ? styles.disabled : ""}`}
        onClick={handleNext}
        disabled={isEnd}
      >
        <BsChevronRight />
      </button>
      <Swiper onSwiper={setSwiper} {...swiperOptions}>
        {bookList.map((book) => {
          return (
            <SwiperSlide key={book.bookId}>
              <div className={styles.bookSlide}>
                <Link to={`/detail/${book.bookId}`}>
                  <img
                    width={180}
                    height={260}
                    src={`${book.imageUrl}`}
                    alt={book.bookName}
                  />
                </Link>
                <span className={styles.title}>{book.title}</span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

// 배너 컨트롤을 커스텀훅에 위임
// 아직은 SwiperBook.jsx에서 밖에 안쓰여서 여기에 작성
const useSwiperControl = () => {
  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsend] = useState(false);

  const handlePrev = () => {
    if (!swiper || isBeginning) return;
    swiper.slidePrev();
    setIsBeginning(swiper.isBeginning);
    setIsend(swiper.isEnd);
  };

  const handleNext = () => {
    if (!swiper || isEnd) return;
    swiper.slideNext();
    setIsBeginning(swiper.isBeginning);
    setIsend(swiper.isEnd);
  };

  return { handlePrev, handleNext, setSwiper, isEnd, isBeginning };
};
