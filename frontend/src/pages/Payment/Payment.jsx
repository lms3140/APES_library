import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { resetCart } from "../../store/cartSlice.js";
import { clearCart as clearLocalCart } from "../../utils/cartStorage.js";
import paymentStyle from "./Payment.module.css";
import { StepItemNum } from "../../components/Cart/StepItemNum.jsx";
import { AddressModal } from "../Mypage/AddressModal.jsx";

// 🔥 추가
import AddressesList from "../Payment/AddressesList.jsx";

export function Payment() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ===== 배송지 정보 =====
  const [addressData, setAddressData] = useState({
    recipientName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    zipCode: "",
    addressId: 1,
    addressName: "기본 배송지",
    isDefault: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 리스트 모달
  const [isAddressListOpen, setIsAddressListOpen] = useState(false);

  const [usePoints, setUsePoints] = useState(false);
  const [userPoints, setUserPoints] = useState(1000);

  // ===== 주문 상품 리스트 =====
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    if (location.state?.orderItems) {
      setBookList(
        location.state.orderItems.map((item) => ({
          book_id: item.bookId,
          quantity: item.quantity || 1,
          title: item.title || "제목 없음",
          price: item.price || 0,
          imageUrl: item.imageUrl || "",
        }))
      );
    } else {
      setBookList(
        cartItems.map((book) => ({
          book_id: book.bookId,
          quantity: book.quantity || 1,
          title: book.title,
          price: book.price,
          imageUrl: book.imageUrl,
        }))
      );
    }
  }, [cartItems, location.state]);

  // ===== 주소 불러오기 =====
  const fetchAddress = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get("http://localhost:8080/address/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.length > 0) {
        const defaultAddress = response.data[0];
        setAddressData({
          recipientName: defaultAddress.recipientName || "",
          phone: defaultAddress.phone || "",
          addressLine1: defaultAddress.addressLine1 || "",
          addressLine2: defaultAddress.addressLine2 || "",
          zipCode: defaultAddress.zipCode || "",
          addressId: defaultAddress.addressId,
          addressName: defaultAddress.addressName || "기본 배송지",
          isDefault: defaultAddress.isDefault || false,
        });
      }
    } catch (err) {
      console.error("배송지 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  // 🔥 AddressesList에서 선택 시 호출
  const handleSelectAddress = (addr) => {
    setAddressData({
      recipientName: addr.recipientName,
      phone: addr.phone,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2,
      zipCode: addr.zipCode,
      addressId: addr.addressId,
      addressName: addr.addressName || "배송지",
      isDefault: addr.isDefault || false,
    });

    setIsAddressListOpen(false);
  };

  // ===== 결제 금액 계산 =====
  const totalPrice = bookList.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const totalDiscount = Math.floor(totalPrice * 0.1);
  const totalPoints = Math.floor(totalPrice * 0.1);
  const finalPrice = totalPrice - totalDiscount - (usePoints ? userPoints : 0);

  // ===== 결제 요청 =====
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      const firstTitle = bookList[0]?.title || "상품";
      const itemName =
        bookList.length > 1
          ? `${firstTitle} 외 ${bookList.length - 1}개`
          : firstTitle;

      const response = await axios.post(
        "http://localhost:8080/payment/ready",
        {
          userId: "user123",
          itemName,
          point: 0,
          books: bookList.map((book) => ({
            bookId: book.book_id,
            quantity: book.quantity,
          })),
          totalAmount: finalPrice,
          addressId: addressData.addressId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const redirectUrl =
        response.data?.next_redirect_pc_url || response.data?.redirectUrl;

      if (!redirectUrl) {
        Swal.fire({
          title: "결제 준비 실패",
          confirmButtonText: "확인",
        });
        return;
      }

      if (response.data?.orderId)
        localStorage.setItem("orderId", response.data.orderId);

      if (response.data?.tid)
        localStorage.setItem("tid", response.data.tid);

      dispatch(resetCart());
      clearLocalCart();

      window.location.href = redirectUrl;
    } catch (err) {
      console.error("결제 준비 실패", err);
      Swal.fire({
        title: "결제 준비 실패",
        confirmButtonText: "확인",
      });
    }
  };

  // 전화번호 포맷
  const formatPhone = (phone) => {
    if (!phone) return "";
    return phone.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  };

  return (
    <section className={paymentStyle.contents}>
      {/* 상단 */}
      <div className={paymentStyle.paymentTopWrap}>
        <p className={paymentStyle.titleWrap}>주문/결제</p>
        <ul className={paymentStyle.stepWrapper}>
          <StepItemNum activeStep={2} />
        </ul>
      </div>

      <div className={paymentStyle.paymentLayout}>
        {/* 좌측 */}
        <div className={paymentStyle.leftArea}>
          {/* 배송지 */}
          <div className={paymentStyle.addressBox}>
            <h2>배송지</h2>

            <div className={paymentStyle.itemInfo}>
              <div className={paymentStyle.itemTitle}>
                {addressData.addressName}
                {addressData.isDefault && (
                  <span className={paymentStyle.defaultTag}>기본배송지</span>
                )}
              </div>

              <div className={paymentStyle.itemText}>
                {addressData.recipientName
                  ? `${addressData.recipientName} (${formatPhone(
                      addressData.phone
                    )})`
                  : "배송지 정보를 입력해주세요."}
              </div>

              <div className={paymentStyle.itemText2}>
                [{addressData.zipCode}] {addressData.addressLine1}{" "}
                {addressData.addressLine2}
              </div>
            </div>

            <button
              className={paymentStyle.editAddressBtn}
              onClick={() => setIsAddressListOpen(true)}
            >
              배송지 수정/추가
            </button>
          </div>

          {/* 주문 목록 */}
          <div className={paymentStyle.paymentBox}>
            <h2>주문상품</h2>
            <div className={paymentStyle.orderList}>
              {bookList.map((book) => (
                <div
                  key={book.book_id}
                  className={paymentStyle.orderListItem}
                >
                  <img src={book.imageUrl} alt={book.title} />
                  <div>
                    <h2>{book.title}</h2>
                    <p>수량: {book.quantity}</p>
                    <p>가격: ₩ {(book.price || 0).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 포인트 */}
          <div className={paymentStyle.pointsBox}>
            <h2>포인트 사용</h2>
            <p>보유 포인트: {userPoints}P</p>
            <label>
              <input
                type="checkbox"
                checked={usePoints}
                onChange={() => setUsePoints(!usePoints)}
              />
              포인트 사용
            </label>
          </div>
        </div>

        {/* 우측 결제 요약 */}
        <div className={paymentStyle.rightArea}>
          <div className={paymentStyle.summary}>
            <p>
              <span>상품 금액</span>
              <span>₩ {(totalPrice || 0).toLocaleString()}</span>
            </p>
            <p>
              <span>할인 금액</span>
              <span>-₩ {(totalDiscount || 0).toLocaleString()}</span>
            </p>
            <p>
              <span>포인트 차감</span>
              <span>-₩ {(usePoints ? userPoints : 0).toLocaleString()}</span>
            </p>
            <p>
              <span>포인트 적립</span>
              <span>{(totalPoints || 0).toLocaleString()}P</span>
            </p>
            <p className={paymentStyle.finalPrice}>
              <span>결제 예정 금액</span>
              <span>₩ {(finalPrice || 0).toLocaleString()}</span>
            </p>
          </div>

          <button className={paymentStyle.orderBtn} onClick={handlePayment}>
            결제하기
          </button>
        </div>
      </div>

      {/* 기존 AddressModal */}
      {isModalOpen && (
        <AddressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSaved={fetchAddress}
        />
      )}

      {/* 🔥 리스트 모달 */}
      {isAddressListOpen && (
        <AddressesList
          isOpen={isAddressListOpen}
          onClose={() => setIsAddressListOpen(false)}
          onSaved={fetchAddress}
          onSelect={handleSelectAddress}
        />
      )}
    </section>
  );
}
