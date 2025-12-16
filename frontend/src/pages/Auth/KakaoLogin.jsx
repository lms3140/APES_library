import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../../css/swal.css";

// 카카오 로그인 후 토큰을 발급받는 컴포넌트
export const KakaoLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code"); // URL에서 인가 코드 추출

  useEffect(() => {
    // 'code' 값이 없으면 리다이렉트 처리하거나 오류 처리 필요
    if (!code) {
      Swal.fire({
        title: "로그인 실패",
        text: "로그인 과정에서 문제가 발생했습니다.",
        confirmButtonText: "확인",
        customClass: {
          popup: "customPopup",
          title: "customTitle",
          htmlContainer: "customText",
          confirmButton: "customConfirmButton",
        },
      });
      navigate("/"); // 메인 페이지로 리디렉션
      return;
    }

    // 카카오 액세스 토큰을 발급받을 URL과 요청 데이터
    const fetchData = async () => {
      try {
        // 카카오 액세스 토큰 요청
        const response = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          new URLSearchParams({
            grant_type: "authorization_code", // 인가 코드로 액세스 토큰을 요청
            client_id: "faa41cfd2406bc361c3eb40aa4fb7ceb", // 실제 카카오 REST API 키
            redirect_uri: "http://localhost:5173/auth/kakao/callback", // 리다이렉트 URI
            code: code, // URL에서 받은 인가 코드
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

        // 응답에서 액세스 토큰을 추출
        const { access_token } = response.data;
        console.log("발급된 액세스 토큰:", access_token);  // 응답 데이터 확인

        // 2. 액세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem("access_token", access_token); // 로컬 스토리지에 저장

        // 3. 사용자 정보 확인 또는 후속 처리 (백엔드와 연동)
        const checkUserResponse = await axios.post(
          "http://localhost:8080/api/auth/checkUser", // 실제 백엔드 API
          { access_token }
        );

        // 4. 사용자 정보가 존재하면 로그인, 없으면 회원가입
        if (checkUserResponse.data.success) {
          navigate("/"); // 로그인 성공시 홈 화면으로 리디렉션
        } else {
          navigate("/signup", { state: { user: checkUserResponse.data.user } }); // 회원가입 페이지로 이동
        }

      } catch (error) {
        console.error("카카오 로그인 실패:", error);
        Swal.fire({
          title: "로그인 실패",
          text: "로그인 과정에서 문제가 발생했습니다. 다시 시도해주세요.",
          confirmButtonText: "확인",
          customClass: {
            popup: "customPopup",
            title: "customTitle",
            htmlContainer: "customText",
            confirmButton: "customConfirmButton",
          },
        });
        navigate("/"); // 로그인 실패 시 메인 페이지로 리디렉션
      }
    };

    fetchData(); // 카카오 로그인 요청

  }, [code, navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};
