import { useEffect, useState } from "react";
import paymentStyle from "./Payment.module.css";
import axios from "axios";

export function Payment() {
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
