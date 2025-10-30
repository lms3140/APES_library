import { useEffect, useRef, useState } from "react";
import { Header } from "./Header/Header";
import { useStickyHeader } from "../../hooks/useStickyHeader";

/**
 * 헤더 전환(Sticky - Default)을 담당하는 컴포넌트입니다.
 *
 * `useStickyHeader` 훅을 통해 스크롤 상태를 감지하여,
 * 일반 헤더(`mainHeader`)와 고정 헤더(`stickyHeader`)를 자동으로 전환합니다.
 *
 * @component
 * @param {Object} props - HeaderSwitch 컴포넌트의 속성
 * @param {React.ComponentType} [props.mainHeader=MainHeader] - 기본 헤더로 사용할 컴포넌트
 * @param {React.ComponentType} [props.stickyHeader=FixedHeader] - 스크롤 시 전환될 고정 헤더 컴포넌트
 * @returns {JSX.Element} 현재 스크롤 위치에 따라 적절한 헤더를 렌더링합니다.
 *
 * @example
 * ```tsx
 * <HeaderSwitch
 *   mainHeader={MainHeader}
 *   stickyHeader={FixedHeader}
 * />
 * ```
 */
export function HeaderSwitch({
  mainHeader: Default = MainHeader,
  stickyHeader: Sticky = FixedHeader,
}) {
  const ref = useRef(null);
  const { isSticky } = useStickyHeader(ref);
  return (
    <>
      {isSticky ? (
        <Header headerType="sticky">
          <Sticky />
        </Header>
      ) : (
        <Header ref={ref}>
          <Default />
        </Header>
      )}
    </>
  );
}
