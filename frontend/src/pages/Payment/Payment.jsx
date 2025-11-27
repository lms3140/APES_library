const mockAddressData = {
  recipientName: "받는사람",
  phone: "휴대폰 번호",
  addressLine1: "주소",
  addressLine2: "자세한주소",
  addressLine2: "자세한주소",
  zipCode: "우편번호",
};

const orderList = [
  {
    book_id: 1,
    imageUrl:
      "https://image.aladin.co.kr/product/37609/38/cover200/k842032742_1.jpg",
    title: "픽미업 1",
    quantity: "갯수",
    price: "가격",
  },
];
import { useState } from "react";
import paymentStyle from "./Payment.module.css";

export function Payment() {
  const [paymentInfo, setPaymentInfo] = useState();
  return (
    <>
      <div className={paymentStyle.container}>
        <h2>배송지</h2>
        <div>
          <h3>{mockAddressData.recipientName}</h3>
          <p>{mockAddressData.phone}</p>
          <p>
            {mockAddressData.addressLine1} {mockAddressData.addressLine1}
            {`(${mockAddressData.zipCode})`}
          </p>
        </div>
      </div>
      <div className={paymentStyle.container}>
        <h2>주문상품</h2>
        <div>
          {orderList.map((book) => {
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
    </>
  );
}
