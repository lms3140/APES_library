import React from "react";
import styles from "./ShippingInfoPopup.module.css";

const ShippingInfoPopup = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.popup}
        onClick={(e) => e.stopPropagation()} // 부모 클릭 이벤트 막기
      >
        <h3>배송비 안내</h3>

        <div className={styles.contentBox}>
          <p>• 기본 배송비는 <strong>2,500원</strong>입니다.</p>
          <p>• 9,500원 이상 구매 시 <strong>무료배송</strong>이 적용됩니다.</p>
          <p>• 제주/도서산간 지역은 추가 배송비가 발생할 수 있습니다.</p>
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default ShippingInfoPopup;
