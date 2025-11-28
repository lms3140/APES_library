import { useEffect, useState } from "react";
import paymentStyle from "./Payment.module.css";

export function Payment() {
  const [bookList, setBookList] = useState([
    {
      book_id: 1,
      imageUrl:
        "https://image.aladin.co.kr/product/37609/38/cover200/k842032742_1.jpg",
      title: "픽미업 1",
      quantity: "갯수",
      price: "가격",
    },
  ]);
  const [addressData, setAddressData] = useState({
    recipientName: "받는사람",
    phone: "휴대폰 번호",
    addressLine1: "주소",
    addressLine2: "자세한주소",
    addressLine2: "자세한주소",
    zipCode: "우편번호",
  });

  useEffect(() => {
    // 어드레스 들고오기
    // 포인트 들고오기
  }, []);

  const handlePayment = () => {};

  return (
    <>
      <div className={paymentStyle.container}>
        <h2>배송지</h2>
        <div>
          <h3>{addressData?.recipientName}</h3>
          <p>{addressData?.phone}</p>
          <p>
            {addressData?.addressLine1} {addressData?.addressLine1}
            {`(${addressData?.zipCode})`}
          </p>
        </div>
      </div>
      <div className={paymentStyle.container}>
        <h2>주문상품</h2>
        <div>
          {bookList.map((book) => {
            return (
              <div key={book.book_id}>
                <img src={book.imageUrl} alt={book.title} />
                <div>{book.title}</div>
                <div>{book.quantity}</div>
                <div>{book.price}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div>{/* 포인트 사용 */}</div>
      <div>{/* 결제 */}</div>
    </>
  );
}
