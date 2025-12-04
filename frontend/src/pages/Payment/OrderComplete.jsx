import React from "react";
import { useLocation, Link } from "react-router-dom";
import paymentStyle from "./Payment.module.css";
import { StepItemNum } from "../../components/Cart/StepItemNum.jsx";

export function OrderComplete() {
  const location = useLocation(); // navigate에서 전달된 state 가져오기

  // 결제 완료 정보 가져오기, 기본값 처리
  const finalPrice = Number(location.state?.finalPrice ?? 0);
  const orderId = location.state?.orderId ?? "";

  return (
    <section className={paymentStyle.contents}>
      {/* ===== 상단 스텝 표시 ===== */}
      <div className={paymentStyle.paymentTopWrap}>
        <p className={paymentStyle.titleWrap}>주문 완료</p>
        <ul className={paymentStyle.stepWrapper}>
          <StepItemNum activeStep={3} /> {/* Step 3: 완료 */}
        </ul>
      </div>

      <div className={paymentStyle.paymentLayout}>
        {/* ===== 좌측 영역: 주문 완료 메시지 ===== */}
        <div className={paymentStyle.leftArea}>
          <h2>주문이 완료되었습니다</h2>

          {/* 홈으로 돌아가기 버튼 */}
          <Link to="/" className={paymentStyle.orderBtn}>
            홈으로 가기
          </Link>

          {/* 홈으로 돌아가기 버튼 */}
          <Link to="/mypage/orders" className={paymentStyle.orderBtn}>
            구매 목록
          </Link>

        </div>
      </div>
    </section>
  );
}
