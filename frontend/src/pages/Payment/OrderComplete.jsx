import React from "react";
import { useLocation } from "react-router-dom";
import paymentStyle from "./Payment.module.css";
import { StepItemNum } from "../../components/Cart/StepItemNum.jsx";

export function OrderComplete() {
  const location = useLocation();
  const finalPrice = location.state?.finalPrice || 0;

  return (
    <section className={paymentStyle.contents}>
      <div className={paymentStyle.paymentTopWrap}>
        <p className={paymentStyle.titleWrap}>주문 완료</p>
        <ul className={paymentStyle.stepWrapper}>
          <StepItemNum activeStep={3} />
        </ul>
      </div>

      <div className={paymentStyle.paymentLayout}>
        <div className={paymentStyle.leftArea}>
          <h2>주문이 완료되었습니다!</h2>
          <p>총 결제 금액: ₩ {finalPrice.toLocaleString()}</p>
          <p>감사합니다.</p>
        </div>
      </div>
    </section>
  );
}
