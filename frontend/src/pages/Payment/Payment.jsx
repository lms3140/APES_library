import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { resetCart } from "../../store/cartSlice.js";
import paymentStyle from "./Payment.module.css";
import { StepItemNum } from "../../components/Cart/StepItemNum.jsx";
import { useGetFetch } from "../../hooks/useGetFetch"; // useGetFetch 훅

export function Payment() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 배송지 정보 상태
  const [addressData, setAddressData] = useState({
    recipientName: "받는사람",
    phone: "휴대폰 번호",
    addressLine1: "주소",
    addressLine2: "자세한주소",
    zipCode: "우편번호",
  });

  // 포인트 및 결제 관련 상태
  const [usePoints, setUsePoints] = useState(false);
  const [userPoints, setUserPoints] = useState(1000); // 예시로 1000P 설정





  // 장바구니에서 주문 항목들 불러오기
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    setBookList(
      location.state?.orderItems?.map((item) => {
        const book = cartItems.find((b) => b.bookId === item.bookId);
        return {
          book_id: item.bookId,
          imageUrl: book?.imageUrl,
          title: book?.title,
          quantity: item.quantity,
          price: book?.price,
        };
      }) || []
    );
  }, [cartItems, location.state]);

useEffect(()=>{
        async function getAddressList(){
            const token = localStorage.getItem("jwtToken");
            const response = await axios.post(
                  'http://localhost:8080/address/list',{}, // 요청을 보낼 URL
                  {
                    headers: {
                      'Authorization': `Bearer ${token}`, // Authorization 헤더에 Bearer 토큰 추가
                      'Content-Type': 'application/json', // 필요한 경우 추가적인 헤더도 설정
                    },
                  }
                );
            console.log(response.data);
            }
        getAddressList();
    },[])

  // 총 금액, 할인, 포인트 등 계산
  const totalPrice = bookList.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = Math.floor(totalPrice * 0.1);
  const totalPoints = Math.floor(totalPrice * 0.1);
  const finalPrice = totalPrice - totalDiscount - (usePoints ? userPoints : 0);

  // 카카오 결제 준비 함수
  const handlePayment = async () => {
    try {
      // 결제 준비 요청 보내기
      const response = await axios.post("http://localhost:8080/payment/ready", {
        userId: "user123", // 실제 사용자 ID로 변경
        itemName: "주문상품", // 실제 상품명으로 변경
        totalAmount: finalPrice,
        books: bookList.map((book) => ({
          bookId: book.book_id,
          quantity: book.quantity,
        })),
        addressId: 1, // 배송지 ID
        point: usePoints ? userPoints : 0,
      });

      // 카카오페이 리디렉션 URL로 이동
      const redirectUrl = response.data.redirectUrl;
      window.location.href = redirectUrl;  // 카카오페이 결제 페이지로 리디렉션

    } catch (error) {
      console.error("결제 준비 실패:", error);
      Swal.fire("결제 준비 실패", "다시 시도해 주세요.", "error");
    }
  };

  // 배송지 수정 팝업
const handleEditAddress = () => {
  Swal.fire({
    title: "배송지 수정",
    html: `
      <input id="swal-recipient" class="swal2-input" placeholder="받는사람" value="${addressData.recipientName}" />
      <input id="swal-phone" class="swal2-input" placeholder="휴대폰 번호" value="${addressData.phone}" />
      <input id="swal-address1" class="swal2-input" placeholder="주소" value="${addressData.addressLine1}" />
      <input id="swal-address2" class="swal2-input" placeholder="자세한 주소" value="${addressData.addressLine2}" />
      <input id="swal-zipcode" class="swal2-input" placeholder="우편번호" value="${addressData.zipCode}" />
    `,
    focusConfirm: false,
    preConfirm: () => {
      const recipientName = document.getElementById("swal-recipient").value;
      const phone = document.getElementById("swal-phone").value;
      const addressLine1 = document.getElementById("swal-address1").value;
      const addressLine2 = document.getElementById("swal-address2").value;
      const zipCode = document.getElementById("swal-zipcode").value;

      if (!recipientName || !phone || !addressLine1 || !addressLine2 || !zipCode) {
        Swal.showValidationMessage("모든 필드를 입력해주세요.");
        return false;
      }
    },
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText: "취소",
    customClass: {
      popup: "customPopup",           // 팝업 스타일
      title: "customTitle",           // 타이틀 스타일
      htmlContainer: "customText",    // 텍스트 스타일
      confirmButton: "customConfirmButton", // 확인 버튼 스타일
      cancelButton: "customCancelButton",   // 취소 버튼 스타일
    },
  });
};


  return (
    <section className={paymentStyle.contents}>
      <div className={paymentStyle.paymentTopWrap}>
        <p className={paymentStyle.titleWrap}>주문/결제</p>
        <ul className={paymentStyle.stepWrapper}>
          <StepItemNum activeStep={2} />
        </ul>
      </div>

      <div className={paymentStyle.paymentLayout}>
        <div className={paymentStyle.leftArea}>
          <div className={paymentStyle.addressBox}>
            <h2>배송지</h2>
            {false ? (
              <p>로딩중...</p>
            ) : false ? (
              <p>배송지 정보 불러오기 실패</p>
            ) : (
              <div>
                <h3>{addressData.recipientName}</h3>
                <p>{addressData.phone}</p>
                <p>
                  {addressData.addressLine1} {addressData.addressLine2} (
                  {addressData.zipCode})
                </p>
                <button className={paymentStyle.editAddressBtn} onClick={handleEditAddress}>
                  배송지 수정/추가
                </button>
              </div>
            )}
          </div>

          <div className={paymentStyle.paymentBox}>
            <h2>주문상품</h2>
            <div className={paymentStyle.orderList}>
              {bookList.map((book) => (
                <div key={book.book_id} className={paymentStyle.orderListItem}>
                  <img src={book.imageUrl} alt={book.title} />
                  <div>
                    <h2>{book.title}</h2>
                    <p>수량: {book.quantity}</p>
                    <p>가격: ₩ {book.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={paymentStyle.pointsBox}>
            <h2>포인트 사용</h2>
            <p>보유 포인트: {userPoints}P</p>
            <label>
              <input
                type="checkbox"
                checked={usePoints}
                onChange={() => setUsePoints(!usePoints)}
              />{" "}
              포인트 사용
            </label>
          </div>
        </div>

        <div className={paymentStyle.rightArea}>
          <div className={paymentStyle.summary}>
            <p>
              <span>상품 금액</span>
              <span>₩ {totalPrice.toLocaleString()}</span>
            </p>
            <p>
              <span>할인 금액</span>
              <span>-₩ {totalDiscount.toLocaleString()}</span>
            </p>
            <p>
              <span>포인트 차감</span>
              <span>-₩ {usePoints ? userPoints.toLocaleString() : 0}</span>
            </p>
            <p>
              <span>포인트 적립</span>
              <span>{totalPoints.toLocaleString()}P</span>
            </p>
            <p className={paymentStyle.finalPrice}>
              <span>결제 예정 금액</span>
              <span>₩ {finalPrice.toLocaleString()}</span>
            </p>
          </div>
          <button className={paymentStyle.orderBtn} onClick={handlePayment}>
            결제하기
          </button>
        </div>
      </div>
    </section>
  );
}
