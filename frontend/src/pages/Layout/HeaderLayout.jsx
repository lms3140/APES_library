import { useRef } from "react";
import { Header } from "./Header/Header";
import { useStickyHeader } from "../../hooks/useStickyHeader";
import headerStyle from "./Header/Header.module.css";
import stickyStyle from "./Header/HeaderVariant/FixedHeader.module.css";

const headerTypeObj = {
  default: headerStyle.header,
  sticky: stickyStyle.fixedHeader,
};

export function HeaderLayout({ mainHeader: Default, stickyHeader: Sticky }) {
  const ref = useRef(null);
  const { isSticky } = useStickyHeader(ref);
  const { default: defaultHeader, sticky } = headerTypeObj;
  return (
    <div ref={ref} className={isSticky ? sticky : defaultHeader}>
      <Header>{isSticky ? <Sticky /> : <Default />}</Header>
    </div>
  );
}
