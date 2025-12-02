import { useEffect, useState } from "react";
import styles from "./Inquiries.module.css";

export function Inquiries() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const res = await fetch("http://localhost:8080/inquiry/member", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("문의내역을 불러올 수 없습니다.");
        const data = await res.json();
        setInquiries(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInquiries();
  }, []);

  return (
    <div>
      <h1>1:1문의</h1>
      <div>
        <p>1:1문의내역 조회는 최대 3년까지 가능합니다.</p>
        <button>
          <img
            src="/images/mypage/ico_comment_white.png"
            alt="문의하기버튼아이콘"
          />
          1:1문의하기
        </button>
      </div>
      {inquiries.length === 0 ? (
        <div>
          <img src="/images/mypage/ico_nodata.png" alt="nodata" />
          <p>해당 기간 문의 내역이 없습니다.</p>
        </div>
      ) : (
        <div></div>
      )}
      <div></div>
    </div>
  );
}
