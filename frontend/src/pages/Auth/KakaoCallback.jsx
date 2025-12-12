import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosPostKakaoToken } from "../../utils/dataFetch.js"
import Swal from "sweetalert2";
import "../../css/swal.css";

//토큰 발급
export const KakaoCallback = () => {
  const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");


    const tokenUrl = "https://kauth.kakao.com/oauth/token";
            const data = {
                "grant_type": "authorization_code",
                "client_id" : "faa41cfd2406bc361c3eb40aa4fb7ceb",
                "redirect_uri" : "http://localhost:8080/auth/kakao/login",
                "code" : code
                }
console.log(code);
  useEffect(() => {
      const fetchdata = async() => {
//         if (code) {


            const jsondata = await axiosPostKakaoToken(tokenUrl, data);
//             console.log(jsondata);
        }
    fetchdata();
}, []);

  return (<div>카카오 로그인 처리 중...</div>);
};
