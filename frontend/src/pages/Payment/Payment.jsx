import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { resetCart } from "../../store/cartSlice.js";
import paymentStyle from "./Payment.module.css";
import { StepItemNum } from "../../components/Cart/StepItemNum.jsx";
import { AddressModal } from "../Mypage/AddressModal.jsx";

export function Payment() {
  const cartItems = useSelector((state) => state.cart.items); // Redux에서 장바구니 가져오기
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ===== 배송지 정보 상태 =====
  const [addressData, setAddressData] = useState({
    recipientName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    zipCode: "",
    addressId: 1, // 기본값
  });

  // ===== 모달 상태 =====
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ===== 포인트 상태 =====
  const [usePoints, setUsePoints] = useState(false);
  const [userPoints, setUserPoints] = useState(1000);

  // ===== 주문 상품 리스트 =====
  const [bookList, setBookList] = useState([]);

  // ===== location.state에서 주문 상품 가져오기 =====
  useEffect(() => {
    setBookList(
      location.state?.orderItems?.map((item) => {
        const book = cartItems.find((b) => b.bookId === item.bookId) || {};
        return {
          book_id: item.bookId,
          imageUrl: book?.imageUrl || "",
          title: book?.title || "제목 없음", // 안전하게 기본값 설정
          quantity: item.quantity || 1,
          price: book?.price || 0, // 안전하게 기본값 0
        };
      }) || []
    );
  }, [cartItems, location.state]);

  // ===== 배송지 정보 가져오기 (API) =====
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
          addressId: defaultAddress.id || 1,
        });
      }
    } catch (err) {
      console.error("배송지 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  // ===== 금액 계산 =====
  const totalPrice = bookList.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const totalDiscount = Math.floor(totalPrice * 0.1);
  const totalPoints = Math.floor(totalPrice * 0.1);
  const finalPrice = totalPrice - totalDiscount - (usePoints ? userPoints : 0);

  // ===== 결제 요청 함수 =====
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const firstTitle = bookList[0]?.title || "상품";
      const itemName =
        bookList.length > 1
          ? `${firstTitle} 외 ${bookList.length - 1}개`
          : firstTitle;

      // API 요청 body 구성
      const response = await axios.post(
        "http://localhost:8080/payment/ready",
        {
          userId: "user123",
          itemName: itemName,
          point: 0,
          books: bookList.map((book) => ({
            bookId: book.book_id,
            quantity: book.quantity || 1,
          })),
          totalAmount: finalPrice || 0,
          addressId: addressData.addressId ?? 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 카카오 결제페이지 URL
      const redirectUrl =
        response.data?.next_redirect_pc_url || response.data?.redirectUrl;

      if (!redirectUrl) {
        Swal.fire({
          title: "결제 준비에 실패했습니다.",
          confirmButtonText: "확인",
        });
        return;
      }

      // orderId, tid 로컬 저장
      if (response.data?.orderId) {
        localStorage.setItem("orderId", response.data.orderId);
      }
      if (response.data?.tid) {
        localStorage.setItem("tid", response.data.tid);
      }

      // 카카오 결제 페이지로 이동
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("결제 준비 실패:", error);
      Swal.fire({
        title: "결제 준비에 실패했습니다.",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <section className={paymentStyle.contents}>
      {/* ===== 상단 스텝 표시 ===== */}
      <div className={paymentStyle.paymentTopWrap}>
        <p className={paymentStyle.titleWrap}>주문/결제</p>
        <ul className={paymentStyle.stepWrapper}>
          <StepItemNum activeStep={2} />
        </ul>
      </div>

      <div className={paymentStyle.paymentLayout}>
        {/* ===== 좌측: 배송지/상품/포인트 ===== */}
        <div className={paymentStyle.leftArea}>
          {/* 배송지 */}
          <div className={paymentStyle.addressBox}>
            <h2>배송지</h2>
            <div>
              <p>
                {addressData.recipientName
                  ? `${addressData.recipientName} (${addressData.phone})`
                  : "배송지 정보를 입력해주세요."}
              </p>
              <p>
                {addressData.addressLine1} {addressData.addressLine2} (
                {addressData.zipCode})
              </p>
              <button
                className={paymentStyle.editAddressBtn}
                onClick={() => setIsModalOpen(true)}
              >
                배송지 수정/추가
              </button>
            </div>
          </div>

          {/* 주문 상품 */}
          <div className={paymentStyle.paymentBox}>
            <h2>주문상품</h2>
            <div className={paymentStyle.orderList}>
              {bookList.map((book) => (
                <div key={book.book_id} className={paymentStyle.orderListItem}>
                  <img src={book.imageUrl} alt={book.title} />
                  <div>
                    <h2>{book.title}</h2>
                    <p>수량: {book.quantity || 0}</p>
                    <p>가격: ₩ {(book.price || 0).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 포인트 사용 */}
          <div className={paymentStyle.pointsBox}>
            <h2>포인트 사용</h2>
            <p>보유 포인트: {userPoints || 0}P</p>
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

        {/* ===== 우측: 결제 요약 ===== */}
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

          {/* 결제 버튼 */}
          <button className={paymentStyle.orderBtn} onClick={handlePayment}>
            결제하기
          </button>
        </div>
      </div>

      {/* 배송지 모달 */}
      {isModalOpen && (
        <AddressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSaved={fetchAddress}
        />
      )}
    </section>
  );
}
