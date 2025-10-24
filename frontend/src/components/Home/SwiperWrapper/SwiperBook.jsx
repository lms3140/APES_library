/**
 * Swiper를 bookList에 맞게 래핑한 컴포넌트
 */

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import styles from "./SwiperBook.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";

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
  const ref = useRef(null);
  const [swiper, setSwiper] = useState();
  useEffect(() => {
    if (ref.current.swiper) {
      ("네 네???");
    }
  }, []);

  return (
    <div className={styles.swiperBook}>
      <Swiper {...swiperOptions} ref={ref}>
        <div></div>
        {bookList.map((book) => {
          return (
            <SwiperSlide>
              <div className={styles.bookSlide}>
                <img width={180} height={260} src={`${book.url}`} />
                <span>{book.bookName}</span>
              </div>
            </SwiperSlide>
          );
        })}
        <button onClick={() => {}}></button>
      </Swiper>
    </div>
  );
}
