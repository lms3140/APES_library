import { useEffect, useRef, useState } from "react";

/**
 *
 * 스크롤 위치에 따라 헤더에 sticky 상태를 적용하는 커스텀 훅
 *
 * @param {React.RefObject} ref sticky를 적용할 header의 ref
 * @returns {object} { isSticky, ref } - 현재 sticky 여부와 ref 반환
 */
export const useStickyHeader = (ref) => {
  // 스티키 상태
  const [isSticky, setIsSticky] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    // 스크롤 이벤트
    const handleScroll = () => {
      if (!ref.current) return;
      const offsetHeight = ref.current.offsetHeight;
      // getComputedStyle로 마진 계산
      const marginBottom = parseFloat(
        getComputedStyle(ref.current).marginBottom
      );

      // 티킹이 false일시 실행
      if (!ticking.current) {
        //프레임 직전에 callback 실행하는 함수.
        window.requestAnimationFrame(() => {
          setIsSticky(window.scrollY > offsetHeight + marginBottom);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isSticky };
};
