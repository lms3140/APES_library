import payStyle from "./OrderHistoryPayment.module.css";

export function OrderHistoryPayment({ payInfo }) {
  return (
    <div className={payStyle.container}>
      <div>주문금액</div>
      <div>{payInfo.originalAmount}</div>
    </div>
  );
}
