import { useState } from "react";
import styles from "./InquiryItem.module.css";
import { downArrowIcon, upArrowIcon } from "../../components/common/Svgs";

export function InquiryItem({ inquiry }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.itemWrap}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.left}>
          <span className={styles.status}>{inquiry.status}</span>
        </div>

        <div className={styles.titleArea}>
          <span className={styles.qIcon}>Q</span>
          <span className={styles.title}>{inquiry.title}</span>
        </div>

        <div className={styles.right}>
          <span className={styles.date}>{inquiry.createdData}</span>
          {isOpen ? upArrowIcon : downArrowIcon}
        </div>
      </div>

      {isOpen && (
        <div className={styles.contentBox}>
          <p className={styles.content}>{inquiry.content}</p>

          <div className={styles.buttonArea}>
            <button className={styles.editBtn}>수정</button>
            <button className={styles.deleteBtn}>삭제</button>
          </div>
        </div>
      )}
    </div>
  );
}
