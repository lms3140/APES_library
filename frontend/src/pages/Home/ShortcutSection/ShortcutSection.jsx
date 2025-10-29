/**
 * shortcut 섹션 컴포넌트
 */

import styles from "./ShortcutSection.module.css";
import { AiFillBook } from "react-icons/ai";
import { Link } from "react-router-dom";

const shortcutList = [
  { icon: <AiFillBook />, title: "매점정보", to: "/store-info/001" },
  { icon: "icn", title: "오늘만특가", to: "#" },
  { icon: "icn", title: "APP혜택", to: "#" },
  { icon: "icn", title: "기프트카드", to: "#" },
];

export function ShortcutSection() {
  return (
    <section className={styles.shortcutSection}>
      <div className={styles.shortcutWrapper}>
        <ul>
          {shortcutList.map(({ title, icon, to }) => {
            return (
              <li key={title + icon}>
                <Link to={to}>
                  <div className={styles.icon}>{icon}</div>
                  <span>{title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.adBannerWrapper}></div>
    </section>
  );
}
