/**
 * shortcut 섹션 컴포넌트
 */

import styles from "./ShortcutSection.module.css";
import { AiFillBook } from "react-icons/ai";

const shortcutList = [
  { icon: <AiFillBook />, title: "할인혜택" },
  { icon: "icn", title: "오늘만특가" },
  { icon: "icn", title: "APP혜택" },
  { icon: "icn", title: "기프트카드" },
];

export function ShortcutSection() {
  return (
    <section className={styles.shortcutSection}>
      <div className={styles.shortcutWrapper}>
        <ul>
          {shortcutList.map(({ title, icon }) => {
            return (
              <li key={title + icon}>
                <a href="#">
                  <div className={styles.icon}>{icon}</div>
                  <span>{title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.adBannerWrapper}></div>
    </section>
  );
}
