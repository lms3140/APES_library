import React from "react";
import styles from "./CartCheakPopup.module.css";

/*
  CartCheakPopup 컴포넌트

  - 팝업 형태의 UI를 렌더링함
  - overlay(어두운 배경)를 클릭하면 닫히도록 onClose 전달받음
  - '장바구니로 이동' 버튼 클릭 시 onConfirm 콜백 실행
*/
const CartCheakPopup = ({ onClose, onConfirm }) => {
  return (
    // overlay: 팝업 뒤에 깔리는 어두운 배경
    // → 클릭 시 팝업 닫기(onClose 실행)
    <div className={styles.overlay} onClick={onClose}>

      {/*
        popup: 실제 팝업 박스
        - 이벤트 버블링을 막기 위해 stopPropagation 사용
        - overlay 영역 클릭 시에만 닫히게 하기 위함
      */}
      <div
        className={styles.popup}
        onClick={(e) => e.stopPropagation()} // 배경 클릭 이벤트 전달 막기
      >

        {/* 팝업 제목 */}
        <h3>알림</h3>

        {/* 본문 영역 */}
        <div className={styles.contentBox}>
          <p><strong>선택한 상품이 장바구니에 추가되었습니다.</strong></p>
          <p>장바구니로  이동하시겠어요?</p>
        </div>

        {/* 버튼 영역 */}
        <div className={styles.buttonContainer}>
          {/* 취소 버튼 → 팝업 닫기 */}
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>

          {/* 장바구니로 이동 버튼 → onConfirm 콜백 실행 */}
          <button className={styles.confirmButton} onClick={onConfirm}>
            장바구니로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCheakPopup;
