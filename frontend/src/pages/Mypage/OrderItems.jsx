import dayjs from "dayjs";
import style from "./OrderItems.module.css";
import { useState } from "react";
import ReviewWriteModal from "../Detail/ReviewWriteModal";
import { useNavigate } from "react-router-dom";

export function OrderItems({ orders, onDelete }) {
  const navigate = useNavigate();
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const formatOrderId = (paidAt, id) => {
    const date = dayjs(paidAt).format("YYYYMMDD");
    const serial = String(id).padStart(6, "0");
    return `${date}-${serial}`;
  };

  return (
    <div className={style.wrapper}>
      {orders.map((order) => (
        <div key={order.orderId} className={style.orderBox}>
          <div className={style.orderHeader}>
            <div>
              <span className={style.orderDate}>
                {dayjs(order.paidAt).format("YYYY.MM.DD")} (
                {formatOrderId(order.paidAt, order.orderId)})
              </span>
            </div>

            <div>
              <button onClick={() => onDelete(order.orderId)}>
                <img src="/images/mypage/ico_delete.png" alt="휴지통 아이콘" />
                주문내역에서 삭제
              </button>
            </div>
          </div>

          {order.items.map((item) => (
            <div key={item.bookId} className={style.itemRow}>
              <div className={style.itemInfo}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={style.itemImg}
                  onClick={() => navigate(`/detail/${item.bookId}`)}
                />
                <div className={style.itemText}>
                  <p
                    className={style.itemTitle}
                    onClick={() => navigate(`/detail/${item.bookId}`)}
                  >
                    [{item.categoryName}]{item.title}
                  </p>
                  <p className={style.itemQty}>수량 : {item.quantity}</p>
                </div>
              </div>

              <div className={style.priceBox}>
                <span>{item.unitPrice.toLocaleString()}</span>원
              </div>

              <div className={style.statusBox}>
                {order.orderStatus === "PAID"
                  ? "배송준비중"
                  : order.orderStatus}
              </div>

              <div className={style.reviewBox}>
                <button
                  className={style.reviewBtn}
                  onClick={() => {
                    setSelectedBookId(item.bookId);
                    setShowModal(true);
                  }}
                >
                  리뷰작성
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {showModal && (
        <ReviewWriteModal
          bookId={selectedBookId}
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
