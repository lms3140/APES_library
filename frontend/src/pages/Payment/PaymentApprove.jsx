import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCart } from "../../store/cartSlice.js";
import { clearCart } from "../../utils/cartStorage";

export default function PaymentApprove() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // 로딩 상태와 에러 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // URL에서 pg_token 꺼내기 (카카오 결제 완료 후 전달됨)
  const pgToken = new URLSearchParams(location.search).get("pg_token");

  useEffect(() => {
    async function approvePayment() {
      if (!pgToken) {
        setError("pg_token이 없습니다.");
        setLoading(false);
        return;
      }

      try {
        // 세션Storage에서 orderId 가져오기
        const orderId = sessionStorage.getItem("order_id");
        if (!orderId) throw new Error("orderId가 없습니다.");

        // API 호출
        const response = await fetch(`/payment/approve?pg_token=${pgToken}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderId), // 지금 컨트롤러에서는 orderId만 받음
        });

        if (!response.ok) throw new Error("결제 승인 실패");

        const data = await response.json();

        // 결제 성공 시 장바구니 초기화
        clearCart(); // localStorage 장바구니 초기화

        // OrderComplete 페이지로 이동
        navigate("/order/complete", {
          state: {
            finalPrice: data.total_amount,
            orderId: data.partner_order_id,
          },
        });
      } catch (err) {
        console.error(err);
        setError("결제 처리 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    approvePayment();
  }, [pgToken, navigate, dispatch]);

  if (loading) return <p>결제를 확인 중입니다...</p>;
  if (error) return <p>{error}</p>;

  return null;
}
